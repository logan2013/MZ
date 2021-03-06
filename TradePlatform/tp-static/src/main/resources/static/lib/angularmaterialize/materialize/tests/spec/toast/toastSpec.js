describe( 'Toasts:', function() {
  var toastOutDuration = 375;
  var toastInDuration = 300;
  var toast;

  describe('Toast javascript functions', function() {
    // Toast out animation duration does not count as part of its timer.
    it('should display and remove a toast', function(done) {
      growl.addInfoMessage('Test toast', toastInDuration);

      setTimeout(function() {
        toast = $('.toast');
        expect(toast.length).toBe(1);
        expect(toast).toBeVisible();
        expect(toast.text()).toBe('Test toast');
        setTimeout(function() {
          toast = $('.toast');
          expect(toast).toBeVisible();
          expect(toast.length).toBe(1, 'because toast duration still on going');
          setTimeout(function() {
            toast = $('.toast');
            expect(toast.length).toBe(0, 'because toast should be removed by now');
            done();
          }, toastOutDuration + 90); // .1s leeway is given
        }, 10);
      }, toastInDuration);
    });

    it('Opens a toast with HTML content', function() {
      var $toastContent = $('<span>I am toast content</span>');
      growl.addInfoMessage($toastContent, 400);
      toast = $('.toast');
      expect(toast.first('span').text()).toBe('I am toast content');
      expect(toast.first('span').text()).not.toBe('I am toast')
    });

    it('Toasts should call the callback function when dismissed',
        function(done) {
      var boolObj = {wasCalled: false};
      var callback = function() {
        boolObj.wasCalled = true;
      };
      growl.addInfoMessage('I am a toast', 100, '', callback);
      setTimeout(function() {
        expect(boolObj.wasCalled).toBe(true,
            'because the callback set it to true');
        done();
      }, 500);
    });

    it('Apply two custom class to a toast', function() {
      growl.addInfoMessage('Hi', 400, 'round flat');
      toast = $('.toast');
      expect(toast.closest('.round.flat').length).toBe(1,
          'because the class parameter was passed with two classes');
    });

  });


});
