import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
      width: 360,
      height:160,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      padding: 20, backgroundColor: '#61BFE7', 
      borderBottomLeftRadius: 50, 
      borderBottomRightRadius: 50 
      },
  
    profileContainer: { flexDirection: 'row', alignItems: 'center' },
   
    avatarImage: { width: 100, height: 110,top:20,},

    dateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    avatarImageText:{
        width: 150, height: 41 ,
        left:20,
        top:20,
    },
    search:{
      width:30,
      height:30,
      top:10,
      left:20,
    },
    item:{
      width:370,
      height:50,
      borderRadius:20,
      borderColor:'#78C93C',
      top:20,
      alignSelf:'center',
      borderWidth: 1,
    },
    text:{
      color:'black',
      left:70,
      bottom:20,
      fontSize:18
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 10,
      height:  40,
      marginTop: 10,
      borderWidth:1,
      borderColor:'#61BFE7',
      width:320,
      left:20,
    },
    icon: {
      width:  25,
      height:  25,
    },
    searchInput: {
      flex: 1,
      fontSize:  14,
      color: 'black',
    },
   
    searchButton: {
      borderRadius: 8,
      alignSelf:'center',
      right:20,
    },

    historyContainer: {
      marginTop: 10,
    },
    historyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#F66923',
    },
    historyItem: {
      fontSize: 16,
      paddingVertical: 8,
      color: '#007bff',
    },
    resultsContainer: {
      marginTop: 20,
      
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color:'#14C089'
    },
    resultItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    resultText: {
      fontSize: 16,
      color: '#333',
    },
    guideBox: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 4,
      width:320,
      alignSelf:'center',
      top:7
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    catImage: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginRight: 10,
    },
    guideText: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    stepTitle: {
      marginTop: 8,
      fontWeight: 'bold',
      fontSize: 16,
      color: '#222',
    },
    stepText: {
      fontSize: 14,
      marginBottom: 8,
      color: '#444',
    },
    saveButton: {
      backgroundColor: '#28c76f',
      width:100,
      height:40,
      alignItems: 'center',
      marginTop: 8,
      borderRadius:20,
      alignSelf:'center'
    },
    savedButton: {
      backgroundColor: '#aaa',
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      top:10,
    },
    
  });
  