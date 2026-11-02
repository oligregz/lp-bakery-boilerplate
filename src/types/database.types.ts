/**
 * TypeScript Interfaces for NoSQL Mock Database
 * Single source of truth for White-Label Bakery Landing Page
 */

export interface ThemePalette {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primarySoft: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  bg: string;
  bgAlt: string;
  surface: string;
  surfaceCard: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  badgeBg: string;
  badgeText: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  light: ThemePalette;
  dark: ThemePalette;
}

export interface ThemeConfig {
  defaultMode: 'light' | 'dark';
  defaultPreset: string;
  presets: Record<string, ThemePreset>;
}

export interface BrandProfile {
  name: string;
  legalName: string;
  tagline: string;
  subtagline: string;
  foundingYear: number;
  city: string;
  state: string;
  logo: {
    text: string;
    symbol: string;
    badgeText: string;
  };
  badges: Array<{
    id: string;
    icon: string;
    title: string;
    subtitle: string;
  }>;
  stats: Array<{
    id: string;
    number: string;
    label: string;
    sublabel: string;
  }>;
  socials: Array<{
    platform: string;
    url: string;
    icon: string;
    handle: string;
  }>;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  siteUrl: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export interface NavigationCollection {
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    linkText: string;
    linkHref: string;
  };
  links: NavigationLink[];
  ctaButton: {
    label: string;
    targetId: string;
    icon: string;
  };
  cartButtonLabel: string;
  themeToggleLabel: string;
}

export interface HeroSectionCollection {
  badge: {
    icon: string;
    text: string;
  };
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  secondaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  liveBatchBadge: {
    statusLabel: string;
    nextBatchLabel: string;
    batchName: string;
    countdownMinutes: number;
  };
  socialProof: {
    rating: string;
    maxRating: string;
    reviewsCountText: string;
    avatars: string[];
  };
  heroMedia: {
    mainImage: string;
    mainImageAlt: string;
    floatingImage: string;
    floatingImageAlt: string;
    floatingBadge: {
      number: string;
      label: string;
      caption: string;
    };
  };
}

export interface FreshBatchItem {
  id: string;
  time: string;
  productName: string;
  fermentationType: string;
  status: 'saindo_agora' | 'proxima' | 'agendada';
  statusLabel: string;
  unitsAvailable: number;
  tags: string[];
}

export interface FreshBatchesCollection {
  badge: string;
  title: string;
  subtitle: string;
  liveBadgeText: string;
  items: FreshBatchItem[];
  notifyButtonText: string;
  notifySuccessMessage: string;
  whatsappReminderTemplate: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ProductItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  weight: string;
  fermentationTime?: string;
  tags: string[];
  image: string;
  imageAlt: string;
  isChefSpecial?: boolean;
  isBestSeller?: boolean;
  allergens: string[];
}

export interface ProductsCollection {
  badge: string;
  title: string;
  subtitle: string;
  allCategoriesLabel: string;
  currencySymbol: string;
  addToOrderLabel: string;
  addedLabel: string;
  detailsLabel: string;
  weightLabel: string;
  fermentationLabel: string;
  allergensLabel: string;
  items: ProductItem[];
}

export interface ArtisanalProcessStep {
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
  keyHighlight: string;
}

export interface ArtisanalProcessCollection {
  badge: string;
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
  steps: ArtisanalProcessStep[];
}

export interface SpecialOfferCollection {
  enabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  couponCode: string;
  copyButtonLabel: string;
  copiedButtonLabel: string;
  terms: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
}

export interface CustomerReviewItem {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  verifiedText: string;
  favoriteItem: string;
  comment: string;
}

export interface ReviewsCollection {
  badge: string;
  title: string;
  subtitle: string;
  averageRating: string;
  totalReviewsLabel: string;
  satisfactionRate: string;
  satisfactionLabel: string;
  items: CustomerReviewItem[];
  googleReviewCta: {
    label: string;
    url: string;
    icon: string;
  };
}

export interface MasterBakerCollection {
  badge: string;
  title: string;
  chefName: string;
  chefTitle: string;
  quote: string;
  bioParagraphs: string[];
  credentials: Array<{
    id: string;
    title: string;
    institution: string;
    year: string;
  }>;
  photo: string;
  photoAlt: string;
}

export interface StoreLocationCollection {
  badge: string;
  title: string;
  subtitle: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    fullFormatted: string;
  };
  googleMapsDirectionsUrl: string;
  googleMapsEmbedQuery: string;
  schedule: Array<{
    days: string;
    hours: string;
    isFreshBatchTime?: boolean;
    note?: string;
  }>;
  contact: {
    phoneFormatted: string;
    whatsappNumber: string;
    whatsappMessagePreset: string;
    email: string;
  };
  deliveryServices: Array<{
    name: string;
    rating: string;
    link: string;
    badge: string;
  }>;
  parkingInfo: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FaqCollection {
  badge: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
  supportPrompt: {
    text: string;
    actionLabel: string;
  };
}

export interface NewsletterCollection {
  badge: string;
  title: string;
  subtitle: string;
  benefitText: string;
  inputPlaceholder: string;
  submitButtonText: string;
  submittingText: string;
  successTitle: string;
  successMessage: string;
  instantCoupon: string;
  disclaimer: string;
}

export interface CartCheckoutConfig {
  drawerTitle: string;
  emptyCartText: string;
  emptyCartSubtext: string;
  exploreMenuLabel: string;
  itemsLabel: string;
  clearCartLabel: string;
  subtotalLabel: string;
  deliveryTypePrompt: string;
  pickupOptionLabel: string;
  deliveryOptionLabel: string;
  deliveryFeeText: string;
  freePickupText: string;
  totalLabel: string;
  nameInputPlaceholder: string;
  addressInputPlaceholder: string;
  notesInputPlaceholder: string;
  submitOrderWhatsappLabel: string;
  whatsappMessageHeader: string;
  whatsappItemPrefix: string;
  whatsappTotalPrefix: string;
  whatsappTypePrefix: string;
  whatsappNotesPrefix: string;
}

export interface FooterCollection {
  description: string;
  columns: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;
  paymentMethodsTitle: string;
  paymentMethods: string[];
  copyright: string;
  whiteLabelNotice: {
    badge: string;
    text: string;
  };
}

export interface AppDatabase {
  theme_config: ThemeConfig;
  brand_profile: BrandProfile;
  seo_metadata: SeoMetadata;
  navigation: NavigationCollection;
  hero_section: HeroSectionCollection;
  fresh_batches: FreshBatchesCollection;
  product_categories: ProductCategory[];
  products: ProductsCollection;
  artisanal_process: ArtisanalProcessCollection;
  special_offers: SpecialOfferCollection;
  customer_reviews: ReviewsCollection;
  master_baker: MasterBakerCollection;
  store_location: StoreLocationCollection;
  faq: FaqCollection;
  newsletter: NewsletterCollection;
  cart_checkout: CartCheckoutConfig;
  footer: FooterCollection;
}
