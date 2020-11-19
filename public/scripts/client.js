/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const loadtweet = (callback)=> {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
  .then((res)=>{
    const posts = Object.values(res)
    renderTweets(res)
  })
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

  }))
  loadtweet()
});
