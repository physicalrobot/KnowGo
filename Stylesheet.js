import { StyleSheet,Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  error: { color: 'red', marginTop: 10 },

  // Welcome
  welcome: { fontSize: 30, marginBottom: 10 },

  // Navigation Bar
  navbar: {
    flexDirection: 'row',           // Arrange items in a row
    justifyContent: 'space-around', // Space items evenly
    alignItems: 'center',           // Center items vertically
    paddingVertical: 30,            // Vertical padding
    backgroundColor: '#f8f9fa',     // Background color
    borderBottomWidth: 1,           // Add a bottom border
    borderColor: '#ddd',            // Border color
    width: '100%',                  // Ensure full width of the screen
    position: 'relative',           // Position it at the top
    top: 0,                         // Align to the top of the screen
    zIndex: 10,                     // Ensure it stays above other components
  },
  navItem: {
    alignItems: 'center',           // Center text/icons
    flex: 1,                        // Distribute space evenly for each item
  },

  // Map Component
  map: {
    width: '100%', // Use full width of the screen to align with the navbar
    height: Dimensions.get('window').height * 0.4, // Keep height as is
    marginTop: 0, // Ensure no extra spacing at the top
  },
  
  // Call to Action
  ctaContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    marginVertical: 10,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Featured Tutors
  featuredContainer: {
    padding: 20,
  },
  featuredHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featuredTutorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
  },
  featuredAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuredSubjects: {
    fontSize: 14,
    color: '#6c757d',
  },
  featuredRating: {
    fontSize: 14,
    color: '#ffc107',
  },

  // Popular Subjects
  subjectsContainer: {
    padding: 20,
  },
  subjectsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subjectCard: {
    backgroundColor: '#e9ecef',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
  },
  subjectText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },


//Sign Up and Sign In
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },

  signbutt: {
    marginVertical: 10, // Vertical margin for space between buttons
  },

  signbutt2:{
    marginTop: 10, // Additional top margin for the second button

  }


});

export default styles;
