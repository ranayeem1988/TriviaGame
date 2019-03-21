$(document).ready(function(){
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',

  questions: {
    q1: 'The Fantastic Four have the headquarters in what building?',
    q2: 'Peter Parker works as a photographer for:',
    q3: "S.H.I.E.L.D.'s highest ranking agent is:",
    q4: 'Captain America was frozen in which war?',
    q5: "Deadpool joined the Weapon X program because:",
    q6: 'What vehicle is the Avengers primary mode of transport?',
    q7: "What is the name of Tony Stark's building that the team uses as head-quarters in Marvel: Ultimate Alliance?",
    q8: 'Daredevil and Elektra first met at which school?',
    q9: 'Edwin Jarvis is the butler to:',
    q10: 'Bucky was:'
  },
  options: {
    q1: ['Stark Tower', 'Fantastic Headquarters', 'Baxter Building', 'Xavier Institute'],
    q2: ['The Daily Planet', 'The Daily Bugle', 'The New York Times', 'The Rolling Stone'],
    q3: ['Nick Fury', 'Steven Rogers', 'Peter Parker', 'Natalia Romanova'],
    q4: ['World War I', 'World War II', 'Cold War', 'American Civil War'],
    q5: ['He had incurable cancer', 'He was forced to', 'He thought it would be fun', 'He wanted to fight for justice'],
    q6: ['A bus', 'The Quinjet', 'The Blackbird', 'The Blackhawk'],
    q7: ['Camp Hammond', 'Iron Tower', 'Stark Tower', 'S.H.I.E.L.D. Headquarters'],
    q8: ['Columbia University', 'Smallville High', 'Empire State University', 'University of Washington'],
    q9: ['Bruce Wayne', 'Charles Xavier', 'Tony Stark', 'Brian Braddock'],
    q10: ['A member of the X-Men', "Captain America's sidekick", 'A supervillain', 'An assistant of Bruce Banner'],
  },
  answers: {
    q1: 'Baxter Building',
    q2: 'The Daily Bugle',
    q3: 'Nick Fury',
    q4: 'World War II',
    q5: 'He had incurable cancer',
    q6: 'The Quinjet',
    q7: 'Stark Tower',
    q8: 'Columbia University',
    q9: 'Tony Stark',
    q10: "Captain America's sidekick",
  },

  startGame: function(){

    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#remaining-time').show();
    
    trivia.nextQuestion();
  },

  nextQuestion : function(){

    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    }) 
  },

  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      $('#game').hide();
      $('#start').show();
    }  
  },

  guessChecker : function() {
    
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    else{
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
  },

  guessResult : function(){

    trivia.currentSet++;
    
    $('.option').remove();
    $('#results h3').remove();

    trivia.nextQuestion(); 
  }
}