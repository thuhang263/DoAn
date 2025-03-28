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
      Lastest:{
        marginBottom:120,
       
      },
      textLastest:{
        fontWeight: 'bold',
        fontSize:18,
      },
  
    profileContainer: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc' },
    userName: { marginLeft: 10, fontSize: 18, fontWeight: 'bold' },
    avatarImage: { width: 80, height: 120 ,right:20,},
    dateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    dateItem: { padding: 5 },
    activeDate: { backgroundColor: '#5EBB1A', padding: 5, borderRadius: 5 },
    dateText: { fontSize: 16 },
    attendanceButton: { backgroundColor: '#5EBB1A', padding: 10, alignSelf: 'center', borderRadius: 5 },
    attendanceText: { color: '#fff', fontWeight: 'bold' },
    lessonCard: { 
      width:369,
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
    studyButton: { backgroundColor: '#5EBB1A', padding: 10, alignSelf: 'center', borderRadius: 5, marginVertical: 10 },
    studyButtonText: { color: '#fff', fontWeight: 'bold' },
    categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' },
    categoryBox: { backgroundColor: '#5EBB1A', padding: 30, borderRadius: 10, width: '40%', alignItems: 'center', marginVertical: 5 },
    categoryText: {  
     fontWeight: 'bold' },
      avatarImageItem:{
      width:45,
      height:52,
      alignItems:'center',
    },
    categoryBoxMovie:{
      marginTop:10,
      width:300,
      height:120,
      backgroundColor:'#5EBB1A',
      borderRadius:20,
    },
    avatarImageItemMovie:{
      width:55,
      height:62,
      left:120,
      top:10,
      alignItems:'center',
    },
    categoryTextMovie:{
      fontWeight: 'bold' ,
      left:130,
      top:10,
      alignItems:'center',
    }
  });
  