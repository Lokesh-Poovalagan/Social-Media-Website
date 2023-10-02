import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import Header from './Header';
import {Route,Routes, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import useWindowSize from './hooks/useWindowSize';
import EditPost from './EditPost';

function App() {
  const [post,setPost] = useState([
    {
      id:1,
      title:"Image Search App",
      datetime:"September 28, 2023 11:11:11 AM",
      body: "The Interactive Image Gallery project is a web development endeavor that combines HTML, CSS, and JavaScript to create a dynamic image gallery. This gallery fetches images from the Unsplash API based on user input, allowing users to search for explore more images with a `Show More` which provides a variety of images related to the input."
    },
    {
      id:2,
      title:"E-commerce-Shopping-Website",
      datetime:"September 19, 2023 09:11:11 AM",
      body: "Fully-featured e-commerce website with dynamic product details, image navigation, responsiveness, and Google Maps integration using HTML, CSS, and JavaScript."
    },
    {
      id:3,
      title:"Product Search Engine",
      datetime:"September 25, 2023 10:11:10 AM",
      body: "This project allows users to input keywords, and as they type, it instantly displays products that match the user's input.JavaScript plays a central role in this project by enabling live search functionality. As users type in the search input field, JavaScript dynamically compares the input with a list of product names and instantly display."
    },
    {
      id:4,
      title:"Responsive-Testimonial-slider",
      datetime:"September 28, 2023 12:10:11 PM",
      body: "In CSS, Media queries are employed to create a responsive design; JavaScript is used to add interactivity to the website. It dynamically changes the content of the webpage, allowing users to see different information by clicking on buttons. JavaScript can be used to update the Image, Name, Paragraph"
    }

  ])
  const [search,setSearch] = useState('')
  const [searchResult,setSearchResult] = useState('')
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate()
  const {width} = useWindowSize()

  useEffect(() => {
    const filteredResult = post.filter((post) =>
    ((post.body).toLowerCase()).includes(search.toLowerCase())||((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResult(filteredResult.reverse());
  },[post,search])
    

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = post.length ? post[post.length-1].id+1:1;
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    const newPost = {id,title: postTitle,datetime,body:postBody}
    const allPosts = [...post,newPost];
    console.log(allPosts)
    setPost(allPosts)
    setPostTitle('')
    setPostBody('');
    navigate('/')

  }

  const handleDelete = async (id) => {
        const postsList = post.filter(post => post.id !== id);
        setPost(postsList);
        navigate('/')
      
} 
  
const handleEdit = async (id) => {
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const updatedPost = { id, title: editTitle, datetime, body: editBody };
  console.log(updatedPost)
  setPost(post.map(post => post.id === id ? { ...updatedPost} : post));
  setEditTitle('');
  setEditBody('');
  navigate('/')
}

  return (   
    <div className='App'>   
      <Header title="Social Media App" width={width}/>
      <Nav 
        search={search}
        setSearch={setSearch}/>
        <Routes>
          <Route path="/" element = {<Home posts={searchResult}/>}/>
          <Route path="post"> 
            <Route index element = {<NewPost handleSubmit={handleSubmit}
                    postTitle={postTitle}
                    setPostTitle={setPostTitle}
                    postBody={postBody}
                    setPostBody={setPostBody}/>}/>
            <Route path=":id" element={<PostPage posts={post} handleDelete={ handleDelete}/>}/> 
            </Route>
            <Route path="/edit/:id" element = {<EditPost 
            posts={post} 
            editBody={editBody}
            editTitle={editTitle}
            setEditBody={setEditBody}
            setEditTitle={setEditTitle}
            handleEdit={handleEdit}/>}/>
          <Route path="about" element = {<About/>}/>
          <Route path="*" element = {<Missing/>}/>
      </Routes>
      <Footer/>  
    </div>
  );

  }
export default App
