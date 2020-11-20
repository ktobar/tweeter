/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//generate html with post data passed into function
const createTweetElement = (post)=> {
  //convert milliseconds to days from tweet post
  const timeNow = Date.now();
  const timelapse = timeNow - post.created_at;
  const oneDayMs = 1000 * 60 * 60 * 24;
  const daysSince = Math.floor(timelapse / oneDayMs);
  
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
      ${escape(post.content.text)}
    </span>
    <footer class="postFooter">
      <div class="postDate">
        ${daysSince} days ago
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
};
// prepends post to html
const renderTweets = function(tweets) {
  for (const post of tweets) {
    const newPost = createTweetElement(post);
    $('section.posts').prepend(newPost);
  }
};

const loadtweet = ()=> {
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then((res)=>{
    renderTweets(res);
  });
};
// prepends latest post from recent submit
const loadLatestTweet = ()=> {
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then((res) => {
    const posts = Object.values(res).pop();
    const newPost = createTweetElement(posts);
    $('section.posts').prepend(newPost);
  });
};
// prevents Cross-Site Scripting
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// Prevents default form action and uses ajax to add tweet post without refresh of pages
$(document).ready(() => {
  $('form').on('submit', (event => {
    
    event.preventDefault();
    $('.errorArea').slideUp();
    const text = $("#tweet-text").val();

    if (text === null || text === '') {
      $('.errorArea').hide().html('<p class="error"><i class="fas fa-exclamation-triangle"></i> Input field is empty. <i class="fas fa-exclamation-triangle"></i></p>').slideDown();
    } else if (text.length > 140) {
      $('.errorArea').hide().html('<p class="error"><i class="fas fa-exclamation-triangle"></i> Input needs to be less than 140 characters. <i class="fas fa-exclamation-triangle"></i></p>').slideDown();
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $('form').serialize()
      }).then(
        $('.errorArea').slideUp(),
        loadLatestTweet(),
        $('.tweet-form')[0].reset()
      );
    }
  }));
  loadtweet();
});
