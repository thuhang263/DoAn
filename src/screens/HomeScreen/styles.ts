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
      Lastest:{
        marginBottom:120,
       
      },
      textLastest:{
        fontWeight: 'bold',
        fontSize:18,
      },
  
    profileContainer: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc' },
    userName: { marginLeft: 10, fontSize: 18, fontWeight: 'bold',color:'#fff' },
    avatarImage: { width: 80, height: 120 ,right:20,},
    dateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    dateItem: { padding: 5 },
    activeDate: { backgroundColor: '#61BFE7', padding: 5, borderRadius: 5 },
    dateText: { fontSize: 16 },
    attendanceButton: { backgroundColor: '#61BFE7', padding: 10, alignSelf: 'center', borderRadius: 5 },
    attendanceText: { color: '#fff', fontWeight: 'bold' },
    lessonCard: { 
      width:390,
      height:200,
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 20, 
      margin: 10, 
      borderWidth: 1, 
      borderRadius: 10 
    },
    lessonTitle: { fontWeight: 'bold', fontSize: 16 },
    lessonSubText: { color: 'gray', },
    starContainer: {marginTop:100,right:150,},
    studyButton: { backgroundColor: '#61BFE7', padding: 10, alignSelf: 'center', borderRadius: 5, marginVertical: 10 },
    studyButtonText: { color: '#fff', fontWeight: 'bold' },
    categoryContainer: {
       flexDirection: 'row', 
       flexWrap: 'wrap', 
       left:30,
       
      },
    categoryBox: { 
      backgroundColor: '#61BFE7', 
      padding: 30, 
      borderRadius: 30, 
      width: 150,
      height:140, 
      alignItems: 'center', 
      marginVertical: 10, 
      elevation: 15,
      margin:10,
    },
    categoryText: {  
     fontWeight: 'bold',
     color:'#fff'
     },
      avatarImageItem:{
      width:45,
      height:52,
      alignItems:'center',
    },
    
    categoryTextMovie:{
      fontWeight: 'bold' ,
      left:130,
      top:10,
      alignItems:'center',
      color:'#fff'
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E4ECEF',
      borderRadius: 30,
      paddingHorizontal: 10,
      height:  40,
      marginTop: 15,
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
  