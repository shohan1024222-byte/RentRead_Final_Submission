// Language System for RentRead
const translations = {
  en: {
    // Brand
    tagline: 'Read more • Spend less',
    
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    admin: 'Admin',
    contact: 'Contact',
    myRentals: 'My Rentals',
    themes: '🎨 Themes',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    logout: 'Logout',
    backBtn: '← Back',
    
    // Contact Page
    contactSupport: 'Contact Support',
    contactTitle: '📞 Contact Us',
    contactDesc: 'Get in touch with our support team. We\'re here to help you with any questions or concerns.',
    emailSupport: 'Email Support',
    emailSupportDesc: 'Send us an email and we\'ll respond within 24 hours',
    phoneSupport: 'Phone Support',
    phoneSupportDesc: 'Call us during business hours for immediate assistance',
    chatWithAdmin: 'Chat with Admin',
    getInstantSupport: 'Get instant support',
    adminTyping: 'Admin is typing...',
    typeMessage: 'Type your message...',
    sendBtn: 'Send 📤',
    businessHours: 'Business Hours:',
    businessHoursValue: 'Sunday - Thursday, 9:00 AM - 6:00 PM (GMT+6)',
    address: 'Address:',
    addressValue: 'Dhaka, Bangladesh',
    welcomeChat: 'Hello! 👋 Welcome to RentRead support. How can I help you today?',
    loginToChat: 'Please login from dashboard to start chatting with admin support.',
    pleaseLoginChat: 'Please login to chat...',
    
    // Dashboard Marquee
    dashMarquee1: 'Welcome to Your Dashboard!',
    dashMarquee2: 'Manage your rentals & discover new books',
    dashMarquee3: 'Don\'t forget to check your rental expiry dates!',
    dashMarquee4: 'Rate your books to help other readers',
    dashMarquee5: 'Set reading goals for 2025!',
    dashMarquee6: 'Access your books from any device',
    dashMarquee7: 'Need help? Contact our support team anytime',
    dashMarquee8: 'Check out new arrivals every week!',
    dashMarquee9: 'Easy & Secure Payment Options',
    dashMarquee10: 'Tip: You can extend rentals before they expire',
    
    // My Rental Page
    myProfile: 'My Profile',
    viewProfile: 'View Profile',
    hideProfile: 'Hide Profile',
    nameLabel: 'Name:',
    emailLabel: 'Email:',
    phoneLabel: 'Phone:',
    addressLabel: 'Address:',
    notProvided: 'Not provided',
    yourLibrary: 'Your Library',
    libraryDesc: 'Manage and track all your book rentals',
    totalRentals: 'Total Rentals',
    activeRentals: 'Active Rentals',
    totalSpent: 'Total Spent',
    loadingRental: 'Loading rental information...',
    noRentalsFound: 'No Rentals Found',
    noRentalsDesc: 'You haven\'t rented any books yet. Start by renting books from the dashboard!',
    findBooks: 'Find Books',
    editProfile: 'Edit Profile',
    
    // Rental Card Labels
    author: 'Author',
    rentalDate: 'Rental Date',
    expiryDate: 'Expiry Date',
    rentalDays: 'Rental Days',
    days: 'days',
    totalCost: 'Total Cost',
    status: 'Status',
    daysRemaining: 'Days Remaining',
    expirestoday: 'Expires today',
    readBook: 'Read Book',
    details: 'Details',
    active: 'Active',
    expired: 'Expired',
    completed: 'Completed',
    
    // Admin Panel - Payment Requests
    adminPanel: 'Admin Panel',
    managePaymentRequests: 'Manage Book Rental Payment Requests',
    backToAdmin: '← Back to Admin',
    pendingRequests: 'Pending Requests',
    approvedToday: 'Approved Today',
    rejectedToday: 'Rejected Today',
    totalAmount: 'Total Amount',
    paymentRequestsTitle: 'Payment Requests',
    filterAll: 'All',
    filterPending: 'Pending',
    filterApproved: 'Approved',
    filterRejected: 'Rejected',
    loadingRequests: 'Loading requests...',
    thRequestId: 'Request ID',
    thUserDetails: 'User Details',
    thBook: 'Book',
    thDuration: 'Duration',
    thAmount: 'Amount',
    thTransactionId: 'Transaction ID',
    thStatus: 'Status',
    thActions: 'Actions',
    noRequestsFound: 'No requests found',
    noRequestsDesc: 'Payment requests will appear here when users submit them.',
    confirmTitle: 'Confirm',
    confirmMessage: 'Are you sure?',
    cancelBtn: 'Cancel',
    confirmBtn: 'Confirm',
    
    // Admin Chat Panel
    adminChatPanel: 'Admin Chat Panel',
    userChats: 'User Chats',
    searchUsers: 'Search users...',
    loadingUsers: 'Loading users...',
    selectUserToChat: 'Select a user to start chatting',
    selectUserDesc: 'Choose a user from the list to view and respond to messages',
    noChatsYet: 'No chats yet',
    
    // Hero Section
    heroTitle: "Welcome to RentRead - Bangladesh's Premier Book Rental Platform",
    heroDescription: 'Computer Science, General Science, Science Fiction & Extra Education — rent top titles for days, not dollars.',
    badgePricing: 'BDT friendly pricing',
    badgeDelivery: 'Instant PDF Access',
    searchPlaceholder: 'Search books...',
    searchBtn: 'Search',
    clearBtn: 'Clear',
    
    // Categories
    all: 'All',
    story: 'Story',
    essay: 'Essay',
    poetry: 'Poetry',
    computerScience: 'Computer Science',
    generalScience: 'General Science',
    scienceFiction: 'Science Fiction',
    extraEducational: 'Extra Educational',
    
    // Book Cards
    availableBooks: 'Available Books',
    showingAll: 'Showing all',
    showingResults: 'Showing {count} result(s)',
    rentNow: '📚 Rent Now',
    details: '🔍 Details',
    perDay: '/day',
    basePrice: 'Base',
    rental: 'Rental',
    basePriceLabel: 'Base Price:',
    uncategorized: 'Uncategorized',
    unknownAuthor: 'Unknown',
    variousAuthor: 'Various',
    noBooksFound: 'No books found',
    noBooksMessage: '📚 No books available at the moment.',
    noBooksDesc: 'No books found. Add some books to get started!',
    showingBooks: 'Showing',
    book: 'book',
    books: 'books',
    edit: '✏️ Edit',
    delete: '🗑️ Delete',
    
    // Footer
    aboutTitle: 'About RentRead',
    aboutText: 'offers book rentals at affordable rates, keeping Bangladeshi students in mind. Read amazing Bangla & English titles for a small price, for a limited time.',
    explore: 'Explore',
    allBooks: 'All Books',
    pricing: 'Pricing',
    faq: 'FAQ',
    legal: 'Legal',
    terms: 'Terms',
    privacy: 'Privacy',
    refund: 'Refund',
    copyright: '© 2025 RentRead • All Rights Reserved',
    
    // Marquee
    marquee1: 'Welcome to RentRead',
    marquee2: 'New Year Special',
    marquee3: 'Quality Books at Affordable Prices',
    marquee4: 'Fast Delivery Across Bangladesh',
    marquee5: 'Starting from just ৳15/day',
    marquee6: 'Trending: Computer Science & Science Fiction Books',
    marquee7: 'Read More, Spend Less with RentRead',
    marquee8: 'Refer a Friend & Get ৳50 Credit',
    marquee9: 'Easy Online Payment Available',
    marquee10: '24/7 Customer Support',
    
    // Modals
    pricingTitle: '💵 Pricing',
    faqTitle: '❓ FAQ',
    termsTitle: '📜 Terms of Service',
    privacyTitle: '🔒 Privacy Policy',
    refundTitle: '📦 Refund Policy',
    close: 'Close',
    
    // Pricing Modal
    pricingHeader: '💰 Our Pricing',
    pricingUnique: '📚 Each Book Has Unique Pricing:',
    pricingBase: 'Every book has its own Base Price',
    pricingDaily: 'Every book has a different Daily Rate',
    pricingSelect: 'Select a book to see its specific pricing',
    priceCalc: '🧮 Price Calculation:',
    priceFormula: 'Total Price = Base Price + (Extra Days × Daily Rate)',
    paymentMethod: '💳 Payment Method:',
    onlyBkash: 'Only bKash',
    submitTxn: 'Submit your payment with Transaction ID',
    
    // FAQ Modal
    faqHow: '❓ How does RentRead work?',
    faqHowAns: 'Browse our collection, select a book, choose your rental duration, pay via bKash. Once payment is verified, you can read the PDF!',
    faqPeriod: '📅 What rental period can I choose?',
    faqPeriodAns: 'You can select any time period you want! Choose the number of days that suits your reading needs.',
    faqPay: '💳 How do I pay?',
    faqPayAns: 'Payment is accepted via bKash only. After payment, submit your Transaction ID for verification.',
    faqCost: '💰 How much does a book cost?',
    faqCostAns: 'Each book has its own Base Price and Daily Rate. You\'ll see the exact price when you select a book.',
    faqRead: '📖 How do I read the book?',
    faqReadAns: 'Once payment is verified, go to "My Rentals" in your Dashboard to access the PDF.',
    faqExtend: '⚠️ Can I extend my rental?',
    faqExtendAns: 'No. Rental extension is not available. You need to rent again after expiry.',
    faqSupport: '📞 How do I get support?',
    faqSupportAns: 'Send a message from the Contact page or chat with Admin.',
    
    // Terms Modal
    termsContent1: 'Users must be 13 years or older to use RentRead.',
    termsContent2: 'Rented book PDFs are for personal reading only. Sharing or downloading is prohibited.',
    termsContent3: 'Book access is granted only after payment verification.',
    termsContent4: 'Access will be revoked after the rental period ends.',
    termsContent5: 'Incorrect Transaction ID will result in payment rejection.',
    termsContent6: 'RentRead reserves the right to modify pricing and policies at any time.',
    termsContent7: 'Account sharing is prohibited.',
    termsLastUpdated: 'Last updated: December 2025',
    
    // Privacy Modal
    privacyIntro: 'At RentRead, your privacy is important to us:',
    privacyData: 'Data Collection:',
    privacyDataDesc: 'We collect name, email, phone number, and payment information.',
    privacyUsage: 'Data Usage:',
    privacyUsageDesc: 'Your information is used only for account management and payment verification.',
    privacySecurity: 'Data Security:',
    privacySecurityDesc: 'All data is encrypted and stored securely.',
    privacyThirdParty: 'Third Parties:',
    privacyThirdPartyDesc: 'We do not sell your data to anyone.',
    privacyCookies: 'Cookies:',
    privacyCookiesDesc: 'We use cookies to improve user experience.',
    privacyContact: 'For questions, contact us through the Contact page.',
    
    // Refund Modal
    refundEligible: '💰 Eligible for Refund:',
    refundEligible1: 'Full refund if there\'s an issue before payment verification.',
    refundEligible2: 'Refund or correct book access if wrong book was provided.',
    refundEligible3: 'Refund or extension if technical issues prevent reading.',
    refundNotEligible: '❌ Not Eligible for Refund:',
    refundNotEligible1: 'After you start reading the book.',
    refundNotEligible2: 'After the rental period has ended.',
    refundNotEligible3: 'Reason: "I didn\'t like the book".',
    refundRequest: '📞 For Refund Requests:',
    refundRequestDesc: 'Contact us through the Contact page with your Transaction ID. Resolution within 24-48 hours.',
    
    // Auth
    welcomeBack: 'Welcome back!',
    myLibrary: 'My Library',
    manageBooks: 'Manage your rented books and discover new titles to read.',
    signInDesc: 'Sign in to access your RentRead account',
    createAccount: 'Create Account',
    joinRentRead: 'Join RentRead to access your digital library',
    
    // Rent Modal
    rentBook: 'Rent Book',
    daysToRent: 'Days to rent',
    daysToRentLabel: 'Days to rent (1-30)',
    total: 'Total',
    cancel: 'Cancel',
    confirm: 'Confirm',
    rentConfirm: 'Rent & Confirm',
    baseFor: 'Base:',
    forDay: 'for',
    day: 'day',
    extraDays: 'Extra',
    dayText: 'day(s)',
    
    // Admin Panel
    userChat: 'User Chat',
    paymentRequests: 'Payment Requests',
    adminMarquee1: 'Admin Panel!',
    adminMarquee2: 'Manage Books, Users & Payments',
    adminMarquee3: 'Secure Dashboard',
    adminMarquee4: 'Full Control',
    adminMarquee5: 'Edit, Delete, Add Books',
    adminMarquee6: 'Admin Access Only',
    adminMarquee7: 'Manage All Rentals',
    adminMarquee8: 'Admin Portal',
    bookCatalogMgmt: 'Book Catalog Management',
    bookCatalogDesc: 'Add, edit, delete and manage your book inventory with ease.',
    crudOps: 'CRUD Operations',
    fullControl: 'Full Control',
    adminLogin: 'Admin Login',
    adminLoginDesc: 'Access Admin Dashboard',
    email: 'Email',
    password: 'Password',
    loginBtn: 'Login',
    addNewBook: 'Add New Book',
    refresh: 'Refresh',
    booksCatalog: 'Books Catalog',
    
    // Payment Page
    completePayment: 'Complete Your Payment',
    scanBkashQR: 'Scan the Bkash QR code below to complete your rental',
    yourCart: '🛒 Your Cart',
    addMoreBooks: '+ Add More Books',
    totalAmount: 'Total Amount:',
    bkashPayment: 'Bkash Payment',
    chooseAdmin: 'Choose Any Admin to Send Money:',
    smritisBkash: '🏦 Smriti\'s Bkash',
    shohansBkash: '🏦 Shohan\'s Bkash',
    howToPay: '📋 How to Pay:',
    payStep1: 'Open Bkash app on your phone',
    payStep2: 'Choose any admin above and scan their QR code or send to their number',
    payStep3: 'Enter the amount shown above',
    payStep4: 'Complete the payment',
    payStep5: 'Enter your transaction ID below',
    payStep6: 'Click "Confirm Payment"',
    enterTransactionId: 'Enter your Bkash Transaction ID (e.g., BDU1234567890)',
    confirmPayment: 'Confirm Payment',
    cancelPayment: 'Cancel',
    cartEmpty: 'Your cart is empty. Add books to proceed.',
    emptyCartIcon: '📚',
    cartItemDays: 'day',
    cartItemDaysPlural: 'days',
    cartItemBase: 'Base:',
    removeItem: 'Remove',
    paymentSuccess: '✅ Payment Submitted Successfully!',
    pleaseWait: '📌 Please Wait for Admin Approval',
    booksRequested: 'book(s) requested',
    rentalActivated: 'Your rental will be activated once the admin verifies your payment.',
    paymentSubmitted: 'Payment Submitted',
    ok: '✓ OK',
    downloadPaymentSlip: '📄 Download Payment Slip',
    enterTransactionIdError: 'Please enter your transaction ID',
    cartEmptyError: 'Your cart is empty. Please add books to proceed.',
    failed: 'Failed to process',
    tryAgain: 'Please try again.',
    thTransactionId: 'Transaction ID',
    cancelConfirm: 'Cancel this payment?',
    mustLoginFirst: 'You Must Login First',
    loginMessage: 'Please log in to your account to rent books and access our digital library.',
    closeBtn: 'Close',
    signInNow: 'Sign In Now'
  },
  
  bn: {
    // Brand
    tagline: 'বেশি পড়ুন • কম খরচ করুন',
    
    // Navigation
    home: 'হোম',
    dashboard: 'ড্যাশবোর্ড',
    admin: 'এডমিন',
    contact: 'যোগাযোগ',
    myRentals: 'আমার ভাড়া',
    themes: '🎨 থিম',
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    logout: 'লগআউট',
    backBtn: '← পেছনে',
    
    // Contact Page
    contactSupport: 'সাপোর্টে যোগাযোগ',
    contactTitle: '📞 যোগাযোগ করুন',
    contactDesc: 'আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন। যেকোনো প্রশ্ন বা সমস্যায় আমরা আপনার পাশে আছি।',
    emailSupport: 'ইমেইল সাপোর্ট',
    emailSupportDesc: 'আমাদের ইমেইল করুন, ২৪ ঘন্টার মধ্যে উত্তর দেব',
    phoneSupport: 'ফোন সাপোর্ট',
    phoneSupportDesc: 'তাৎক্ষণিক সাহায্যের জন্য অফিস সময়ে কল করুন',
    chatWithAdmin: 'এডমিনের সাথে চ্যাট',
    getInstantSupport: 'তাৎক্ষণিক সাপোর্ট পান',
    adminTyping: 'এডমিন টাইপ করছেন...',
    typeMessage: 'আপনার মেসেজ লিখুন...',
    sendBtn: 'পাঠান 📤',
    businessHours: 'অফিস সময়:',
    businessHoursValue: 'রবিবার - বৃহস্পতিবার, সকাল ৯:০০ - সন্ধ্যা ৬:০০ (GMT+6)',
    address: 'ঠিকানা:',
    addressValue: 'ঢাকা, বাংলাদেশ',
    welcomeChat: 'হ্যালো! 👋 RentRead সাপোর্টে স্বাগতম। আজ আপনাকে কিভাবে সাহায্য করতে পারি?',
    loginToChat: 'এডমিন সাপোর্টের সাথে চ্যাট করতে ড্যাশবোর্ড থেকে লগইন করুন।',
    pleaseLoginChat: 'চ্যাট করতে লগইন করুন...',
    
    // Dashboard Marquee
    dashMarquee1: 'আপনার ড্যাশবোর্ডে স্বাগতম!',
    dashMarquee2: 'আপনার ভাড়া ম্যানেজ করুন ও নতুন বই আবিষ্কার করুন',
    dashMarquee3: 'ভাড়ার মেয়াদ শেষের তারিখ দেখতে ভুলবেন না!',
    dashMarquee4: 'অন্য পাঠকদের সাহায্য করতে বই রেটিং দিন',
    dashMarquee5: '২০২৫ এর জন্য পড়ার লক্ষ্য সেট করুন!',
    dashMarquee6: 'যেকোনো ডিভাইস থেকে আপনার বই পড়ুন',
    dashMarquee7: 'সাহায্য দরকার? যেকোনো সময় আমাদের সাপোর্ট টিমে যোগাযোগ করুন',
    dashMarquee8: 'প্রতি সপ্তাহে নতুন বই দেখুন!',
    dashMarquee9: 'সহজ ও নিরাপদ পেমেন্ট অপশন',
    dashMarquee10: 'টিপস: মেয়াদ শেষ হওয়ার আগে ভাড়া বাড়াতে পারবেন',
    
    // My Rental Page
    myProfile: 'আমার প্রোফাইল',
    viewProfile: 'প্রোফাইল দেখুন',
    hideProfile: 'প্রোফাইল লুকান',
    nameLabel: 'নাম:',
    emailLabel: 'ইমেইল:',
    phoneLabel: 'ফোন:',
    addressLabel: 'ঠিকানা:',
    notProvided: 'দেওয়া হয়নি',
    yourLibrary: 'আপনার লাইব্রেরি',
    libraryDesc: 'আপনার সব বই ভাড়া ম্যানেজ ও ট্র্যাক করুন',
    totalRentals: 'মোট ভাড়া',
    activeRentals: 'সক্রিয় ভাড়া',
    totalSpent: 'মোট খরচ',
    loadingRental: 'ভাড়ার তথ্য লোড হচ্ছে...',
    noRentalsFound: 'কোনো ভাড়া নেই',
    noRentalsDesc: 'আপনি এখনো কোনো বই ভাড়া নেননি। ড্যাশবোর্ড থেকে বই ভাড়া নিন!',
    findBooks: 'বই খুঁজুন',
    editProfile: 'প্রোফাইল এডিট',
    
    // Rental Card Labels
    author: 'লেখক',
    rentalDate: 'ভাড়ার তারিখ',
    expiryDate: 'মেয়াদ শেষের তারিখ',
    rentalDays: 'ভাড়ার দিন',
    days: 'দিন',
    totalCost: 'মোট খরচ',
    status: 'অবস্থা',
    daysRemaining: 'বাকি দিন',
    expirestoday: 'আজ মেয়াদ শেষ',
    readBook: 'বই পড়ুন',
    details: 'বিস্তারিত',
    active: 'সক্রিয়',
    expired: 'মেয়াদ শেষ',
    completed: 'সম্পন্ন',
    
    // Admin Panel - Payment Requests
    adminPanel: 'এডমিন প্যানেল',
    managePaymentRequests: 'বই ভাড়ার পেমেন্ট অনুরোধ ম্যানেজ করুন',
    backToAdmin: '← এডমিনে ফিরুন',
    pendingRequests: 'পেন্ডিং অনুরোধ',
    approvedToday: 'আজ অনুমোদিত',
    rejectedToday: 'আজ বাতিল',
    totalAmount: 'মোট পরিমাণ',
    paymentRequestsTitle: 'পেমেন্ট অনুরোধসমূহ',
    filterAll: 'সব',
    filterPending: 'পেন্ডিং',
    filterApproved: 'অনুমোদিত',
    filterRejected: 'বাতিল',
    loadingRequests: 'অনুরোধ লোড হচ্ছে...',
    thRequestId: 'অনুরোধ আইডি',
    thUserDetails: 'ইউজার তথ্য',
    thBook: 'বই',
    thDuration: 'সময়কাল',
    thAmount: 'পরিমাণ',
    thTransactionId: 'ট্রানজেকশন আইডি',
    thStatus: 'স্ট্যাটাস',
    thActions: 'অ্যাকশন',
    noRequestsFound: 'কোনো অনুরোধ নেই',
    noRequestsDesc: 'ইউজাররা পেমেন্ট অনুরোধ পাঠালে এখানে দেখাবে।',
    confirmTitle: 'নিশ্চিত করুন',
    confirmMessage: 'আপনি কি নিশ্চিত?',
    cancelBtn: 'বাতিল',
    confirmBtn: 'নিশ্চিত',
    
    // Admin Chat Panel
    adminChatPanel: 'এডমিন চ্যাট প্যানেল',
    userChats: 'ইউজার চ্যাটসমূহ',
    searchUsers: 'ইউজার খুঁজুন...',
    loadingUsers: 'ইউজার লোড হচ্ছে...',
    selectUserToChat: 'চ্যাট করতে একজন ইউজার সিলেক্ট করুন',
    selectUserDesc: 'মেসেজ দেখতে ও উত্তর দিতে তালিকা থেকে একজন ইউজার বেছে নিন',
    noChatsYet: 'এখনো কোনো চ্যাট নেই',
    
    // Hero Section
    heroTitle: 'RentRead এ স্বাগতম - বাংলাদেশের সেরা বই ভাড়ার প্ল্যাটফর্ম',
    heroDescription: 'কম্পিউটার সায়েন্স, জেনারেল সায়েন্স, সায়েন্স ফিকশন ও অতিরিক্ত শিক্ষা — সেরা বইগুলো ভাড়া নিন কম খরচে।',
    badgePricing: 'সাশ্রয়ী মূল্য',
    badgeDelivery: 'তাৎক্ষণিক PDF এক্সেস',
    searchPlaceholder: 'বই খুঁজুন...',
    searchBtn: 'খুঁজুন',
    clearBtn: 'মুছুন',
    
    // Categories
    all: 'সব',
    story: 'গল্প',
    essay: 'প্রবন্ধ',
    poetry: 'কবিতা',
    computerScience: 'কম্পিউটার সায়েন্স',
    generalScience: 'সাধারণ বিজ্ঞান',
    scienceFiction: 'সায়েন্স ফিকশন',
    extraEducational: 'অতিরিক্ত শিক্ষা',
    
    // Book Cards
    availableBooks: 'উপলব্ধ বইসমূহ',
    showingAll: 'সব দেখাচ্ছে',
    showingResults: '{count}টি ফলাফল দেখাচ্ছে',
    rentNow: '📚 ভাড়া নিন',
    details: '🔍 বিস্তারিত',
    perDay: '/দিন',
    basePrice: 'বেস',
    rental: 'ভাড়া',
    basePriceLabel: 'বেস প্রাইস:',
    uncategorized: 'অবিভাগীকৃত',
    unknownAuthor: 'অজানা',
    variousAuthor: 'বিভিন্ন লেখক',
    noBooksFound: 'কোনো বই নেই',
    noBooksMessage: '📚 এই মুহূর্তে কোনো বই উপলব্ধ নেই।',
    noBooksDesc: 'কোনো বই নেই। শুরু করতে কিছু বই যোগ করুন!',
    showingBooks: 'দেখাচ্ছে',
    book: 'বই',
    books: 'বইগুলো',
    edit: '✏️ এডিট',
    delete: '🗑️ ডিলিট',
    
    // Footer
    aboutTitle: 'RentRead সম্পর্কে',
    aboutText: 'বাংলাদেশের ছাত্রদের কথা মাথায় রেখে সাশ্রয়ী মূল্যে বই ভাড়া দেয়। অসাধারণ বাংলা ও ইংরেজি বই পড়ুন কম খরচে।',
    explore: 'এক্সপ্লোর',
    allBooks: 'সব বই',
    pricing: 'মূল্য',
    faq: 'প্রশ্নোত্তর',
    legal: 'আইনি',
    terms: 'শর্তাবলী',
    privacy: 'গোপনীয়তা',
    refund: 'রিফান্ড',
    copyright: '© ২০২৫ RentRead • সর্বস্বত্ব সংরক্ষিত',
    
    // Marquee
    marquee1: 'RentRead এ স্বাগতম',
    marquee2: 'নতুন বছর স্পেশাল',
    marquee3: 'সাশ্রয়ী মূল্যে মানসম্পন্ন বই',
    marquee6: 'ট্রেন্ডিং: কম্পিউটার সায়েন্স ও সায়েন্স ফিকশন বই',
    marquee7: 'বেশি পড়ুন, কম খরচ করুন RentRead এ',
    marquee9: 'সহজ অনলাইন পেমেন্ট',
    marquee10: '২৪/৭ কাস্টমার সাপোর্ট',
    
    // Modals
    pricingTitle: '💵 মূল্য',
    faqTitle: '❓ প্রশ্নোত্তর',
    termsTitle: '📜 সেবার শর্তাবলী',
    privacyTitle: '🔒 গোপনীয়তা নীতি',
    refundTitle: '📦 রিফান্ড নীতি',
    close: 'বন্ধ করুন',
    
    // Pricing Modal
    pricingHeader: '💰 আমাদের মূল্য',
    pricingUnique: '📚 প্রতিটি বইয়ের আলাদা মূল্য:',
    pricingBase: 'প্রতিটি বইয়ের নিজস্ব বেস প্রাইস আছে',
    pricingDaily: 'প্রতিটি বইয়ের আলাদা দৈনিক রেট আছে',
    pricingSelect: 'বই সিলেক্ট করলে মূল্য দেখতে পাবেন',
    priceCalc: '🧮 মূল্য হিসাব:',
    priceFormula: 'মোট মূল্য = বেস প্রাইস + (অতিরিক্ত দিন × দৈনিক রেট)',
    paymentMethod: '💳 পেমেন্ট মেথড:',
    onlyBkash: 'শুধুমাত্র bKash',
    submitTxn: 'Transaction ID দিয়ে পেমেন্ট সাবমিট করুন',
    
    // FAQ Modal
    faqHow: '❓ RentRead কিভাবে কাজ করে?',
    faqHowAns: 'আমাদের কালেকশন থেকে বই বেছে নিন, কতদিন পড়বেন সিলেক্ট করুন, bKash এ পেমেন্ট করুন। পেমেন্ট ভেরিফাই হলেই PDF পড়তে পারবেন!',
    faqPeriod: '📅 কত দিনের জন্য ভাড়া নেওয়া যায়?',
    faqPeriodAns: 'আপনি যেকোনো সময়কাল বেছে নিতে পারেন! আপনার পড়ার প্রয়োজন অনুযায়ী দিন সংখ্যা নির্বাচন করুন।',
    faqPay: '💳 কিভাবে পেমেন্ট করব?',
    faqPayAns: 'শুধুমাত্র bKash এ পেমেন্ট করা যায়। পেমেন্টের পর Transaction ID দিয়ে সাবমিট করুন।',
    faqCost: '💰 বইয়ের দাম কত?',
    faqCostAns: 'প্রতিটি বইয়ের আলাদা বেস প্রাইস এবং দৈনিক রেট আছে। বই সিলেক্ট করলে সঠিক মূল্য দেখতে পাবেন।',
    faqRead: '📖 বই কিভাবে পড়ব?',
    faqReadAns: 'পেমেন্ট ভেরিফাই হলে Dashboard থেকে "My Rentals" এ গিয়ে PDF পড়তে পারবেন।',
    faqExtend: '⚠️ ভাড়ার সময় বাড়ানো যায়?',
    faqExtendAns: 'না। ভাড়ার সময় বাড়ানোর সুযোগ নেই। মেয়াদ শেষ হলে নতুন করে ভাড়া নিতে হবে।',
    faqSupport: '📞 সাপোর্ট কিভাবে পাব?',
    faqSupportAns: 'Contact পেজ থেকে মেসেজ করুন বা Admin এর সাথে চ্যাট করুন।',
    
    // Terms Modal
    termsContent1: 'RentRead ব্যবহার করতে ১৩ বছর বা তার বেশি বয়স হতে হবে।',
    termsContent2: 'ভাড়া করা বইয়ের PDF শুধুমাত্র ব্যক্তিগত পড়ার জন্য। শেয়ার বা ডাউনলোড করা নিষিদ্ধ।',
    termsContent3: 'পেমেন্ট ভেরিফাই হওয়ার পরেই বই অ্যাক্সেস দেওয়া হবে।',
    termsContent4: 'ভাড়ার সময় শেষ হলে অ্যাক্সেস বন্ধ হয়ে যাবে।',
    termsContent5: 'ভুল Transaction ID দিলে পেমেন্ট রিজেক্ট হবে।',
    termsContent6: 'RentRead যেকোনো সময় মূল্য এবং নীতিমালা পরিবর্তন করার অধিকার রাখে।',
    termsContent7: 'একাউন্ট শেয়ার করা নিষিদ্ধ।',
    termsLastUpdated: 'সর্বশেষ আপডেট: ডিসেম্বর ২০২৫',
    
    // Privacy Modal
    privacyIntro: 'RentRead এ আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ:',
    privacyData: 'তথ্য সংগ্রহ:',
    privacyDataDesc: 'আমরা নাম, ইমেইল, ফোন নম্বর এবং পেমেন্ট তথ্য সংগ্রহ করি।',
    privacyUsage: 'তথ্যের ব্যবহার:',
    privacyUsageDesc: 'আপনার তথ্য শুধুমাত্র একাউন্ট ম্যানেজমেন্ট এবং পেমেন্ট ভেরিফিকেশনের জন্য ব্যবহৃত হয়।',
    privacySecurity: 'তথ্য সুরক্ষা:',
    privacySecurityDesc: 'সকল তথ্য এনক্রিপ্ট করে নিরাপদে সংরক্ষণ করা হয়।',
    privacyThirdParty: 'তৃতীয় পক্ষ:',
    privacyThirdPartyDesc: 'আমরা আপনার তথ্য কাউকে বিক্রি করি না।',
    privacyCookies: 'কুকিজ:',
    privacyCookiesDesc: 'ইউজার এক্সপেরিয়েন্স উন্নত করতে আমরা কুকিজ ব্যবহার করি।',
    privacyContact: 'প্রশ্নের জন্য Contact পেজ থেকে যোগাযোগ করুন।',
    
    // Refund Modal
    refundEligible: '💰 রিফান্ড পাওয়ার যোগ্য:',
    refundEligible1: 'পেমেন্ট ভেরিফিকেশনের আগে সমস্যা হলে পূর্ণ রিফান্ড।',
    refundEligible2: 'ভুল বই দেওয়া হলে রিফান্ড বা সঠিক বই অ্যাক্সেস।',
    refundEligible3: 'টেকনিক্যাল সমস্যায় পড়তে না পারলে রিফান্ড বা সময় বাড়ানো।',
    refundNotEligible: '❌ রিফান্ড পাবেন না:',
    refundNotEligible1: 'বই পড়া শুরু করার পরে।',
    refundNotEligible2: 'ভাড়ার সময় শেষ হয়ে গেলে।',
    refundNotEligible3: 'কারণ: "বইটি ভালো লাগেনি"।',
    refundRequest: '📞 রিফান্ড রিকোয়েস্টের জন্য:',
    refundRequestDesc: 'Transaction ID সহ Contact পেজ থেকে যোগাযোগ করুন। ২৪-৪৮ ঘন্টার মধ্যে সমাধান।',
    
    // Auth
    welcomeBack: 'স্বাগতম!',
    myLibrary: 'আমার লাইব্রেরি',
    manageBooks: 'আপনার ভাড়া করা বই ম্যানেজ করুন এবং নতুন বই আবিষ্কার করুন।',
    signInDesc: 'আপনার RentRead অ্যাকাউন্টে সাইন ইন করুন',
    createAccount: 'অ্যাকাউন্ট তৈরি করুন',
    joinRentRead: 'আপনার ডিজিটাল লাইব্রেরিতে প্রবেশ করতে RentRead এ যোগ দিন',
    
    // Rent Modal
    rentBook: 'বই ভাড়া নিন',
    daysToRent: 'কতদিনের জন্য',
    daysToRentLabel: 'কতদিনের জন্য ভাড়া নিবেন (১-৩০)',
    total: 'মোট',
    cancel: 'বাতিল',
    confirm: 'নিশ্চিত করুন',
    rentConfirm: 'ভাড়া নিশ্চিত করুন',
    baseFor: 'বেস:',
    forDay: 'জন্য',
    day: 'দিন',
    extraDays: 'অতিরিক্ত',
    dayText: 'দিন',
    
    // Admin Panel
    userChat: 'ইউজার চ্যাট',
    paymentRequests: 'পেমেন্ট অনুরোধ',
    adminMarquee1: 'এডমিন প্যানেল!',
    adminMarquee2: 'বই, ইউজার ও পেমেন্ট ম্যানেজ করুন',
    adminMarquee3: 'সুরক্ষিত ড্যাশবোর্ড',
    adminMarquee4: 'সম্পূর্ণ নিয়ন্ত্রণ',
    adminMarquee5: 'বই এডিট, ডিলিট, যোগ করুন',
    adminMarquee6: 'শুধু এডমিন অ্যাক্সেস',
    adminMarquee7: 'সব ভাড়া ম্যানেজ করুন',
    adminMarquee8: 'এডমিন পোর্টাল',
    bookCatalogMgmt: 'বই ক্যাটালগ ম্যানেজমেন্ট',
    bookCatalogDesc: 'সহজেই বই যোগ করুন, এডিট করুন, ডিলিট করুন এবং আপনার বই ইনভেন্টরি ম্যানেজ করুন।',
    crudOps: 'CRUD অপারেশন',
    fullControl: 'সম্পূর্ণ নিয়ন্ত্রণ',
    adminLogin: 'এডমিন লগইন',
    adminLoginDesc: 'এডমিন ড্যাশবোর্ডে প্রবেশ করুন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    loginBtn: 'লগইন',
    addNewBook: 'নতুন বই যোগ করুন',
    refresh: 'রিফ্রেশ',
    booksCatalog: 'বই ক্যাটালগ',
    
    // Payment Page
    completePayment: 'আপনার পেমেন্ট সম্পন্ন করুন',
    scanBkashQR: 'নিচে Bkash QR কোড স্ক্যান করে পেমেন্ট সম্পন্ন করুন',
    yourCart: '🛒 আপনার কার্ট',
    addMoreBooks: '+ আরও বই যোগ করুন',
    totalAmount: 'মোট পরিমাণ:',
    bkashPayment: 'Bkash পেমেন্ট',
    chooseAdmin: 'যেকোনো এডমিনকে পয়সা পাঠান:',
    smritisBkash: '🏦 Smriti\'s Bkash',
    shohansBkash: '🏦 Shohan\'s Bkash',
    howToPay: '📋 কিভাবে পেমেন্ট করবেন:',
    payStep1: 'আপনার ফোনে Bkash অ্যাপ খুলুন',
    payStep2: 'উপরের যেকোনো এডমিন বেছে নিন এবং তাদের QR কোড স্ক্যান করুন বা তাদের নম্বরে পাঠান',
    payStep3: 'উপরে দেখানো পরিমাণ প্রবেশ করুন',
    payStep4: 'পেমেন্ট সম্পন্ন করুন',
    payStep5: 'আপনার ট্রানজেকশন আইডি নিচে প্রবেশ করুন',
    payStep6: '"পেমেন্ট নিশ্চিত করুন" ক্লিক করুন',
    enterTransactionId: 'আপনার Bkash ট্রানজেকশন আইডি প্রবেশ করুন (যেমন, BDU1234567890)',
    confirmPayment: 'পেমেন্ট নিশ্চিত করুন',
    cancelPayment: 'বাতিল',
    cartEmpty: 'আপনার কার্ট খালি। এগিয়ে যেতে বই যোগ করুন।',
    emptyCartIcon: '📚',
    cartItemDays: 'দিন',
    cartItemDaysPlural: 'দিন',
    cartItemBase: 'বেস:',
    removeItem: 'সরিয়ে ফেলুন',
    paymentSuccess: '✅ পেমেন্ট সফলভাবে জমা হয়েছে!',
    pleaseWait: 'এডমিন অনুমোদনের জন্য অপেক্ষা করুন',
    booksRequested: 'বইয়ের অনুরোধ',
    rentalActivated: 'এডমিন আপনার পেমেন্ট যাচাই করার পরে আপনার ভাড়া সক্রিয় হবে।',
    paymentSubmitted: 'পেমেন্ট জমা হয়েছে',
    ok: '✓ ঠিক আছে',
    downloadPaymentSlip: '📄 পেমেন্ট স্লিপ ডাউনলোড করুন',
    enterTransactionIdError: 'আপনার ট্রানজেকশন আইডি প্রবেশ করুন',
    cartEmptyError: 'আপনার কার্ট খালি। এগিয়ে যেতে বই যোগ করুন।',
    failed: 'প্রক্রিয়াকরণ ব্যর্থ',
    tryAgain: 'আবার চেষ্টা করুন।',
    thTransactionId: 'ট্রানজেকশন আইডি',
    cancelConfirm: 'পেমেন্ট বাতিল করতে চান?',
    mustLoginFirst: 'আপনাকে প্রথমে লগইন করতে হবে',
    loginMessage: 'বই ভাড়া নিতে এবং আমাদের ডিজিটাল লাইব্রেরি অ্যাক্সেস করতে আপনার অ্যাকাউন্টে লগইন করুন।',
    closeBtn: 'বন্ধ করুন',
    signInNow: 'এখনই লগইন করুন'
  }
};

// Current language
let currentLang = localStorage.getItem('rentread-lang') || 'en';

// Get translation
function t(key) {
  return translations[currentLang][key] || translations['en'][key] || key;
}

// Make t() globally available
window.t = t;

// Set language
function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('rentread-lang', lang);
    updatePageLanguage();
    updateLangButton();
    // Dispatch custom event for pages that need to update dynamic text
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
  }
}

// Update language button text
function updateLangButton() {
  const btn = document.getElementById('toggleLang');
  if (btn) {
    btn.textContent = currentLang === 'en' ? '🌐 EN' : '🌐 বাংলা';
  }
  
  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === currentLang) {
      option.classList.add('active');
    }
  });
}

// Update all translatable elements on page
function updatePageLanguage() {
  // Update elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate;
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  
  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.dataset.translatePlaceholder;
    if (translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });
  
  // Update rent modal elements
  const rentTitle = document.getElementById('rentTitle');
  const rentDaysLabel = document.getElementById('rentDaysLabel');
  const rentCancelBtn = document.getElementById('rentCancel');
  const rentConfirmBtn = document.getElementById('rentConfirm');
  const totalLabel = document.querySelector('#rentModal [data-translate="total"]');
  const rrPriceBreakdown = document.getElementById('rrPriceBreakdown');
  
  if (rentTitle) rentTitle.textContent = t('rentBook');
  if (rentDaysLabel) rentDaysLabel.textContent = t('daysToRentLabel');
  if (rentCancelBtn) rentCancelBtn.textContent = t('cancel');
  if (rentConfirmBtn) rentConfirmBtn.textContent = t('rentConfirm');
  if (totalLabel) totalLabel.textContent = t('total');
  
  // Update price breakdown text with current language
  if (rrPriceBreakdown && rrPriceBreakdown.textContent) {
    const rentDaysInput = document.getElementById('rr_rentDays');
    const days = rentDaysInput ? Math.max(1, Math.min(30, parseInt(rentDaysInput.value || '1', 10))) : 1;
    const rentBookInfo = document.getElementById('rentBookInfo');
    const priceText = rentBookInfo ? rentBookInfo.textContent : '';
    const priceMatch = priceText.match(/৳\s*(\d+)/) || priceText.match(/(\d+)/);
    const basePrice = priceMatch ? parseInt(priceMatch[1], 10) : 15;
    const dailyIncrement = 2;
    const total = basePrice + ((days - 1) * dailyIncrement);
    
    const baseText = t('baseFor');
    const forText = t('forDay');
    const dayText = t('day');
    const extraText = t('extraDays');
    const daysText = t('dayText');
    const totalText = t('total');
    
    if (days === 1) {
      rrPriceBreakdown.textContent = `${baseText} ৳${basePrice} ${forText} 1 ${dayText}`;
    } else {
      const extra = (days - 1) * dailyIncrement;
      rrPriceBreakdown.innerHTML = `${baseText} ৳${basePrice} <br>${extraText} ${days - 1} ${daysText}: ৳${extra} <br><strong>${totalText}: ৳${total}</strong>`;
    }
  }
  
  // Update navigation
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' || href === '/index.html') {
      link.textContent = t('home');
    } else if (href.includes('dashboard')) {
      link.textContent = t('dashboard');
    } else if (href.includes('admin') && !href.includes('chat') && !href.includes('panel')) {
      link.textContent = t('admin');
    } else if (href.includes('contact')) {
      link.textContent = t('contact');
    } else if (href.includes('my_rental')) {
      link.textContent = t('myRentals');
    }
  });
  
  // Update theme button
  const themeBtn = document.getElementById('toggleTheme');
  if (themeBtn) {
    themeBtn.textContent = t('themes');
  }
  
  // Trigger custom event for page-specific updates
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

// Initialize language system
function initLanguageSystem() {
  const langBtn = document.getElementById('toggleLang');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  
  if (langBtn && langDropdown) {
    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
      // Close theme dropdown if open
      const themeDropdown = document.getElementById('themeDropdown');
      if (themeDropdown) themeDropdown.classList.remove('show');
    });
    
    // Close on outside click
    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });
    
    // Language option clicks
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        setLanguage(lang);
        langDropdown.classList.remove('show');
      });
    });
  }
  
  // Apply saved language
  updateLangButton();
  updatePageLanguage();
}

// Category translation mapping
const categoryMap = {
  'Story': { en: 'Story', bn: 'গল্প' },
  'Essay': { en: 'Essay', bn: 'প্রবন্ধ' },
  'Poetry': { en: 'Poetry', bn: 'কবিতা' },
  'Computer Science': { en: 'Computer Science', bn: 'কম্পিউটার সায়েন্স' },
  'General Science': { en: 'General Science', bn: 'সাধারণ বিজ্ঞান' },
  'Science Fiction': { en: 'Science Fiction', bn: 'সায়েন্স ফিকশন' },
  'Extra Educational': { en: 'Extra Educational', bn: 'অতিরিক্ত শিক্ষা' },
  'General': { en: 'General', bn: 'সাধারণ' }
};

// Function to translate category name
function translateCategory(categoryName) {
  if (!categoryName) return t('uncategorized');
  
  const mapping = categoryMap[categoryName];
  if (mapping) {
    return mapping[currentLang] || mapping.en;
  }
  
  // If category not in map, return as is
  return categoryName;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageSystem);
} else {
  initLanguageSystem();
}
