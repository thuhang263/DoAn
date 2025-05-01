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
    userName: { marginLeft: 10, fontSize: 18, fontWeight: 'bold' },
    avatarImage: { width: 80, height: 140 ,right:20,},

    dateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    avatarImageText:{
        width: 190, height: 52 ,
        left:20,
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
      marginTop: 50,
      borderWidth:1,
      borderColor:'#61BFE7',
      width:320,
      left:20,
    },
    icon: {
      width:  18,
      height:  18,
    },
    searchInput: {
      flex: 1,
      fontSize:  14,
      color: 'black',
    },
    
   
    searchButton: {
      backgroundColor: '#007bff',
      borderRadius: 8,
      width:100,
      height:50,
      alignSelf:'center',
      top:10,
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 16,
      alignSelf:'center',
      top:13,
    },
    historyContainer: {
      marginTop: 10,
    },
    historyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
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
      color: '#333',
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

    
  });
  