import React from 'react';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import PostList from './PostList';
import NewPostControl from './NewPostControl';
import Error404 from './Error404';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterPostList: []
    };
    this.handleAddingNewPostToList = this.handleAddingNewPostToList.bind(this);
    this.handleAddingUpvotes = this.handleAddingUpvotes.bind(this);
    this.handleAddingDownvotes = this.handleAddingDownvotes.bind(this);
    this.handleSortingPosts = this.handleSortingPosts.bind(this);
    this.handleMergingArrays = this.handleMergingArrays.bind(this);
  }
  handleAddingNewPostToList(newPost){
    var newMasterPostList = this.state.masterPostList.slice();
    newMasterPostList.push(newPost);
    this.setState({masterPostList: newMasterPostList});
  }
  handleAddingUpvotes(id){
    var newMasterPostList = this.state.masterPostList.slice();
    for(let i = 0; i < newMasterPostList.length; i++){
      if(newMasterPostList[i].id === id){
        newMasterPostList[i].upvotes = newMasterPostList[i].upvotes + 1;
      }
    }
    this.setState({masterPostList: newMasterPostList});
    this.tests();
  }
  handleAddingDownvotes(id){
    var newMasterPostList = this.state.masterPostList.slice();
    for(let i = 0; i < newMasterPostList.length; i++){
      if(newMasterPostList[i].id === id){
        newMasterPostList[i].downvotes = newMasterPostList[i].downvotes + 1;
      }
    }
    this.setState({masterPostList: newMasterPostList});
  }
  handleSortingPosts(arrayToSort){
    let n = arrayToSort.length;
    if(n < 2) {
      return;
    }
    let mid = Math.floor(arrayToSort.length/2);
    let left = arrayToSort.split(0, mid);
    let right = arrayToSort.split(mid);
    this.handleSortingPosts(left);
    this.handleSortingPosts(right);
    this.handleMergingArrays(left, right, arrayToSort);
  }
  handleMergingArrays(leftArray, rightArray, fullArray){
    let i = 0;
    let j = 0;
    let k = 0;

    while(i < leftArray.length || j < rightArray.length){
      if(leftArray[i].upvotes <= rightArray[j].upvotes){
        fullArray.splice(k,1,leftArray[i]);
        i++;
      } else {
        fullArray.splice(k,1,rightArray[j]);
        j++;
      }
      k++;
    }
    while(i < leftArray.length){
      fullArray.splice(k,1,leftArray[i]);
      i++;
      k++;
    }
    while(j < rightArray.length){
      fullArray.splice(k,1,rightArray[j]);
    }
  }
  handleAutoSorting(){
    
  }


  render(){
    return (
      <div>
        <Header/>
        <div className="container">
          <button className="btn btn-info" onClick={this.handleSortingPosts}>Sort</button>
          <Switch>
            <Route exact path='/' render={()=><PostList postList={this.state.masterPostList}
            onAddingUpvotes={this.handleAddingUpvotes}
            onAddingDownvotes={this.handleAddingDownvotes}
            />} />
            <Route path='/newpost' render={()=><NewPostControl onNewPostCreation={this.handleAddingNewPostToList} />} />
            <Route component={Error404} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
