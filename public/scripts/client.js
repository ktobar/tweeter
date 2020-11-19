/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const postData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Descartes Double",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
  
]

const createTweetElement = (post)=> {
  console.log(post.user)
  const $tweet = $(`
  <article id="tweet">
    <header class="posterInfo">
      <div class="avatarName">
        <div class="postAvatar">
            <img src="${post.user.avatars}"> 
        </div>
        <div>
          ${post.user.name}
        </div>
      </div>
      <span class="handle">
      ${post.user.handle}
      </span>
    </header>
    <span class="postVal">
      ${post.content.text}
    </span>
    <footer class="postFooter">
      <div class="postDate">
        ${post.created_at}
      </div>
      <div class="postIcons">
        <span class="icon1"><i class="fas fa-flag"></i></span>
        <span class="icon2"><i class="fas fa-retweet"></i></span>
        <span class="icon3"><i class="fas fa-heart"></i></span>
      </div>
    </footer>
  </article>`
  );

  return $tweet;
}

const renderTweets = function(tweets) {
  for (const post of tweets) {
    const newPost = createTweetElement(post)
    $('section.posts').append(newPost)
  }
}

$(document).ready(() => {
  $('form').on('submit', (event => {
    event.preventDefault();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $('form').serialize()
    })
    .then((res) => console.log(res))

    $.ajax({
      url: "/tweets",
      method: "GET",
    })

  }))

  renderTweets(postData);

});
