import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
      width:415,
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
      width:370,
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

    
  });
  