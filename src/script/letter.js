function Letter(template){

    var self = this;

    var privateAPI = {
        speed: undefined,
        init: _init,
        template: template
    };

    self.setSpeed = setSpeed;
    self.getSpeed = getSpeed;

    privateAPI.init();

    function _init(){
        privateAPI.speed = privateAPI.template.speed;
    }

    function setSpeed(speed){
      privateAPI.speed = speed;
    }

    function getSpeed(){
        return privateAPI.speed;
    }

    return self;
};
