var xhr;
module("event listeners", {
  setup: function(){
    xhr = new FakeXMLHttpRequest();
  },
  teardown: function(){
    window.xhr = undefined;
  }
});

test("adding a listener", function(){
  var wasCalled = false;
  xhr.addEventListener('somethingHappened', function(){
    wasCalled = true;
  });

  xhr.dispatchEvent({type: 'somethingHappened'});

  ok(wasCalled, "the listener was called");
});

test("adding multiple listeners for the same event", function(){
  var calledOnce = false,
      calledTwice = false;
  xhr.addEventListener("somethingHappened", function(){
    calledOnce = true;
  });
  xhr.addEventListener("somethingHappened", function(){
    calledTwice = true;
  });

  xhr.dispatchEvent({type: "somethingHappened"});

  ok(calledOnce && calledTwice, "calls each event listener");
});

test("removing a listener", function(){
  var wasCalled = false;
  var callback = function() {
    wasCalled = true;
  };
  xhr.addEventListener("somethingHappened", callback);
  xhr.removeEventListener("somethingHappened", callback);

  xhr.dispatchEvent({type: "somethingHappened"});

  ok(!wasCalled, "the removed listener was not called");
});
