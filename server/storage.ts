import {
  User,
  InsertUser,
  Destination,
  InsertDestination,
  Experience,
  InsertExperience,
  Review,
  InsertReview,
  HiddenGem,
  InsertHiddenGem,
  Event,
  InsertEvent,
  Booking,
  InsertBooking,
  Newsletter,
  InsertNewsletter,
  Preference,
  InsertPreference,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

  // Destination operations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  getDestinationsByRegion(region: string): Promise<Destination[]>;
  getDestinationsByTags(tags: string[]): Promise<Destination[]>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Experience operations
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  getExperiencesByCategory(category: string): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Review operations
  getReviews(): Promise<Review[]>;
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByDestination(destinationId: number): Promise<Review[]>;
  getReviewsByExperience(experienceId: number): Promise<Review[]>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Hidden Gem operations
  getHiddenGems(): Promise<HiddenGem[]>;
  getHiddenGem(id: number): Promise<HiddenGem | undefined>;
  getHiddenGemsByRegion(region: string): Promise<HiddenGem[]>;
  createHiddenGem(hiddenGem: InsertHiddenGem): Promise<HiddenGem>;

  // Event operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Newsletter operations
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getSubscriberByEmail(email: string): Promise<Newsletter | undefined>;

  // Preference operations
  getUserPreferences(userId: number): Promise<Preference | undefined>;
  saveUserPreferences(preference: InsertPreference): Promise<Preference>;
  updateUserPreferences(
    userId: number,
    preferences: Partial<Preference>
  ): Promise<Preference | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private experiences: Map<number, Experience>;
  private reviews: Map<number, Review>;
  private hiddenGems: Map<number, HiddenGem>;
  private events: Map<number, Event>;
  private bookings: Map<number, Booking>;
  private newsletters: Map<number, Newsletter>;
  private userPreferences: Map<number, Preference>;

  private userIdCounter: number;
  private destinationIdCounter: number;
  private experienceIdCounter: number;
  private reviewIdCounter: number;
  private hiddenGemIdCounter: number;
  private eventIdCounter: number;
  private bookingIdCounter: number;
  private newsletterIdCounter: number;
  private preferenceIdCounter: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.experiences = new Map();
    this.reviews = new Map();
    this.hiddenGems = new Map();
    this.events = new Map();
    this.bookings = new Map();
    this.newsletters = new Map();
    this.userPreferences = new Map();

    this.userIdCounter = 1;
    this.destinationIdCounter = 1;
    this.experienceIdCounter = 1;
    this.reviewIdCounter = 1;
    this.hiddenGemIdCounter = 1;
    this.eventIdCounter = 1;
    this.bookingIdCounter = 1;
    this.newsletterIdCounter = 1;
    this.preferenceIdCounter = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Add sample destinations
    const destinations: InsertDestination[] = [
      {
        name: "Cape Coast",
        region: "Central Region",
        description:
          "Historic coastal town with rich cultural heritage and stunning beaches. Cape Coast Castle, a UNESCO World Heritage site, stands as a powerful reminder of the transatlantic slave trade. Nearby, Kakum National Park offers treetop walks through lush rainforest.",
        shortDescription:
          "Historic coastal town with rich cultural heritage and stunning beaches.",
        imageUrl: "https://www.penguintravel.com/uploads/news/news_490.jpg",
        rating: 47,
        coordinates: { lat: 5.1053, lng: -1.2466 },
        topAttractions: ["Cape Coast Castle", "Kakum National Park"],
        tags: ["Cultural Heritage", "Beaches"],
      },
      {
        name: "Kumasi",
        region: "Ashanti Region",
        description:
          "Kumasi is the cultural heart of Ghana and home to the Ashanti Kingdom with vibrant markets. The city is known for its rich cultural heritage, traditional crafts, and the seat of the Ashanti Kingdom. Visit the Manhyia Palace and explore the enormous Kejetia Market.",
        shortDescription:
          "Cultural heart of Ghana and home to the Ashanti Kingdom with vibrant markets.",
        imageUrl:
          "https://rggnews.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-11-at-10.39.50-AM.jpeg",
        rating: 45,
        coordinates: { lat: 6.6885, lng: -1.6244 },
        topAttractions: ["Manhyia Palace", "Kejetia Market"],
        tags: ["Cultural Heritage", "Markets"],
      },
      {
        name: "Mole National Park",
        region: "Northern Region",
        description:
          "Ghana's largest wildlife sanctuary featuring diverse flora and fauna. Mole offers visitors the chance to see elephants, antelopes, and various bird species in their natural habitat. Walking safaris with armed rangers provide an up-close wildlife experience.",
        shortDescription:
          "Ghana's largest wildlife sanctuary featuring diverse flora and fauna.",
        imageUrl:
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        rating: 48,
        coordinates: { lat: 9.2644, lng: -1.8458 },
        topAttractions: ["Safari Tours", "Wildlife Viewing"],
        tags: ["Nature & Wildlife", "Safari"],
      },
    ];

    destinations.forEach((dest) => this.createDestination(dest));

    // Add sample experiences
    const experiences: InsertExperience[] = [
      {
        title: "Traditional Dance Workshops",
        category: "Cultural",
        description: "Learn authentic Ghanaian dance forms from local experts",
        imageUrl:
          "https://landtours.com/blog/wp-content/uploads/2024/05/adowa.jpg-1080x675.webp",
        location: "Accra",
        duration: "3 hours",
        price: 45,
      },
      {
        title: "Ghanaian Cooking Classes",
        category: "Culinary",
        description:
          "Master local dishes with ingredients from traditional markets",
        imageUrl:
          "https://protour.africa/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-19-at-9.37.15-PM.jpeg",
        location: "Kumasi",
        duration: "4 hours",
        price: 60,
      },
      {
        title: "Kente Weaving Workshop",
        category: "Crafts",
        description: "Learn traditional textile techniques from master weavers",
        imageUrl:
          "https://visitghana.com/wp-content/uploads/2019/02/3903_adanwomase-kente-village.jpg",
        location: "Bonwire",
        duration: "5 hours",
        price: 50,
      },
    ];

    experiences.forEach((exp) => this.createExperience(exp));

    // Add sample hidden gems
    const hiddenGems: InsertHiddenGem[] = [
      {
        name: "Lake Bosumtwi",
        description:
          "A sacred lake formed by a meteorite impact, surrounded by traditional villages and lush forests.",
        imageUrl:
          "https://images.unsplash.com/photo-1569488859134-24b568d5ac14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        region: "Ashanti Region",
      },
      {
        name: "Tafi Atome Monkey Sanctuary",
        description:
          "A community-based ecotourism initiative protecting sacred mona monkeys in their natural habitat.",
        imageUrl:
          "https://images.unsplash.com/photo-1554866585-e4b14f4251b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        region: "Volta Region",
      },
      {
        name: "Paga Crocodile Pond",
        description:
          "A sacred site where crocodiles live in harmony with humans, believed to host the souls of the ancestors.",
        imageUrl:
          "https://images.unsplash.com/photo-1564419320461-6870880221a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        region: "Upper East Region",
      },
      {
        name: "Wli Waterfalls",
        description:
          "The highest waterfall in West Africa, situated in a stunning valley surrounded by lush forests and mountains.",
        imageUrl:
          "https://images.unsplash.com/photo-1604762512526-b7068d08e169?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        region: "Volta Region",
      },
    ];

    hiddenGems.forEach((gem) => this.createHiddenGem(gem));

    // Add sample events
    const events: InsertEvent[] = [
      {
        title: "Homowo Festival",
        description:
          "A traditional harvest festival celebrated by the Ga people with drumming and dance.",
        location: "Accra, Greater Accra Region",
        date: "May 20, 2024",
        month: "MAY",
        day: "20",
      },
      {
        title: "Chale Wote Street Art Festival",
        description:
          "Annual street art festival showcasing alternative art, music, dance, and performance.",
        location: "Jamestown, Accra",
        date: "June 5, 2024",
        month: "JUN",
        day: "05",
      },
      {
        title: "Akwasidae Festival",
        description:
          "Royal ceremony celebrating Ashanti heritage with colorful processions and traditional music.",
        location: "Kumasi, Ashanti Region",
        date: "July 12, 2024",
        month: "JUL",
        day: "12",
      },
    ];

    events.forEach((event) => this.createEvent(event));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  async updateUser(
    id: number,
    userData: Partial<User>
  ): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Destination operations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async getDestinationsByRegion(region: string): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(
      (destination) => destination.region === region
    );
  }

  async getDestinationsByTags(tags: string[]): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter((destination) =>
      tags.some((tag) => (destination.tags as string[]).includes(tag))
    );
  }

  async createDestination(
    insertDestination: InsertDestination
  ): Promise<Destination> {
    const id = this.destinationIdCounter++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }

  // Experience operations
  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async getExperiencesByCategory(category: string): Promise<Experience[]> {
    return Array.from(this.experiences.values()).filter(
      (experience) => experience.category === category
    );
  }

  async createExperience(
    insertExperience: InsertExperience
  ): Promise<Experience> {
    const id = this.experienceIdCounter++;
    const experience: Experience = { ...insertExperience, id };
    this.experiences.set(id, experience);
    return experience;
  }

  // Review operations
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviewsByDestination(destinationId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.destinationId === destinationId
    );
  }

  async getReviewsByExperience(experienceId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.experienceId === experienceId
    );
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.userId === userId
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const now = new Date();
    const review: Review = { ...insertReview, id, createdAt: now };
    this.reviews.set(id, review);
    return review;
  }

  // Hidden Gem operations
  async getHiddenGems(): Promise<HiddenGem[]> {
    return Array.from(this.hiddenGems.values());
  }

  async getHiddenGem(id: number): Promise<HiddenGem | undefined> {
    return this.hiddenGems.get(id);
  }

  async getHiddenGemsByRegion(region: string): Promise<HiddenGem[]> {
    return Array.from(this.hiddenGems.values()).filter(
      (gem) => gem.region === region
    );
  }

  async createHiddenGem(insertHiddenGem: InsertHiddenGem): Promise<HiddenGem> {
    const id = this.hiddenGemIdCounter++;
    const hiddenGem: HiddenGem = { ...insertHiddenGem, id };
    this.hiddenGems.set(id, hiddenGem);
    return hiddenGem;
  }

  // Event operations
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  // Booking operations
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const now = new Date();
    const booking: Booking = { ...insertBooking, id, createdAt: now };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(
    id: number,
    status: string
  ): Promise<Booking | undefined> {
    const booking = await this.getBooking(id);
    if (!booking) return undefined;

    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Newsletter operations
  async subscribeToNewsletter(
    insertNewsletter: InsertNewsletter
  ): Promise<Newsletter> {
    const existingSubscriber = await this.getSubscriberByEmail(
      insertNewsletter.email
    );
    if (existingSubscriber) {
      return existingSubscriber;
    }

    const id = this.newsletterIdCounter++;
    const now = new Date();
    const newsletter: Newsletter = { ...insertNewsletter, id, createdAt: now };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getSubscriberByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email
    );
  }

  // Preference operations
  async getUserPreferences(userId: number): Promise<Preference | undefined> {
    return Array.from(this.userPreferences.values()).find(
      (preference) => preference.userId === userId
    );
  }

  async saveUserPreferences(
    insertPreference: InsertPreference
  ): Promise<Preference> {
    const existingPreference = await this.getUserPreferences(
      insertPreference.userId
    );
    if (existingPreference) {
      const updatedPreference = { ...existingPreference, ...insertPreference };
      this.userPreferences.set(existingPreference.id, updatedPreference);
      return updatedPreference;
    }

    const id = this.preferenceIdCounter++;
    const preference: Preference = { ...insertPreference, id };
    this.userPreferences.set(id, preference);
    return preference;
  }

  async updateUserPreferences(
    userId: number,
    preferences: Partial<Preference>
  ): Promise<Preference | undefined> {
    const userPreference = await this.getUserPreferences(userId);
    if (!userPreference) return undefined;

    const updatedPreference = { ...userPreference, ...preferences };
    this.userPreferences.set(userPreference.id, updatedPreference);
    return updatedPreference;
  }
}

export const storage = new MemStorage();
