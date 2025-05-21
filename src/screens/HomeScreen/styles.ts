import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',alignSelf:"center"  },
  header: {
   width: '100%',
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#61BFE7',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  Lastest: {
    marginBottom: 120,
  },
  textLastest: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc' },
  userName: { fontSize: 17, fontWeight: 'bold', color: '#fff',top:30 },
  avatarImage: { width: 100, height: 120, right: 20,top:20 },
  
  
  categoryBox: {
    backgroundColor: '#61BFE7',
    padding: 20,
    borderRadius: 30,
    width: 150,
    height: 140,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 15,
    margin: 10,
  },
  categoryText: {
    fontWeight: 'bold',
    color: '#fff'
  },
  avatarImageItem: {
    width: 160,
    height: 110,
    alignItems: 'center',
    borderRadius:20,
    margin:10
  },
 
 
  videoSection: {
    flexDirection: 'row',
    left:30
  
  },
  videoThumbnail: {
    width: 290,
    height: 140,
    borderRadius: 12,

  },
  thumbnailContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  youtubeIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  videoLabel: {
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  verticalText: {
    transform: [{ rotate: '90deg' }],
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000'

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: 16,
    left:20,
    color:'#000'
  },
  
  ReadContainer:{
    flexDirection: 'row',
    borderRadius: 12,
    
  },
  avatarImageText:{
    width: 102, height: 25 ,
    left:30,
    top:20,
},

 
  sectionTitle2:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: 16,
    left:20,
    color:'#000'
  }
});
