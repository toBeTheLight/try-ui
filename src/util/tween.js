/* eslint-disable */
var Tween = {
    linear: function(t,b,c,d){ return c*t/d + b },
    cubic: function(t,b,c,d){
      return c*((t=t/d-1)*t*t + 1) + b
    },
    quart: function(t,b,c,d){
        return -c * ((t=t/d-1)*t*t*t - 1) + b
    },
    elastic: function(t,b,c,d,a,p){
      if (t==0) return b
      if ((t/=d)==1) return b+c
      if (!p) p=d*.3
      if (!a || a < Math.abs(c)) {
        a=c
        s=p/4
      }
      else var s = p/(2*Math.PI) * Math.asin (c/a)
      return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b)
    },
    back: function(t,b,c,d,s){
      if (s == undefined) s = 1.70158
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b
    },
    bounce: function(t,b,c,d){
      if ((t/=d) < (1/2.75)) {
          return c*(7.5625*t*t) + b
      } else if (t < (2/2.75)) {
          return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b
      } else if (t < (2.5/2.75)) {
          return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b
      } else {
          return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b
      }
    }
}
export default Tween
