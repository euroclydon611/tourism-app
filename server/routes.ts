import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import {
  insertUserSchema,
  insertDestinationSchema,
  insertExperienceSchema,
  insertReviewSchema,
  insertHiddenGemSchema,
  insertEventSchema,
  insertBookingSchema,
  insertNewsletterSchema,
  insertPreferenceSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware for Zod validation errors
  const handleZodError = (err: unknown, res: Response) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ error: validationError.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  };

  // User routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(409).json({ error: "Email already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Don't return password in response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // Destination routes
  app.get("/api/destinations", async (_req: Request, res: Response) => {
    const destinations = await storage.getDestinations();
    res.json(destinations);
  });

  app.get("/api/destinations/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid destination ID" });
    }
    
    const destination = await storage.getDestination(id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    
    res.json(destination);
  });

  app.get("/api/destinations/region/:region", async (req: Request, res: Response) => {
    const region = req.params.region;
    const destinations = await storage.getDestinationsByRegion(region);
    res.json(destinations);
  });

  app.post("/api/destinations", async (req: Request, res: Response) => {
    try {
      const destinationData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(destinationData);
      res.status(201).json(destination);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Experience routes
  app.get("/api/experiences", async (_req: Request, res: Response) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get("/api/experiences/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid experience ID" });
    }
    
    const experience = await storage.getExperience(id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    
    res.json(experience);
  });

  app.get("/api/experiences/category/:category", async (req: Request, res: Response) => {
    const category = req.params.category;
    const experiences = await storage.getExperiencesByCategory(category);
    res.json(experiences);
  });

  app.post("/api/experiences", async (req: Request, res: Response) => {
    try {
      const experienceData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(experienceData);
      res.status(201).json(experience);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Review routes
  app.get("/api/reviews", async (_req: Request, res: Response) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });

  app.get("/api/reviews/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }
    
    const review = await storage.getReview(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    
    res.json(review);
  });

  app.get("/api/reviews/destination/:destinationId", async (req: Request, res: Response) => {
    const destinationId = parseInt(req.params.destinationId);
    if (isNaN(destinationId)) {
      return res.status(400).json({ error: "Invalid destination ID" });
    }
    
    const reviews = await storage.getReviewsByDestination(destinationId);
    res.json(reviews);
  });

  app.get("/api/reviews/experience/:experienceId", async (req: Request, res: Response) => {
    const experienceId = parseInt(req.params.experienceId);
    if (isNaN(experienceId)) {
      return res.status(400).json({ error: "Invalid experience ID" });
    }
    
    const reviews = await storage.getReviewsByExperience(experienceId);
    res.json(reviews);
  });

  app.get("/api/reviews/user/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    const reviews = await storage.getReviewsByUser(userId);
    res.json(reviews);
  });

  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Hidden Gem routes
  app.get("/api/hidden-gems", async (_req: Request, res: Response) => {
    const hiddenGems = await storage.getHiddenGems();
    res.json(hiddenGems);
  });

  app.get("/api/hidden-gems/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid hidden gem ID" });
    }
    
    const hiddenGem = await storage.getHiddenGem(id);
    if (!hiddenGem) {
      return res.status(404).json({ error: "Hidden gem not found" });
    }
    
    res.json(hiddenGem);
  });

  app.get("/api/hidden-gems/region/:region", async (req: Request, res: Response) => {
    const region = req.params.region;
    const hiddenGems = await storage.getHiddenGemsByRegion(region);
    res.json(hiddenGems);
  });

  app.post("/api/hidden-gems", async (req: Request, res: Response) => {
    try {
      const hiddenGemData = insertHiddenGemSchema.parse(req.body);
      const hiddenGem = await storage.createHiddenGem(hiddenGemData);
      res.status(201).json(hiddenGem);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Event routes
  app.get("/api/events", async (_req: Request, res: Response) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
    
    const event = await storage.getEvent(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    res.json(event);
  });

  app.post("/api/events", async (req: Request, res: Response) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Booking routes
  app.get("/api/bookings", async (_req: Request, res: Response) => {
    const bookings = await storage.getBookings();
    res.json(bookings);
  });

  app.get("/api/bookings/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    
    const booking = await storage.getBooking(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    res.json(booking);
  });

  app.get("/api/bookings/user/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    const bookings = await storage.getBookingsByUser(userId);
    res.json(bookings);
  });

  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.patch("/api/bookings/:id/status", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    
    const booking = await storage.updateBookingStatus(id, status);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    res.json(booking);
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeToNewsletter(newsletterData);
      res.status(201).json(newsletter);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Preference routes
  app.get("/api/preferences/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    const preferences = await storage.getUserPreferences(userId);
    if (!preferences) {
      return res.status(404).json({ error: "Preferences not found" });
    }
    
    res.json(preferences);
  });

  app.post("/api/preferences", async (req: Request, res: Response) => {
    try {
      const preferenceData = insertPreferenceSchema.parse(req.body);
      const preference = await storage.saveUserPreferences(preferenceData);
      res.status(201).json(preference);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.patch("/api/preferences/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    try {
      const preferences = req.body;
      const updatedPreferences = await storage.updateUserPreferences(userId, preferences);
      if (!updatedPreferences) {
        return res.status(404).json({ error: "Preferences not found" });
      }
      
      res.json(updatedPreferences);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Weather mock API for demo purposes
  app.get("/api/weather/:city", async (req: Request, res: Response) => {
    const city = req.params.city;
    
    // Mock weather data
    const weatherData = {
      city,
      date: new Date().toLocaleDateString(),
      temperature: Math.floor(Math.random() * 10) + 25, // Random temp between 25-35
      condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
      forecast: [
        { day: "Mon", temp: Math.floor(Math.random() * 10) + 25, condition: "Sunny" },
        { day: "Tue", temp: Math.floor(Math.random() * 10) + 25, condition: "Partly Cloudy" },
        { day: "Wed", temp: Math.floor(Math.random() * 10) + 25, condition: "Rainy" },
        { day: "Thu", temp: Math.floor(Math.random() * 10) + 25, condition: "Partly Cloudy" }
      ]
    };
    
    res.json(weatherData);
  });

  const httpServer = createServer(app);
  return httpServer;
}
