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
      width:280,
      height:270,
      borderRadius:20,
      alignItems:'center',
      alignSelf:'center',
    },
    ImageItem:{
      width:130,
      height:130,
      marginTop:20,

    },
    text:{
      color:'#fff',
      fontSize:20,
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
  