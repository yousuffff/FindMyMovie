import { Client, Databases, Query ,ID} from "appwrite";
import { data } from "react-router-dom";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchText , movie) => {
  // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
  try {

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID ,q[Query.equal(attribute: 'searchTerm', searchText)])

    if(result.documents.length > 0){
      const doc = result.documents[0]

      await database.updateTransaction(DATABASE_ID , COLLECTION_ID ,  doc.$id, {
        count = doc.count + 1
      })

    }else{
await database.createTransaction(DATABASE_ID, COLLECTION_ID, ID.unique(),{
  count: 1,
  movie_id: movie.id,
  poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
})
    }
    
  } catch (error) {
    console.log(error);
    
  }
};

