import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
      width: 420,
      height:160,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      padding: 20, backgroundColor: '#61BFE7', 
      borderBottomLeftRadius: 50, 
      borderBottomRightRadius: 50 
      },
  
    profileContainer: { flexDirection: 'row', alignItems: 'center' },
    userName: { marginLeft: 10, fontSize: 18, fontWeight: 'bold' },
    avatarImage: { width: 100, height: 100 ,left:20,top:20,},

    dateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    avatarImageText:{
        width: 170, height: 30 ,
        right:20,
        top:20,
    },
    item:{
      backgroundColor:'#61BFE7',
      marginTop:30,
      width:250,
      height:230,
      borderRadius:20,
      alignItems:'center',
      alignSelf:'center',
      shadowColor: '#20B5F5',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    ImageItem:{
      width:80,
      height:80,
      marginTop:20,

    },
    text:{
      color:'#fff',
      fontSize:18,
      top:5
    },
    btn:{
      
      width:200,
      height:40,
      backgroundColor:'#fff',
      borderRadius:20,
      marginTop:20,
    },
    TextBtn:{
      fontSize:16,
      textAlign:'center',
      marginTop:10,
    }

    
  });
  