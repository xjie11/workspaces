(function($) {

    var instructions= [
      {},
      {"workspace-1": "", "workspace-2": "right", "workspace-3": "down", "workspace-4": "right,down"},
      {"workspace-1": "left", "workspace-2": "", "workspace-3": "down,left", "workspace-4":"down"},
      {"workspace-1": "up", "workspace-2": "up,right", "workspace-3": "", "workspace-4":"right"},
      {"workspace-1": "left,up", "workspace-2": "up", "workspace-3": "left", "workspace-4":""},
    ];

    var keyMap= {
      "37": "left",
      "38": "up",
      "39": "right",
      "40": "down"
    };

    $.fn.init_workspaces = function() {

        $('#workspace-1').addClass('active').css({
          top:0,
          left:0,
        });

        $('#workspace-2').css({
          top:0,
          left:"100%",
        });

        $('#workspace-3').css({
          top:"100%",
          left:0,
        });

        $('#workspace-4').css({
          top:"100%",
          left:"100%",
        });

        $('body').keyup(function(e){
          var key = e.which;
          var index = parseInt($('.active').attr('id').slice(-1));
          switch (key){
            case 37:
            case 38:
            case 39:
            case 40:
              e.preventDefault();
              transition(keyMap[key], index);
              break;
          }
        });

    };

    $.fn.transitionTo = function() {

        var activeIndex= parseInt($('.active').attr('id').slice(-1));
        var newWorkspace = $(this).attr('id');
        instructions[activeIndex][newWorkspace].split(',').forEach(function(ins){
          activeIndex = transition(ins, activeIndex);
        });
    };

    function transition(direction, activeIndex){
      switch (direction) {
        case "left":
          if (activeIndex % 2 === 0){
              $('#workspace-'+ (activeIndex - 1)).addClass('active').stop().animate({
                left:0
              }, 1000);
              $('#workspace-'+activeIndex).animate({
                left:"100%"
              }, "fast", "linear", function(){
                $('#workspace-'+activeIndex).removeClass('active');
                loadSurroundingWorkspaces(activeIndex -1);
              });
              return activeIndex - 1;
          }
          break;
        case "right":
          if (activeIndex % 2 === 1){
              $('#workspace-'+ (activeIndex + 1)).stop().addClass('active').animate({
                left:0
              }, 1000);
              $('#workspace-'+activeIndex).animate({
                left:"-100%"
              }, 1000, function(){
                $('#workspace-'+activeIndex).removeClass('active');
                loadSurroundingWorkspaces(activeIndex + 1);
              });
              return activeIndex + 1;
          }
          break;
        case "up":
          if (activeIndex > 2){
              $('#workspace-'+ (activeIndex - 2)).stop().addClass('active').animate({
                top:0
              }, 1000);
              $('#workspace-'+activeIndex).animate({
                top:"100%"
              }, 1000, function(){
                $('#workspace-'+activeIndex).removeClass('active');
                loadSurroundingWorkspaces(activeIndex -2);
              });
              return activeIndex - 2;
          }
          break;
        case "down":
          if (activeIndex <= 2){
              $('#workspace-'+ (activeIndex + 2)).stop().addClass('active').animate({
                top:0
              }, 1000);
              $('#workspace-'+activeIndex).animate({
                top:"-100%"
              }, 1000, function(){
                $('#workspace-'+activeIndex).removeClass('active');
                loadSurroundingWorkspaces(activeIndex + 2);
              });
              return activeIndex + 2;
          }
          break;
      }
      console.log("error with activeIndex: ", activeIndex);
      return -1;
    }

    function loadSurroundingWorkspaces(activeIndex){
        switch (activeIndex){
          case 1:
            $('#workspace-1').css({
              top:0,
              left:0,
            });

            $('#workspace-2').css({
              top:0,
              left:"100%",
            });

            $('#workspace-3').css({
              top:"100%",
              left:0,
            });

            $('#workspace-4').css({
              top:"100%",
              left:"100%",
            });
            break;
          case 2:
            $('#workspace-1').css({
              top:0,
              left:"-100%",
            });

            $('#workspace-2').css({
              top:0,
              left:0,
            });

            $('#workspace-3').css({
              top:"100%",
              left:"-100%",
            });

            $('#workspace-4').css({
              top:"100%",
              left:0,
            });
            break;
          case 3:
            $('#workspace-1').css({
              top:"-100%",
              left:0,
            });

            $('#workspace-2').css({
              top:"-100%",
              left:"100%",
            });

            $('#workspace-3').css({
              top:0,
              left:0,
            });

            $('#workspace-4').css({
              top:0,
              left:"100%",
            });
            break;
        }
    }

}(jQuery));
