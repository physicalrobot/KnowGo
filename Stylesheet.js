import { StyleSheet,Dimensions } from 'react-native';

const { width } = Dimensions.get("window"); // Get the screen width


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
  mapContainer: {
    flex:1,
    
  },
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
  },

  //Tutor Profile Setup

  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    maxHeight: 150, // Limit height
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  selectedSubjects: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  subjectBadge: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: 5,
    margin: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  

  //Sign In

  knowgosvgcontainer:{
    position: "absolute", // Allows positioning relative to the parent
    top: 10, // Distance from the top of the app
    left: -200, // Center horizontally if needed
    right: 0, // Center horizontally if needed
    alignItems: "center", // Centers the SVG horizontally
    zIndex: 10, // Ensures the SVG appears above the PNG logo
  },

  signInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Light background color
    padding: 20,
    position:"relative"
  },

  inputContainer:{
    width: "100%",
    top: width/2 + 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Light background color
    marginBottom:170
  },
  
  logo: {
    position: "absolute", // Allows free positioning
    top: width/3, // Adjust the vertical position
    alignSelf: "center", // Horizontally center the logo
    width: 300, // Define the size of the logo
    height: 300,
    resizeMode: "contain", // Maintain aspect ratio

  },
  
  headerText: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,

  },
  knowText: {
    fontSize: 38,
    color: "#407EA6", // Color for "Know"
    fontFamily: "QuicksandB", // Add your custom font here


  },
  goText: {
    fontSize: 38,
    color: "#FF723B", // Color for "Go"
    fontFamily: "QuicksandB", // Add your custom font here

  },
  
  
  subHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF7A00", // Accent color for tagline
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Quicksand", // Add your custom font here
    top:110,
    left:23,
    position: "absolute"
  },
  
  input: {
    width: "85%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  
  buttonPrimary: {
    width: "55%",
    height: 50,
    backgroundColor:"#427DA6", // Primary button color
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,

  },
  
  buttonTextPrimary: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  forgotPassword: {
    fontSize: 14,
    color: "#FF7A00",
    marginTop: 10,
    margin:100,
    textAlign: "center",
  },
  

  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 190, // Adjust to match the desired size
    borderTopLeftRadius: width / 2,
    borderTopRightRadius: width / 2,
    alignItems: "center",
    justifyContent: "center", // Center buttons vertically
    overflow: "hidden",
    alignSelf: "center", // Horizontally center the logo

  },
  
  footerButton: {
    width: "55%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  
  footerButtonText: {
    color: "#427DA6",
    fontSize: 14,
    fontWeight: "bold",
  },


  //Sign Up

  signUpHeaderContainer:{
    left:-70,

  },

  headerImage:{
    position: "absolute",
    top: -270,
    width: width,
    height: 190, // Adjust to match the desired size
  }
  

});

export default styles;
