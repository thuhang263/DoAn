import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
      width:415,
      height:160,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      padding: 20, backgroundColor: '#5EBB1A', 
      borderBottomLeftRadius: 50, 
      borderBottomRightRadius: 50 
      },
  
    profileContainer: { flexDirection: 'row', alignItems: 'center' },
    userName: { marginLeft: 10, fontSize: 18, fontWeight: 'bold' },
    avatarImage: { width: 80, height: 120 ,right:20,},

    dateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    avatarImageText:{
        width: 100, height: 30 ,
        left:20,
    },
    avatarImageItem:{
      width:200,
      height:200,
      top:80,
      left:100,
    },

    text:{
      color:'#fff',
      fontSize:23,
     marginTop:5,
    },
    textContent:{
      fontWeight: 'bold',
      fontSize:20,
      color:'black',
      top:100,
      left:80,

    },
    btn:{
      marginBottom:40,
    },
    btnVoc:{
      width:150,
      height:50,
      backgroundColor:'#5EBB1A',
      left:50,
      top:150,
      alignContent:'center',
      alignItems:'center',
      borderRadius:20,
    },
    btnGra:{
      width:150,
      height:50,
      backgroundColor:'#5EBB1A',
      left:220,
      top:100,
      alignContent:'center',
      alignItems:'center',
      borderRadius:20,
    },
    btnListen:{
      width:150,
      height:50,
      backgroundColor:'#5EBB1A',
      left:50,
      top:120,
      alignContent:'center',
      alignItems:'center',
      borderRadius:20,
    },
    btnRead:{
      width:150,
      height:50,
      backgroundColor:'#5EBB1A',
      left:220,
      top:70,
      alignContent:'center',
      alignItems:'center',
      borderRadius:20,
    }

    
  });
  