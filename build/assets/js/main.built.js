
define('dom/utils/DomSniper',[],function() {
    var DomSniper = {};

    DomSniper.appendChild = function(base, target) {
        base.appendChild(target);
    };

    return DomSniper;
});

/**
 * @class
 * @name dom.utils.CssMixins
*/
define('dom/mixins/CssMixins',[],function() {
	var CssMixins = function() {};

	/**
     * @name dom.utils.CssMixins#transform
     * @function
     * @static
     * @param {} el
     * @param {} options
    */
	CssMixins.transform = function(options) {
		var formatted = (options.rotateX !== undefined ? ' rotateX(' + options.rotateX + 'deg)': '') + (options.rotateY !== undefined ? ' rotateY(' + options.rotateY + 'deg)': '') + (options.rotateZ !== undefined ? ' rotateZ(' + options.rotateZ + 'deg)': '') + (options.translateX !== undefined ? ' translateX(' + options.translateX + 'deg)': '') + (options.translateY !== undefined ? ' translateY(' + options.translateY + 'deg)': '') + (options.translateZ !== undefined ? ' translateZ(' + options.translateZ + 'deg)': '');

		return {
			mozTransform: formatted,
			OTransform: formatted,
			WebkitTransform: formatted,
			msTransform: formatted,
			transform: formatted
		};
	};

	/**
     * @name dom.utils.CssMixins#alpha
     * @function
     * @static
     * @param {} el
     * @param {} alpha
    */
	CssMixins.alpha = function(value) {
		return {
			opacity: value,
			filter: 'alpha(opacity=' + value * 100 + ')'
		};
	};

	CssMixins.rotate = function(value) {
		return {
			WebkitTransform: 'rotate(' + value + 'deg)',
			mozTransform: 'rotate(' + value + 'deg)',
			msTransform: 'rotate(' + value + 'deg)',
			OTransform: 'rotate(' + value + 'deg)',
			transform: 'rotate(' + value + 'deg)'
		};
	};

	return CssMixins;
});


/**
 * @class
 * @name dom.primitives.Elem
 * @param {} options
*/
define('dom/primitives/Elem',['dom/utils/DomSniper', 'dom/mixins/CssMixins'], function(DomSniper, CssMixins) {
    var Elem = function(options) {
        var self = this;
        options = options || {};

        // Element detection
        var getEl = function() {
            if (options.el) {
                return options.el;
            } else if (options.type) {
                return document.createElement(options.type);
            } else {
                return document.createElement('div');
            }
        };

        this.el = getEl();

        var setSpecial = function(key, value) {
            switch(key) {
                case 'x':
                    setCss({
                        left: value + 'px'
                    });
                    break;
                case 'y':
                    setCss({
                        top: value + 'px'
                    });
                    break;
                case 'width':
                    setCss({
                        width: value
                    });
                    break;
                case 'height':
                    setCss({
                        height: value
                    });
                    break;
                case 'rotation':
                    setCss(CssMixins.rotate(value));
                    break;
            }

            self[key] = value;
        };

        var setCss = function(options) {
            for (var css in options) {
                self.el.style[css] = options[css];
            }
        };

        this.appendChild = function(target) {
            DomSniper.appendChild(self.el, target);
        };

        this.appendTo = function(target) {
            target.appendChild(self.el);
        };
        
        this.set = function(options) {
            // Attributes
            if (options.attr) {
                for (var attr in options.attr) {
                    var prop = attr === 'className' ? 'class' : attr; // need className because 'class' is reserved
                    self.el.setAttribute(prop, options.attr[attr]);
                }
            }

            if (options.css) {
                setCss(options.css);
            }

            for (var o in options) {
                switch (o) {
                    case 'el':
                    case 'attr':
                    case 'css':
                        break;

                    default:
                        setSpecial(o, options[o]);
                        break;
                }
            }
        };

        this.set(options);

        // Appending
        this.insert = function(type, target) {
            switch (type) {
                case 'child':
                    DomSniper.appendChild(self.el, target);
                    break;
                case 'parent':
                    DomSniper.appendChild(target, self.el);
                    break;
            }
        };

        // Add this to init phase
        if (options.insert) {
            this.insert(options.insert.type, options.insert.target);
        }
    };

    return Elem;
});

// stats.js r8 - http://github.com/mrdoob/stats.js
var Stats=function(){var h,a,n=0,o=0,i=Date.now(),u=i,p=i,l=0,q=1E3,r=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,s=1E3,t=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();n=(n+1)%2;n==0?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
"left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
"30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);f.children.length<74;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
"0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);g.children.length<74;)a=document.createElement("span"),
a.style.width="1px",a.style.height=Math.random()*30+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{domElement:h,update:function(){i=Date.now();m=i-u;s=Math.min(s,m);t=Math.max(t,m);k.textContent=m+" MS ("+s+"-"+t+")";var a=Math.min(30,30-m/200*30);g.appendChild(g.firstChild).style.height=a+"px";u=i;o++;if(i>p+1E3)l=Math.round(o*1E3/(i-p)),q=Math.min(q,l),r=Math.max(r,l),j.textContent=l+" FPS ("+q+"-"+r+")",a=Math.min(30,30-l/
100*30),f.appendChild(f.firstChild).style.height=a+"px",p=i,o=0}}};


define("libs/three.js/stats", function(){});

/**
 * @class
 * @name core.utils.FpsTracker
 * @requires stats.js
*/
define('core/utils/FpsTracker',['dom/primitives/Elem', 'dom/utils/DomSniper', 'libs/three.js/stats'], function(Elem, DomSniper) {
    var FpsTracker = function() {
        var self = this;
        Elem.call(this);

        // add Stats.js - https://github.com/mrdoob/stats.js
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        DomSniper.appendChild(document.body, this.stats.domElement);
    };

    FpsTracker.prototype.update = function() {
        this.stats.update();
    };

    return FpsTracker;
});

define('dom/primitives/Container',['dom/primitives/Elem', 'dom/utils/DomSniper'], function(Elem, DomSniper) {
	var Container = function(options) {
		Elem.call(this, options);
	};

	return Container;
});

define('core/utils/Mapper',[],function() {
	var Mapper = {};

    // Map function to be used to map values from leap into proper degrees (0-360)
	Mapper.map = function(value, inputMin, inputMax, outputMin, outputMax) {
		outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
		if (outVal > outputMax) {
			outVal = outputMax;
		}
		if (outVal < outputMin) {
			outVal = outputMin;
		}
		return outVal;
	};

	return Mapper;
});


// three.js - http://github.com/mrdoob/three.js
var THREE=THREE||{REVISION:"59dev"};self.console=self.console||{info:function(){},log:function(){},debug:function(){},warn:function(){},error:function(){}};self.Int32Array=self.Int32Array||Array;self.Float32Array=self.Float32Array||Array;String.prototype.trim=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")};
THREE.extend=function(a,b){if(Object.keys)for(var c=Object.keys(b),d=0,e=c.length;d<e;d++){var f=c[d];Object.defineProperty(a,f,Object.getOwnPropertyDescriptor(b,f))}else for(f in c={}.hasOwnProperty,b)c.call(b,f)&&(a[f]=b[f]);return a};
(function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!self.requestAnimationFrame;++c)self.requestAnimationFrame=self[b[c]+"RequestAnimationFrame"],self.cancelAnimationFrame=self[b[c]+"CancelAnimationFrame"]||self[b[c]+"CancelRequestAnimationFrame"];void 0===self.requestAnimationFrame&&void 0!==self.setTimeout&&(self.requestAnimationFrame=function(b){var c=Date.now(),f=Math.max(0,16-(c-a)),h=self.setTimeout(function(){b(c+f)},f);a=c+f;return h});void 0===self.cancelAnimationFrame&&void 0!==
self.clearTimeout&&(self.cancelAnimationFrame=function(a){self.clearTimeout(a)})})();THREE.CullFaceNone=0;THREE.CullFaceBack=1;THREE.CullFaceFront=2;THREE.CullFaceFrontBack=3;THREE.FrontFaceDirectionCW=0;THREE.FrontFaceDirectionCCW=1;THREE.BasicShadowMap=0;THREE.PCFShadowMap=1;THREE.PCFSoftShadowMap=2;THREE.FrontSide=0;THREE.BackSide=1;THREE.DoubleSide=2;THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NoBlending=0;
THREE.NormalBlending=1;THREE.AdditiveBlending=2;THREE.SubtractiveBlending=3;THREE.MultiplyBlending=4;THREE.CustomBlending=5;THREE.AddEquation=100;THREE.SubtractEquation=101;THREE.ReverseSubtractEquation=102;THREE.ZeroFactor=200;THREE.OneFactor=201;THREE.SrcColorFactor=202;THREE.OneMinusSrcColorFactor=203;THREE.SrcAlphaFactor=204;THREE.OneMinusSrcAlphaFactor=205;THREE.DstAlphaFactor=206;THREE.OneMinusDstAlphaFactor=207;THREE.DstColorFactor=208;THREE.OneMinusDstColorFactor=209;
THREE.SrcAlphaSaturateFactor=210;THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.AddOperation=2;THREE.UVMapping=function(){};THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.RepeatWrapping=1E3;THREE.ClampToEdgeWrapping=1001;THREE.MirroredRepeatWrapping=1002;THREE.NearestFilter=1003;THREE.NearestMipMapNearestFilter=1004;THREE.NearestMipMapLinearFilter=1005;
THREE.LinearFilter=1006;THREE.LinearMipMapNearestFilter=1007;THREE.LinearMipMapLinearFilter=1008;THREE.UnsignedByteType=1009;THREE.ByteType=1010;THREE.ShortType=1011;THREE.UnsignedShortType=1012;THREE.IntType=1013;THREE.UnsignedIntType=1014;THREE.FloatType=1015;THREE.UnsignedShort4444Type=1016;THREE.UnsignedShort5551Type=1017;THREE.UnsignedShort565Type=1018;THREE.AlphaFormat=1019;THREE.RGBFormat=1020;THREE.RGBAFormat=1021;THREE.LuminanceFormat=1022;THREE.LuminanceAlphaFormat=1023;
THREE.RGB_S3TC_DXT1_Format=2001;THREE.RGBA_S3TC_DXT1_Format=2002;THREE.RGBA_S3TC_DXT3_Format=2003;THREE.RGBA_S3TC_DXT5_Format=2004;THREE.Color=function(a){void 0!==a&&this.set(a);return this};
THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,set:function(a){a instanceof THREE.Color?this.copy(a):"number"===typeof a?this.setHex(a):"string"===typeof a&&this.setStyle(a);return this},setHex:function(a){a=Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;this.b=(a&255)/255;return this},setRGB:function(a,b,c){this.r=a;this.g=b;this.b=c;return this},setHSL:function(a,b,c){if(0===b)this.r=this.g=this.b=c;else{var d=function(a,b,c){0>c&&(c+=1);1<c&&(c-=1);return c<1/6?a+6*(b-a)*
c:0.5>c?b:c<2/3?a+6*(b-a)*(2/3-c):a},b=0.5>=c?c*(1+b):c+b-c*b,c=2*c-b;this.r=d(c,b,a+1/3);this.g=d(c,b,a);this.b=d(c,b,a-1/3)}return this},setStyle:function(a){if(/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a))return a=/^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a),this.r=Math.min(255,parseInt(a[1],10))/255,this.g=Math.min(255,parseInt(a[2],10))/255,this.b=Math.min(255,parseInt(a[3],10))/255,this;if(/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a))return a=/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a),this.r=Math.min(100,
parseInt(a[1],10))/100,this.g=Math.min(100,parseInt(a[2],10))/100,this.b=Math.min(100,parseInt(a[3],10))/100,this;if(/^\#([0-9a-f]{6})$/i.test(a))return a=/^\#([0-9a-f]{6})$/i.exec(a),this.setHex(parseInt(a[1],16)),this;if(/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a))return a=/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a),this.setHex(parseInt(a[1]+a[1]+a[2]+a[2]+a[3]+a[3],16)),this;if(/^(\w+)$/i.test(a))return this.setHex(THREE.ColorKeywords[a]),this},copy:function(a){this.r=a.r;this.g=a.g;this.b=
a.b;return this},copyGammaToLinear:function(a){this.r=a.r*a.r;this.g=a.g*a.g;this.b=a.b*a.b;return this},copyLinearToGamma:function(a){this.r=Math.sqrt(a.r);this.g=Math.sqrt(a.g);this.b=Math.sqrt(a.b);return this},convertGammaToLinear:function(){var a=this.r,b=this.g,c=this.b;this.r=a*a;this.g=b*b;this.b=c*c;return this},convertLinearToGamma:function(){this.r=Math.sqrt(this.r);this.g=Math.sqrt(this.g);this.b=Math.sqrt(this.b);return this},getHex:function(){return 255*this.r<<16^255*this.g<<8^255*
this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(){var a={h:0,s:0,l:0};return function(){var b=this.r,c=this.g,d=this.b,e=Math.max(b,c,d),f=Math.min(b,c,d),h,g=(f+e)/2;if(f===e)f=h=0;else{var i=e-f,f=0.5>=g?i/(e+f):i/(2-e-f);switch(e){case b:h=(c-d)/i+(c<d?6:0);break;case c:h=(d-b)/i+2;break;case d:h=(b-c)/i+4}h/=6}a.h=h;a.s=f;a.l=g;return a}}(),getStyle:function(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},offsetHSL:function(a,
b,c){var d=this.getHSL();d.h+=a;d.s+=b;d.l+=c;this.setHSL(d.h,d.s,d.l);return this},add:function(a){this.r+=a.r;this.g+=a.g;this.b+=a.b;return this},addColors:function(a,b){this.r=a.r+b.r;this.g=a.g+b.g;this.b=a.b+b.b;return this},addScalar:function(a){this.r+=a;this.g+=a;this.b+=a;return this},multiply:function(a){this.r*=a.r;this.g*=a.g;this.b*=a.b;return this},multiplyScalar:function(a){this.r*=a;this.g*=a;this.b*=a;return this},lerp:function(a,b){this.r+=(a.r-this.r)*b;this.g+=(a.g-this.g)*b;
this.b+=(a.b-this.b)*b;return this},equals:function(a){return a.r===this.r&&a.g===this.g&&a.b===this.b},clone:function(){return(new THREE.Color).setRGB(this.r,this.g,this.b)}};
THREE.ColorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,
darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,
grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,
lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,
palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,
tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};THREE.Quaternion=function(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=void 0!==d?d:1};
THREE.Quaternion.prototype={constructor:THREE.Quaternion,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w;return this},setFromEuler:function(a,b){var c=Math.cos(a.x/2),d=Math.cos(a.y/2),e=Math.cos(a.z/2),f=Math.sin(a.x/2),h=Math.sin(a.y/2),g=Math.sin(a.z/2);void 0===b||"XYZ"===b?(this.x=f*d*e+c*h*g,this.y=c*h*e-f*d*g,this.z=c*d*g+f*h*e,this.w=c*d*e-f*h*g):"YXZ"===b?(this.x=f*d*e+c*h*g,this.y=c*h*e-f*d*g,this.z=c*d*
g-f*h*e,this.w=c*d*e+f*h*g):"ZXY"===b?(this.x=f*d*e-c*h*g,this.y=c*h*e+f*d*g,this.z=c*d*g+f*h*e,this.w=c*d*e-f*h*g):"ZYX"===b?(this.x=f*d*e-c*h*g,this.y=c*h*e+f*d*g,this.z=c*d*g-f*h*e,this.w=c*d*e+f*h*g):"YZX"===b?(this.x=f*d*e+c*h*g,this.y=c*h*e+f*d*g,this.z=c*d*g-f*h*e,this.w=c*d*e-f*h*g):"XZY"===b&&(this.x=f*d*e-c*h*g,this.y=c*h*e-f*d*g,this.z=c*d*g+f*h*e,this.w=c*d*e+f*h*g);return this},setFromAxisAngle:function(a,b){var c=b/2,d=Math.sin(c);this.x=a.x*d;this.y=a.y*d;this.z=a.z*d;this.w=Math.cos(c);
return this},setFromRotationMatrix:function(a){var b=a.elements,c=b[0],a=b[4],d=b[8],e=b[1],f=b[5],h=b[9],g=b[2],i=b[6],b=b[10],j=c+f+b;0<j?(c=0.5/Math.sqrt(j+1),this.w=0.25/c,this.x=(i-h)*c,this.y=(d-g)*c,this.z=(e-a)*c):c>f&&c>b?(c=2*Math.sqrt(1+c-f-b),this.w=(i-h)/c,this.x=0.25*c,this.y=(a+e)/c,this.z=(d+g)/c):f>b?(c=2*Math.sqrt(1+f-c-b),this.w=(d-g)/c,this.x=(a+e)/c,this.y=0.25*c,this.z=(h+i)/c):(c=2*Math.sqrt(1+b-c-f),this.w=(e-a)/c,this.x=(d+g)/c,this.y=(h+i)/c,this.z=0.25*c);return this},inverse:function(){this.conjugate().normalize();
return this},conjugate:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var a=this.length();0===a?(this.z=this.y=this.x=0,this.w=1):(a=1/a,this.x*=a,this.y*=a,this.z*=a,this.w*=a);return this},multiply:function(a,b){return void 0!==b?(console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
this.multiplyQuaternions(a,b)):this.multiplyQuaternions(this,a)},multiplyQuaternions:function(a,b){var c=a.x,d=a.y,e=a.z,f=a.w,h=b.x,g=b.y,i=b.z,j=b.w;this.x=c*j+f*h+d*i-e*g;this.y=d*j+f*g+e*h-c*i;this.z=e*j+f*i+c*g-d*h;this.w=f*j-c*h-d*g-e*i;return this},multiplyVector3:function(a){console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");return a.applyQuaternion(this)},slerp:function(a,b){var c=this.x,d=this.y,e=this.z,
f=this.w,h=f*a.w+c*a.x+d*a.y+e*a.z;0>h?(this.w=-a.w,this.x=-a.x,this.y=-a.y,this.z=-a.z,h=-h):this.copy(a);if(1<=h)return this.w=f,this.x=c,this.y=d,this.z=e,this;var g=Math.acos(h),i=Math.sqrt(1-h*h);if(0.001>Math.abs(i))return this.w=0.5*(f+this.w),this.x=0.5*(c+this.x),this.y=0.5*(d+this.y),this.z=0.5*(e+this.z),this;h=Math.sin((1-b)*g)/i;g=Math.sin(b*g)/i;this.w=f*h+this.w*g;this.x=c*h+this.x*g;this.y=d*h+this.y*g;this.z=e*h+this.z*g;return this},equals:function(a){return a.x===this.x&&a.y===
this.y&&a.z===this.z&&a.w===this.w},fromArray:function(a){this.x=a[0];this.y=a[1];this.z=a[2];this.w=a[3];return this},toArray:function(){return[this.x,this.y,this.z,this.w]},clone:function(){return new THREE.Quaternion(this.x,this.y,this.z,this.w)}};THREE.Quaternion.slerp=function(a,b,c,d){return c.copy(a).slerp(b,d)};THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0};
THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(a,b){this.x=a;this.y=b;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;default:throw Error("index is out of range: "+a);}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+a);}},copy:function(a){this.x=a.x;this.y=a.y;return this},add:function(a,
b){if(void 0!==b)return console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;return this},addScalar:function(a){this.x+=a;this.y+=a;return this},sub:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=
a.y;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;return this},divideScalar:function(a){0!==a?(this.x/=a,this.y/=a):this.set(0,0);return this},min:function(a){this.x>a.x&&(this.x=a.x);this.y>a.y&&(this.y=a.y);return this},max:function(a){this.x<a.x&&(this.x=a.x);this.y<a.y&&(this.y=a.y);return this},clamp:function(a,b){this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x);this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y);return this},
negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,a=this.y-a.y;return b*b+a*a},setLength:function(a){var b=this.length();0!==b&&a!==b&&this.multiplyScalar(a/
b);return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;return this},equals:function(a){return a.x===this.x&&a.y===this.y},fromArray:function(a){this.x=a[0];this.y=a[1];return this},toArray:function(){return[this.x,this.y]},clone:function(){return new THREE.Vector2(this.x,this.y)}};THREE.Vector3=function(a,b,c){this.x=a||0;this.y=b||0;this.z=c||0};
THREE.Vector3.prototype={constructor:THREE.Vector3,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;default:throw Error("index is out of range: "+a);}},getComponent:function(a){switch(a){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+
a);}},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},add:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;return this},sub:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this},multiply:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(a,b);this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},multiplyVectors:function(a,b){this.x=a.x*
b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},applyMatrix3:function(a){var b=this.x,c=this.y,d=this.z,a=a.elements;this.x=a[0]*b+a[3]*c+a[6]*d;this.y=a[1]*b+a[4]*c+a[7]*d;this.z=a[2]*b+a[5]*c+a[8]*d;return this},applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d+a[12];this.y=a[1]*b+a[5]*c+a[9]*d+a[13];this.z=a[2]*b+a[6]*c+a[10]*d+a[14];return this},applyProjection:function(a){var b=this.x,c=this.y,d=this.z,a=a.elements,e=1/(a[3]*b+a[7]*c+a[11]*d+a[15]);
this.x=(a[0]*b+a[4]*c+a[8]*d+a[12])*e;this.y=(a[1]*b+a[5]*c+a[9]*d+a[13])*e;this.z=(a[2]*b+a[6]*c+a[10]*d+a[14])*e;return this},applyQuaternion:function(a){var b=this.x,c=this.y,d=this.z,e=a.x,f=a.y,h=a.z,a=a.w,g=a*b+f*d-h*c,i=a*c+h*b-e*d,j=a*d+e*c-f*b,b=-e*b-f*c-h*d;this.x=g*a+b*-e+i*-h-j*-f;this.y=i*a+b*-f+j*-e-g*-h;this.z=j*a+b*-h+g*-f-i*-e;return this},transformDirection:function(a){var b=this.x,c=this.y,d=this.z,a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d;this.y=a[1]*b+a[5]*c+a[9]*d;this.z=a[2]*
b+a[6]*c+a[10]*d;this.normalize();return this},divide:function(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;return this},divideScalar:function(a){0!==a?(this.x/=a,this.y/=a,this.z/=a):this.z=this.y=this.x=0;return this},min:function(a){this.x>a.x&&(this.x=a.x);this.y>a.y&&(this.y=a.y);this.z>a.z&&(this.z=a.z);return this},max:function(a){this.x<a.x&&(this.x=a.x);this.y<a.y&&(this.y=a.y);this.z<a.z&&(this.z=a.z);return this},clamp:function(a,b){this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x);this.y<a.y?this.y=
a.y:this.y>b.y&&(this.y=b.y);this.z<a.z?this.z=a.z:this.z>b.z&&(this.z=b.z);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){var b=
this.length();0!==b&&a!==b&&this.multiplyScalar(a/b);return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;return this},cross:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(a,b);var c=this.x,d=this.y,e=this.z;this.x=d*a.z-e*a.y;this.y=e*a.x-c*a.z;this.z=c*a.y-d*a.x;return this},crossVectors:function(a,b){this.x=a.y*b.z-a.z*b.y;this.y=
a.z*b.x-a.x*b.z;this.z=a.x*b.y-a.y*b.x;return this},angleTo:function(a){a=this.dot(a)/(this.length()*a.length());return Math.acos(THREE.Math.clamp(a,-1,1))},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y,a=this.z-a.z;return b*b+c*c+a*a},setEulerFromRotationMatrix:function(a,b){function c(a){return Math.min(Math.max(a,-1),1)}var d=a.elements,e=d[0],f=d[4],h=d[8],g=d[1],i=d[5],j=d[9],l=d[2],n=d[6],d=d[10];void 0===b||"XYZ"===
b?(this.y=Math.asin(c(h)),0.99999>Math.abs(h)?(this.x=Math.atan2(-j,d),this.z=Math.atan2(-f,e)):(this.x=Math.atan2(n,i),this.z=0)):"YXZ"===b?(this.x=Math.asin(-c(j)),0.99999>Math.abs(j)?(this.y=Math.atan2(h,d),this.z=Math.atan2(g,i)):(this.y=Math.atan2(-l,e),this.z=0)):"ZXY"===b?(this.x=Math.asin(c(n)),0.99999>Math.abs(n)?(this.y=Math.atan2(-l,d),this.z=Math.atan2(-f,i)):(this.y=0,this.z=Math.atan2(g,e))):"ZYX"===b?(this.y=Math.asin(-c(l)),0.99999>Math.abs(l)?(this.x=Math.atan2(n,d),this.z=Math.atan2(g,
e)):(this.x=0,this.z=Math.atan2(-f,i))):"YZX"===b?(this.z=Math.asin(c(g)),0.99999>Math.abs(g)?(this.x=Math.atan2(-j,i),this.y=Math.atan2(-l,e)):(this.x=0,this.y=Math.atan2(h,d))):"XZY"===b&&(this.z=Math.asin(-c(f)),0.99999>Math.abs(f)?(this.x=Math.atan2(n,i),this.y=Math.atan2(h,e)):(this.x=Math.atan2(-j,d),this.y=0));return this},setEulerFromQuaternion:function(a,b){function c(a){return Math.min(Math.max(a,-1),1)}var d=a.x*a.x,e=a.y*a.y,f=a.z*a.z,h=a.w*a.w;void 0===b||"XYZ"===b?(this.x=Math.atan2(2*
(a.x*a.w-a.y*a.z),h-d-e+f),this.y=Math.asin(c(2*(a.x*a.z+a.y*a.w))),this.z=Math.atan2(2*(a.z*a.w-a.x*a.y),h+d-e-f)):"YXZ"===b?(this.x=Math.asin(c(2*(a.x*a.w-a.y*a.z))),this.y=Math.atan2(2*(a.x*a.z+a.y*a.w),h-d-e+f),this.z=Math.atan2(2*(a.x*a.y+a.z*a.w),h-d+e-f)):"ZXY"===b?(this.x=Math.asin(c(2*(a.x*a.w+a.y*a.z))),this.y=Math.atan2(2*(a.y*a.w-a.z*a.x),h-d-e+f),this.z=Math.atan2(2*(a.z*a.w-a.x*a.y),h-d+e-f)):"ZYX"===b?(this.x=Math.atan2(2*(a.x*a.w+a.z*a.y),h-d-e+f),this.y=Math.asin(c(2*(a.y*a.w-a.x*
a.z))),this.z=Math.atan2(2*(a.x*a.y+a.z*a.w),h+d-e-f)):"YZX"===b?(this.x=Math.atan2(2*(a.x*a.w-a.z*a.y),h-d+e-f),this.y=Math.atan2(2*(a.y*a.w-a.x*a.z),h+d-e-f),this.z=Math.asin(c(2*(a.x*a.y+a.z*a.w)))):"XZY"===b&&(this.x=Math.atan2(2*(a.x*a.w+a.y*a.z),h-d+e-f),this.y=Math.atan2(2*(a.x*a.z+a.y*a.w),h+d-e-f),this.z=Math.asin(c(2*(a.z*a.w-a.x*a.y))));return this},getPositionFromMatrix:function(a){this.x=a.elements[12];this.y=a.elements[13];this.z=a.elements[14];return this},getScaleFromMatrix:function(a){var b=
this.set(a.elements[0],a.elements[1],a.elements[2]).length(),c=this.set(a.elements[4],a.elements[5],a.elements[6]).length(),a=this.set(a.elements[8],a.elements[9],a.elements[10]).length();this.x=b;this.y=c;this.z=a;return this},getColumnFromMatrix:function(a,b){var c=4*a,d=b.elements;this.x=d[c];this.y=d[c+1];this.z=d[c+2];return this},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z},fromArray:function(a){this.x=a[0];this.y=a[1];this.z=a[2];return this},toArray:function(){return[this.x,
this.y,this.z]},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)}};
THREE.extend(THREE.Vector3.prototype,{applyEuler:function(){var a=new THREE.Quaternion;return function(b,c){var d=a.setFromEuler(b,c);this.applyQuaternion(d);return this}}(),applyAxisAngle:function(){var a=new THREE.Quaternion;return function(b,c){var d=a.setFromAxisAngle(b,c);this.applyQuaternion(d);return this}}(),projectOnVector:function(){var a=new THREE.Vector3;return function(b){a.copy(b).normalize();b=this.dot(a);return this.copy(a).multiplyScalar(b)}}(),projectOnPlane:function(){var a=new THREE.Vector3;
return function(b){a.copy(this).projectOnVector(b);return this.sub(a)}}(),reflect:function(){var a=new THREE.Vector3;return function(b){a.copy(this).projectOnVector(b).multiplyScalar(2);return this.subVectors(a,this)}}()});THREE.Vector4=function(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=void 0!==d?d:1};
THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},setW:function(a){this.w=a;return this},setComponent:function(a,b){switch(a){case 0:this.x=b;break;case 1:this.y=b;break;case 2:this.z=b;break;case 3:this.w=b;break;default:throw Error("index is out of range: "+a);}},getComponent:function(a){switch(a){case 0:return this.x;
case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+a);}},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=void 0!==a.w?a.w:1;return this},add:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(a,b);this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;this.w+=a;return this},
addVectors:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;this.w=a.w+b.w;return this},sub:function(a,b){if(void 0!==b)return console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(a,b);this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;return this},subVectors:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;this.w=a.w-b.w;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;this.w*=a;return this},
applyMatrix4:function(a){var b=this.x,c=this.y,d=this.z,e=this.w,a=a.elements;this.x=a[0]*b+a[4]*c+a[8]*d+a[12]*e;this.y=a[1]*b+a[5]*c+a[9]*d+a[13]*e;this.z=a[2]*b+a[6]*c+a[10]*d+a[14]*e;this.w=a[3]*b+a[7]*c+a[11]*d+a[15]*e;return this},divideScalar:function(a){0!==a?(this.x/=a,this.y/=a,this.z/=a,this.w/=a):(this.z=this.y=this.x=0,this.w=1);return this},setAxisAngleFromQuaternion:function(a){this.w=2*Math.acos(a.w);var b=Math.sqrt(1-a.w*a.w);1E-4>b?(this.x=1,this.z=this.y=0):(this.x=a.x/b,this.y=
a.y/b,this.z=a.z/b);return this},setAxisAngleFromRotationMatrix:function(a){var b,c,d,a=a.elements,e=a[0];d=a[4];var f=a[8],h=a[1],g=a[5],i=a[9];c=a[2];b=a[6];var j=a[10];if(0.01>Math.abs(d-h)&&0.01>Math.abs(f-c)&&0.01>Math.abs(i-b)){if(0.1>Math.abs(d+h)&&0.1>Math.abs(f+c)&&0.1>Math.abs(i+b)&&0.1>Math.abs(e+g+j-3))return this.set(1,0,0,0),this;a=Math.PI;e=(e+1)/2;g=(g+1)/2;j=(j+1)/2;d=(d+h)/4;f=(f+c)/4;i=(i+b)/4;e>g&&e>j?0.01>e?(b=0,d=c=0.707106781):(b=Math.sqrt(e),c=d/b,d=f/b):g>j?0.01>g?(b=0.707106781,
c=0,d=0.707106781):(c=Math.sqrt(g),b=d/c,d=i/c):0.01>j?(c=b=0.707106781,d=0):(d=Math.sqrt(j),b=f/d,c=i/d);this.set(b,c,d,a);return this}a=Math.sqrt((b-i)*(b-i)+(f-c)*(f-c)+(h-d)*(h-d));0.001>Math.abs(a)&&(a=1);this.x=(b-i)/a;this.y=(f-c)/a;this.z=(h-d)/a;this.w=Math.acos((e+g+j-1)/2);return this},min:function(a){this.x>a.x&&(this.x=a.x);this.y>a.y&&(this.y=a.y);this.z>a.z&&(this.z=a.z);this.w>a.w&&(this.w=a.w);return this},max:function(a){this.x<a.x&&(this.x=a.x);this.y<a.y&&(this.y=a.y);this.z<a.z&&
(this.z=a.z);this.w<a.w&&(this.w=a.w);return this},clamp:function(a,b){this.x<a.x?this.x=a.x:this.x>b.x&&(this.x=b.x);this.y<a.y?this.y=a.y:this.y>b.y&&(this.y=b.y);this.z<a.z?this.z=a.z:this.z>b.z&&(this.z=b.z);this.w<a.w?this.w=a.w:this.w>b.w&&(this.w=b.w);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*
this.x+this.y*this.y+this.z*this.z+this.w*this.w)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){var b=this.length();0!==b&&a!==b&&this.multiplyScalar(a/b);return this},lerp:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;this.w+=(a.w-this.w)*b;return this},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z&&
a.w===this.w},fromArray:function(a){this.x=a[0];this.y=a[1];this.z=a[2];this.w=a[3];return this},toArray:function(){return[this.x,this.y,this.z,this.w]},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)}};THREE.Line3=function(a,b){this.start=void 0!==a?a:new THREE.Vector3;this.end=void 0!==b?b:new THREE.Vector3};
THREE.Line3.prototype={constructor:THREE.Line3,set:function(a,b){this.start.copy(a);this.end.copy(b);return this},copy:function(a){this.start.copy(a.start);this.end.copy(a.end);return this},center:function(a){return(a||new THREE.Vector3).addVectors(this.start,this.end).multiplyScalar(0.5)},delta:function(a){return(a||new THREE.Vector3).subVectors(this.end,this.start)},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)},at:function(a,
b){var c=b||new THREE.Vector3;return this.delta(c).multiplyScalar(a).add(this.start)},closestPointToPointParameter:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d){a.subVectors(c,this.start);b.subVectors(this.end,this.start);var e=b.dot(b),e=b.dot(a)/e;d&&(e=THREE.Math.clamp(e,0,1));return e}}(),closestPointToPoint:function(a,b,c){a=this.closestPointToPointParameter(a,b);c=c||new THREE.Vector3;return this.delta(c).multiplyScalar(a).add(this.start)},applyMatrix4:function(a){this.start.applyMatrix4(a);
this.end.applyMatrix4(a);return this},equals:function(a){return a.start.equals(this.start)&&a.end.equals(this.end)},clone:function(){return(new THREE.Line3).copy(this)}};THREE.Box2=function(a,b){this.min=void 0!==a?a:new THREE.Vector2(Infinity,Infinity);this.max=void 0!==b?b:new THREE.Vector2(-Infinity,-Infinity)};
THREE.Box2.prototype={constructor:THREE.Box2,set:function(a,b){this.min.copy(a);this.max.copy(b);return this},setFromPoints:function(a){if(0<a.length){var b=a[0];this.min.copy(b);this.max.copy(b);for(var c=1,d=a.length;c<d;c++)b=a[c],b.x<this.min.x?this.min.x=b.x:b.x>this.max.x&&(this.max.x=b.x),b.y<this.min.y?this.min.y=b.y:b.y>this.max.y&&(this.max.y=b.y)}else this.makeEmpty();return this},setFromCenterAndSize:function(){var a=new THREE.Vector2;return function(b,c){var d=a.copy(c).multiplyScalar(0.5);
this.min.copy(b).sub(d);this.max.copy(b).add(d);return this}}(),copy:function(a){this.min.copy(a.min);this.max.copy(a.max);return this},makeEmpty:function(){this.min.x=this.min.y=Infinity;this.max.x=this.max.y=-Infinity;return this},empty:function(){return this.max.x<this.min.x||this.max.y<this.min.y},center:function(a){return(a||new THREE.Vector2).addVectors(this.min,this.max).multiplyScalar(0.5)},size:function(a){return(a||new THREE.Vector2).subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);
this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y?!0:!1},getParameter:function(a){return new THREE.Vector2((a.x-this.min.x)/(this.max.x-this.min.x),
(a.y-this.min.y)/(this.max.y-this.min.y))},isIntersectionBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y?!1:!0},clampPoint:function(a,b){return(b||new THREE.Vector2).copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new THREE.Vector2;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);return this},union:function(a){this.min.min(a.min);this.max.max(a.max);
return this},translate:function(a){this.min.add(a);this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)},clone:function(){return(new THREE.Box2).copy(this)}};THREE.Box3=function(a,b){this.min=void 0!==a?a:new THREE.Vector3(Infinity,Infinity,Infinity);this.max=void 0!==b?b:new THREE.Vector3(-Infinity,-Infinity,-Infinity)};
THREE.Box3.prototype={constructor:THREE.Box3,set:function(a,b){this.min.copy(a);this.max.copy(b);return this},setFromPoints:function(a){if(0<a.length){var b=a[0];this.min.copy(b);this.max.copy(b);for(var c=1,d=a.length;c<d;c++)b=a[c],b.x<this.min.x?this.min.x=b.x:b.x>this.max.x&&(this.max.x=b.x),b.y<this.min.y?this.min.y=b.y:b.y>this.max.y&&(this.max.y=b.y),b.z<this.min.z?this.min.z=b.z:b.z>this.max.z&&(this.max.z=b.z)}else this.makeEmpty();return this},setFromCenterAndSize:function(){var a=new THREE.Vector3;
return function(b,c){var d=a.copy(c).multiplyScalar(0.5);this.min.copy(b).sub(d);this.max.copy(b).add(d);return this}}(),setFromObject:function(){var a=new THREE.Vector3;return function(b){var c=this;b.updateMatrixWorld(!0);this.makeEmpty();b.traverse(function(b){if(void 0!==b.geometry&&void 0!==b.geometry.vertices)for(var e=b.geometry.vertices,f=0,h=e.length;f<h;f++)a.copy(e[f]),a.applyMatrix4(b.matrixWorld),c.expandByPoint(a)});return this}}(),copy:function(a){this.min.copy(a.min);this.max.copy(a.max);
return this},makeEmpty:function(){this.min.x=this.min.y=this.min.z=Infinity;this.max.x=this.max.y=this.max.z=-Infinity;return this},empty:function(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},center:function(a){return(a||new THREE.Vector3).addVectors(this.min,this.max).multiplyScalar(0.5)},size:function(a){return(a||new THREE.Vector3).subVectors(this.max,this.min)},expandByPoint:function(a){this.min.min(a);this.max.max(a);return this},expandByVector:function(a){this.min.sub(a);
this.max.add(a);return this},expandByScalar:function(a){this.min.addScalar(-a);this.max.addScalar(a);return this},containsPoint:function(a){return a.x<this.min.x||a.x>this.max.x||a.y<this.min.y||a.y>this.max.y||a.z<this.min.z||a.z>this.max.z?!1:!0},containsBox:function(a){return this.min.x<=a.min.x&&a.max.x<=this.max.x&&this.min.y<=a.min.y&&a.max.y<=this.max.y&&this.min.z<=a.min.z&&a.max.z<=this.max.z?!0:!1},getParameter:function(a){return new THREE.Vector3((a.x-this.min.x)/(this.max.x-this.min.x),
(a.y-this.min.y)/(this.max.y-this.min.y),(a.z-this.min.z)/(this.max.z-this.min.z))},isIntersectionBox:function(a){return a.max.x<this.min.x||a.min.x>this.max.x||a.max.y<this.min.y||a.min.y>this.max.y||a.max.z<this.min.z||a.min.z>this.max.z?!1:!0},clampPoint:function(a,b){return(b||new THREE.Vector3).copy(a).clamp(this.min,this.max)},distanceToPoint:function(){var a=new THREE.Vector3;return function(b){return a.copy(b).clamp(this.min,this.max).sub(b).length()}}(),getBoundingSphere:function(){var a=
new THREE.Vector3;return function(b){b=b||new THREE.Sphere;b.center=this.center();b.radius=0.5*this.size(a).length();return b}}(),intersect:function(a){this.min.max(a.min);this.max.min(a.max);return this},union:function(a){this.min.min(a.min);this.max.max(a.max);return this},applyMatrix4:function(){var a=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];return function(b){a[0].set(this.min.x,this.min.y,
this.min.z).applyMatrix4(b);a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(b);a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(b);a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(b);a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(b);a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(b);a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(b);a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(b);this.makeEmpty();this.setFromPoints(a);return this}}(),translate:function(a){this.min.add(a);
this.max.add(a);return this},equals:function(a){return a.min.equals(this.min)&&a.max.equals(this.max)},clone:function(){return(new THREE.Box3).copy(this)}};THREE.Matrix3=function(a,b,c,d,e,f,h,g,i){this.elements=new Float32Array(9);this.set(void 0!==a?a:1,b||0,c||0,d||0,void 0!==e?e:1,f||0,h||0,g||0,void 0!==i?i:1)};
THREE.Matrix3.prototype={constructor:THREE.Matrix3,set:function(a,b,c,d,e,f,h,g,i){var j=this.elements;j[0]=a;j[3]=b;j[6]=c;j[1]=d;j[4]=e;j[7]=f;j[2]=h;j[5]=g;j[8]=i;return this},identity:function(){this.set(1,0,0,0,1,0,0,0,1);return this},copy:function(a){a=a.elements;this.set(a[0],a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8]);return this},multiplyVector3:function(a){console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");return a.applyMatrix3(this)},
multiplyVector3Array:function(){var a=new THREE.Vector3;return function(b){for(var c=0,d=b.length;c<d;c+=3)a.x=b[c],a.y=b[c+1],a.z=b[c+2],a.applyMatrix3(this),b[c]=a.x,b[c+1]=a.y,b[c+2]=a.z;return b}}(),multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[3]*=a;b[6]*=a;b[1]*=a;b[4]*=a;b[7]*=a;b[2]*=a;b[5]*=a;b[8]*=a;return this},determinant:function(){var a=this.elements,b=a[0],c=a[1],d=a[2],e=a[3],f=a[4],h=a[5],g=a[6],i=a[7],a=a[8];return b*f*a-b*h*i-c*e*a+c*h*g+d*e*i-d*f*g},getInverse:function(a,
b){var c=a.elements,d=this.elements;d[0]=c[10]*c[5]-c[6]*c[9];d[1]=-c[10]*c[1]+c[2]*c[9];d[2]=c[6]*c[1]-c[2]*c[5];d[3]=-c[10]*c[4]+c[6]*c[8];d[4]=c[10]*c[0]-c[2]*c[8];d[5]=-c[6]*c[0]+c[2]*c[4];d[6]=c[9]*c[4]-c[5]*c[8];d[7]=-c[9]*c[0]+c[1]*c[8];d[8]=c[5]*c[0]-c[1]*c[4];c=c[0]*d[0]+c[1]*d[3]+c[2]*d[6];if(0===c){if(b)throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0");this.identity();return this}this.multiplyScalar(1/
c);return this},transpose:function(){var a,b=this.elements;a=b[1];b[1]=b[3];b[3]=a;a=b[2];b[2]=b[6];b[6]=a;a=b[5];b[5]=b[7];b[7]=a;return this},getNormalMatrix:function(a){this.getInverse(a).transpose();return this},transposeIntoArray:function(a){var b=this.elements;a[0]=b[0];a[1]=b[3];a[2]=b[6];a[3]=b[1];a[4]=b[4];a[5]=b[7];a[6]=b[2];a[7]=b[5];a[8]=b[8];return this},clone:function(){var a=this.elements;return new THREE.Matrix3(a[0],a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8])}};THREE.Matrix4=function(a,b,c,d,e,f,h,g,i,j,l,n,m,q,t,p){var r=this.elements=new Float32Array(16);r[0]=void 0!==a?a:1;r[4]=b||0;r[8]=c||0;r[12]=d||0;r[1]=e||0;r[5]=void 0!==f?f:1;r[9]=h||0;r[13]=g||0;r[2]=i||0;r[6]=j||0;r[10]=void 0!==l?l:1;r[14]=n||0;r[3]=m||0;r[7]=q||0;r[11]=t||0;r[15]=void 0!==p?p:1};
THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(a,b,c,d,e,f,h,g,i,j,l,n,m,q,t,p){var r=this.elements;r[0]=a;r[4]=b;r[8]=c;r[12]=d;r[1]=e;r[5]=f;r[9]=h;r[13]=g;r[2]=i;r[6]=j;r[10]=l;r[14]=n;r[3]=m;r[7]=q;r[11]=t;r[15]=p;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(a){a=a.elements;this.set(a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15]);return this},extractPosition:function(a){console.warn("DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition().");
return this.copyPosition(a)},copyPosition:function(a){var b=this.elements,a=a.elements;b[12]=a[12];b[13]=a[13];b[14]=a[14];return this},extractRotation:function(){var a=new THREE.Vector3;return function(b){var c=this.elements,b=b.elements,d=1/a.set(b[0],b[1],b[2]).length(),e=1/a.set(b[4],b[5],b[6]).length(),f=1/a.set(b[8],b[9],b[10]).length();c[0]=b[0]*d;c[1]=b[1]*d;c[2]=b[2]*d;c[4]=b[4]*e;c[5]=b[5]*e;c[6]=b[6]*e;c[8]=b[8]*f;c[9]=b[9]*f;c[10]=b[10]*f;return this}}(),setRotationFromEuler:function(a,
b){console.warn("DEPRECATED: Matrix4's .setRotationFromEuler() has been deprecated in favor of makeRotationFromEuler.  Please update your code.");return this.makeRotationFromEuler(a,b)},makeRotationFromEuler:function(a,b){var c=this.elements,d=a.x,e=a.y,f=a.z,h=Math.cos(d),d=Math.sin(d),g=Math.cos(e),e=Math.sin(e),i=Math.cos(f),f=Math.sin(f);if(void 0===b||"XYZ"===b){var j=h*i,l=h*f,n=d*i,m=d*f;c[0]=g*i;c[4]=-g*f;c[8]=e;c[1]=l+n*e;c[5]=j-m*e;c[9]=-d*g;c[2]=m-j*e;c[6]=n+l*e;c[10]=h*g}else"YXZ"===b?
(j=g*i,l=g*f,n=e*i,m=e*f,c[0]=j+m*d,c[4]=n*d-l,c[8]=h*e,c[1]=h*f,c[5]=h*i,c[9]=-d,c[2]=l*d-n,c[6]=m+j*d,c[10]=h*g):"ZXY"===b?(j=g*i,l=g*f,n=e*i,m=e*f,c[0]=j-m*d,c[4]=-h*f,c[8]=n+l*d,c[1]=l+n*d,c[5]=h*i,c[9]=m-j*d,c[2]=-h*e,c[6]=d,c[10]=h*g):"ZYX"===b?(j=h*i,l=h*f,n=d*i,m=d*f,c[0]=g*i,c[4]=n*e-l,c[8]=j*e+m,c[1]=g*f,c[5]=m*e+j,c[9]=l*e-n,c[2]=-e,c[6]=d*g,c[10]=h*g):"YZX"===b?(j=h*g,l=h*e,n=d*g,m=d*e,c[0]=g*i,c[4]=m-j*f,c[8]=n*f+l,c[1]=f,c[5]=h*i,c[9]=-d*i,c[2]=-e*i,c[6]=l*f+n,c[10]=j-m*f):"XZY"===b&&
(j=h*g,l=h*e,n=d*g,m=d*e,c[0]=g*i,c[4]=-f,c[8]=e*i,c[1]=j*f+m,c[5]=h*i,c[9]=l*f-n,c[2]=n*f-l,c[6]=d*i,c[10]=m*f+j);c[3]=0;c[7]=0;c[11]=0;c[12]=0;c[13]=0;c[14]=0;c[15]=1;return this},setRotationFromQuaternion:function(a){console.warn("DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code.");return this.makeRotationFromQuaternion(a)},makeRotationFromQuaternion:function(a){var b=this.elements,c=a.x,d=a.y,e=a.z,f=a.w,h=
c+c,g=d+d,i=e+e,a=c*h,j=c*g,c=c*i,l=d*g,d=d*i,e=e*i,h=f*h,g=f*g,f=f*i;b[0]=1-(l+e);b[4]=j-f;b[8]=c+g;b[1]=j+f;b[5]=1-(a+e);b[9]=d-h;b[2]=c-g;b[6]=d+h;b[10]=1-(a+l);b[3]=0;b[7]=0;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1;return this},lookAt:function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(d,e,f){var h=this.elements;c.subVectors(d,e).normalize();0===c.length()&&(c.z=1);a.crossVectors(f,c).normalize();0===a.length()&&(c.x+=1E-4,a.crossVectors(f,c).normalize());
b.crossVectors(c,a);h[0]=a.x;h[4]=b.x;h[8]=c.x;h[1]=a.y;h[5]=b.y;h[9]=c.y;h[2]=a.z;h[6]=b.z;h[10]=c.z;return this}}(),multiply:function(a,b){return void 0!==b?(console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(a,b)):this.multiplyMatrices(this,a)},multiplyMatrices:function(a,b){var c=a.elements,d=b.elements,e=this.elements,f=c[0],h=c[4],g=c[8],i=c[12],j=c[1],l=c[5],n=c[9],m=c[13],q=c[2],t=c[6],p=c[10],r=c[14],
s=c[3],v=c[7],z=c[11],c=c[15],G=d[0],C=d[4],H=d[8],I=d[12],F=d[1],A=d[5],K=d[9],B=d[13],J=d[2],N=d[6],y=d[10],M=d[14],w=d[3],Z=d[7],L=d[11],d=d[15];e[0]=f*G+h*F+g*J+i*w;e[4]=f*C+h*A+g*N+i*Z;e[8]=f*H+h*K+g*y+i*L;e[12]=f*I+h*B+g*M+i*d;e[1]=j*G+l*F+n*J+m*w;e[5]=j*C+l*A+n*N+m*Z;e[9]=j*H+l*K+n*y+m*L;e[13]=j*I+l*B+n*M+m*d;e[2]=q*G+t*F+p*J+r*w;e[6]=q*C+t*A+p*N+r*Z;e[10]=q*H+t*K+p*y+r*L;e[14]=q*I+t*B+p*M+r*d;e[3]=s*G+v*F+z*J+c*w;e[7]=s*C+v*A+z*N+c*Z;e[11]=s*H+v*K+z*y+c*L;e[15]=s*I+v*B+z*M+c*d;return this},
multiplyToArray:function(a,b,c){var d=this.elements;this.multiplyMatrices(a,b);c[0]=d[0];c[1]=d[1];c[2]=d[2];c[3]=d[3];c[4]=d[4];c[5]=d[5];c[6]=d[6];c[7]=d[7];c[8]=d[8];c[9]=d[9];c[10]=d[10];c[11]=d[11];c[12]=d[12];c[13]=d[13];c[14]=d[14];c[15]=d[15];return this},multiplyScalar:function(a){var b=this.elements;b[0]*=a;b[4]*=a;b[8]*=a;b[12]*=a;b[1]*=a;b[5]*=a;b[9]*=a;b[13]*=a;b[2]*=a;b[6]*=a;b[10]*=a;b[14]*=a;b[3]*=a;b[7]*=a;b[11]*=a;b[15]*=a;return this},multiplyVector3:function(a){console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
return a.applyProjection(this)},multiplyVector4:function(a){console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},multiplyVector3Array:function(){var a=new THREE.Vector3;return function(b){for(var c=0,d=b.length;c<d;c+=3)a.x=b[c],a.y=b[c+1],a.z=b[c+2],a.applyProjection(this),b[c]=a.x,b[c+1]=a.y,b[c+2]=a.z;return b}}(),rotateAxis:function(a){console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
a.transformDirection(this)},crossVector:function(a){console.warn("DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");return a.applyMatrix4(this)},determinant:function(){var a=this.elements,b=a[0],c=a[4],d=a[8],e=a[12],f=a[1],h=a[5],g=a[9],i=a[13],j=a[2],l=a[6],n=a[10],m=a[14];return a[3]*(+e*g*l-d*i*l-e*h*n+c*i*n+d*h*m-c*g*m)+a[7]*(+b*g*m-b*i*n+e*f*n-d*f*m+d*i*j-e*g*j)+a[11]*(+b*i*l-b*h*m-e*f*l+c*f*m+e*h*j-c*i*j)+a[15]*(-d*h*j-b*g*l+b*h*n+d*f*l-c*f*
n+c*g*j)},transpose:function(){var a=this.elements,b;b=a[1];a[1]=a[4];a[4]=b;b=a[2];a[2]=a[8];a[8]=b;b=a[6];a[6]=a[9];a[9]=b;b=a[3];a[3]=a[12];a[12]=b;b=a[7];a[7]=a[13];a[13]=b;b=a[11];a[11]=a[14];a[14]=b;return this},flattenToArray:function(a){var b=this.elements;a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];a[9]=b[9];a[10]=b[10];a[11]=b[11];a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a},flattenToArrayOffset:function(a,b){var c=this.elements;
a[b]=c[0];a[b+1]=c[1];a[b+2]=c[2];a[b+3]=c[3];a[b+4]=c[4];a[b+5]=c[5];a[b+6]=c[6];a[b+7]=c[7];a[b+8]=c[8];a[b+9]=c[9];a[b+10]=c[10];a[b+11]=c[11];a[b+12]=c[12];a[b+13]=c[13];a[b+14]=c[14];a[b+15]=c[15];return a},getPosition:function(){var a=new THREE.Vector3;return function(){console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");var b=this.elements;return a.set(b[12],b[13],b[14])}}(),setPosition:function(a){var b=this.elements;
b[12]=a.x;b[13]=a.y;b[14]=a.z;return this},getInverse:function(a,b){var c=this.elements,d=a.elements,e=d[0],f=d[4],h=d[8],g=d[12],i=d[1],j=d[5],l=d[9],n=d[13],m=d[2],q=d[6],t=d[10],p=d[14],r=d[3],s=d[7],v=d[11],d=d[15];c[0]=l*p*s-n*t*s+n*q*v-j*p*v-l*q*d+j*t*d;c[4]=g*t*s-h*p*s-g*q*v+f*p*v+h*q*d-f*t*d;c[8]=h*n*s-g*l*s+g*j*v-f*n*v-h*j*d+f*l*d;c[12]=g*l*q-h*n*q-g*j*t+f*n*t+h*j*p-f*l*p;c[1]=n*t*r-l*p*r-n*m*v+i*p*v+l*m*d-i*t*d;c[5]=h*p*r-g*t*r+g*m*v-e*p*v-h*m*d+e*t*d;c[9]=g*l*r-h*n*r-g*i*v+e*n*v+h*i*d-
e*l*d;c[13]=h*n*m-g*l*m+g*i*t-e*n*t-h*i*p+e*l*p;c[2]=j*p*r-n*q*r+n*m*s-i*p*s-j*m*d+i*q*d;c[6]=g*q*r-f*p*r-g*m*s+e*p*s+f*m*d-e*q*d;c[10]=f*n*r-g*j*r+g*i*s-e*n*s-f*i*d+e*j*d;c[14]=g*j*m-f*n*m-g*i*q+e*n*q+f*i*p-e*j*p;c[3]=l*q*r-j*t*r-l*m*s+i*t*s+j*m*v-i*q*v;c[7]=f*t*r-h*q*r+h*m*s-e*t*s-f*m*v+e*q*v;c[11]=h*j*r-f*l*r-h*i*s+e*l*s+f*i*v-e*j*v;c[15]=f*l*m-h*j*m+h*i*q-e*l*q-f*i*t+e*j*t;c=e*c[0]+i*c[4]+m*c[8]+r*c[12];if(0==c){if(b)throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");
this.identity();return this}this.multiplyScalar(1/c);return this},translate:function(){console.warn("DEPRECATED: Matrix4's .translate() has been removed.")},rotateX:function(){console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.")},rotateY:function(){console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.")},rotateZ:function(){console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.")},rotateByAxis:function(){console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.")},
scale:function(a){var b=this.elements,c=a.x,d=a.y,a=a.z;b[0]*=c;b[4]*=d;b[8]*=a;b[1]*=c;b[5]*=d;b[9]*=a;b[2]*=c;b[6]*=d;b[10]*=a;b[3]*=c;b[7]*=d;b[11]*=a;return this},getMaxScaleOnAxis:function(){var a=this.elements;return Math.sqrt(Math.max(a[0]*a[0]+a[1]*a[1]+a[2]*a[2],Math.max(a[4]*a[4]+a[5]*a[5]+a[6]*a[6],a[8]*a[8]+a[9]*a[9]+a[10]*a[10])))},makeTranslation:function(a,b,c){this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1);return this},makeRotationX:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(1,
0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1);return this},makeRotationY:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1);return this},makeRotationZ:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1);return this},makeRotationAxis:function(a,b){var c=Math.cos(b),d=Math.sin(b),e=1-c,f=a.x,h=a.y,g=a.z,i=e*f,j=e*h;this.set(i*f+c,i*h-d*g,i*g+d*h,0,i*h+d*g,j*h+c,j*g-d*f,0,i*g-d*h,j*g+d*f,e*g*g+c,0,0,0,0,1);return this},makeScale:function(a,b,c){this.set(a,
0,0,0,0,b,0,0,0,0,c,0,0,0,0,1);return this},compose:function(a,b,c){console.warn("DEPRECATED: Matrix4's .compose() has been deprecated in favor of makeFromPositionQuaternionScale. Please update your code.");return this.makeFromPositionQuaternionScale(a,b,c)},makeFromPositionQuaternionScale:function(a,b,c){this.makeRotationFromQuaternion(b);this.scale(c);this.setPosition(a);return this},makeFromPositionEulerScale:function(a,b,c,d){this.makeRotationFromEuler(b,c);this.scale(d);this.setPosition(a);return this},
makeFrustum:function(a,b,c,d,e,f){var h=this.elements;h[0]=2*e/(b-a);h[4]=0;h[8]=(b+a)/(b-a);h[12]=0;h[1]=0;h[5]=2*e/(d-c);h[9]=(d+c)/(d-c);h[13]=0;h[2]=0;h[6]=0;h[10]=-(f+e)/(f-e);h[14]=-2*f*e/(f-e);h[3]=0;h[7]=0;h[11]=-1;h[15]=0;return this},makePerspective:function(a,b,c,d){var a=c*Math.tan(THREE.Math.degToRad(0.5*a)),e=-a;return this.makeFrustum(e*b,a*b,e,a,c,d)},makeOrthographic:function(a,b,c,d,e,f){var h=this.elements,g=b-a,i=c-d,j=f-e;h[0]=2/g;h[4]=0;h[8]=0;h[12]=-((b+a)/g);h[1]=0;h[5]=2/
i;h[9]=0;h[13]=-((c+d)/i);h[2]=0;h[6]=0;h[10]=-2/j;h[14]=-((f+e)/j);h[3]=0;h[7]=0;h[11]=0;h[15]=1;return this},clone:function(){var a=this.elements;return new THREE.Matrix4(a[0],a[4],a[8],a[12],a[1],a[5],a[9],a[13],a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15])}};
THREE.extend(THREE.Matrix4.prototype,{decompose:function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3,d=new THREE.Matrix4;return function(e,f,h){var g=this.elements;a.set(g[0],g[1],g[2]);b.set(g[4],g[5],g[6]);c.set(g[8],g[9],g[10]);e=e instanceof THREE.Vector3?e:new THREE.Vector3;f=f instanceof THREE.Quaternion?f:new THREE.Quaternion;h=h instanceof THREE.Vector3?h:new THREE.Vector3;h.x=a.length();h.y=b.length();h.z=c.length();e.x=g[12];e.y=g[13];e.z=g[14];d.copy(this);d.elements[0]/=
h.x;d.elements[1]/=h.x;d.elements[2]/=h.x;d.elements[4]/=h.y;d.elements[5]/=h.y;d.elements[6]/=h.y;d.elements[8]/=h.z;d.elements[9]/=h.z;d.elements[10]/=h.z;f.setFromRotationMatrix(d);return[e,f,h]}}()});THREE.Ray=function(a,b){this.origin=void 0!==a?a:new THREE.Vector3;this.direction=void 0!==b?b:new THREE.Vector3};
THREE.Ray.prototype={constructor:THREE.Ray,set:function(a,b){this.origin.copy(a);this.direction.copy(b);return this},copy:function(a){this.origin.copy(a.origin);this.direction.copy(a.direction);return this},at:function(a,b){return(b||new THREE.Vector3).copy(this.direction).multiplyScalar(a).add(this.origin)},recast:function(){var a=new THREE.Vector3;return function(b){this.origin.copy(this.at(b,a));return this}}(),closestPointToPoint:function(a,b){var c=b||new THREE.Vector3;c.subVectors(a,this.origin);
var d=c.dot(this.direction);return c.copy(this.direction).multiplyScalar(d).add(this.origin)},distanceToPoint:function(){var a=new THREE.Vector3;return function(b){var c=a.subVectors(b,this.origin).dot(this.direction);a.copy(this.direction).multiplyScalar(c).add(this.origin);return a.distanceTo(b)}}(),isIntersectionSphere:function(a){return this.distanceToPoint(a.center)<=a.radius},isIntersectionPlane:function(a){return 0!=a.normal.dot(this.direction)||0==a.distanceToPoint(this.origin)?!0:!1},distanceToPlane:function(a){var b=
a.normal.dot(this.direction);if(0==b){if(0==a.distanceToPoint(this.origin))return 0}else return-(this.origin.dot(a.normal)+a.constant)/b},intersectPlane:function(a,b){var c=this.distanceToPlane(a);return void 0===c?void 0:this.at(c,b)},applyMatrix4:function(a){this.direction.add(this.origin).applyMatrix4(a);this.origin.applyMatrix4(a);this.direction.sub(this.origin);return this},equals:function(a){return a.origin.equals(this.origin)&&a.direction.equals(this.direction)},clone:function(){return(new THREE.Ray).copy(this)}};THREE.Sphere=function(a,b){this.center=void 0!==a?a:new THREE.Vector3;this.radius=void 0!==b?b:0};
THREE.Sphere.prototype={constructor:THREE.Sphere,set:function(a,b){this.center.copy(a);this.radius=b;return this},setFromPoints:function(a){for(var b,c=0,d=0,e=a.length;d<e;d++)b=a[d].lengthSq(),c=Math.max(c,b);this.center.set(0,0,0);this.radius=Math.sqrt(c);return this},copy:function(a){this.center.copy(a.center);this.radius=a.radius;return this},empty:function(){return 0>=this.radius},containsPoint:function(a){return a.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(a){return a.distanceTo(this.center)-
this.radius},intersectsSphere:function(a){var b=this.radius+a.radius;return a.center.distanceToSquared(this.center)<=b*b},clampPoint:function(a,b){var c=this.center.distanceToSquared(a),d=b||new THREE.Vector3;d.copy(a);c>this.radius*this.radius&&(d.sub(this.center).normalize(),d.multiplyScalar(this.radius).add(this.center));return d},getBoundingBox:function(a){a=a||new THREE.Box3;a.set(this.center,this.center);a.expandByScalar(this.radius);return a},applyMatrix4:function(a){this.center.applyMatrix4(a);
this.radius*=a.getMaxScaleOnAxis();return this},translate:function(a){this.center.add(a);return this},equals:function(a){return a.center.equals(this.center)&&a.radius===this.radius},clone:function(){return(new THREE.Sphere).copy(this)}};THREE.Frustum=function(a,b,c,d,e,f){this.planes=[void 0!==a?a:new THREE.Plane,void 0!==b?b:new THREE.Plane,void 0!==c?c:new THREE.Plane,void 0!==d?d:new THREE.Plane,void 0!==e?e:new THREE.Plane,void 0!==f?f:new THREE.Plane]};
THREE.Frustum.prototype={constructor:THREE.Frustum,set:function(a,b,c,d,e,f){var h=this.planes;h[0].copy(a);h[1].copy(b);h[2].copy(c);h[3].copy(d);h[4].copy(e);h[5].copy(f);return this},copy:function(a){for(var b=this.planes,c=0;6>c;c++)b[c].copy(a.planes[c]);return this},setFromMatrix:function(a){var b=this.planes,c=a.elements,a=c[0],d=c[1],e=c[2],f=c[3],h=c[4],g=c[5],i=c[6],j=c[7],l=c[8],n=c[9],m=c[10],q=c[11],t=c[12],p=c[13],r=c[14],c=c[15];b[0].setComponents(f-a,j-h,q-l,c-t).normalize();b[1].setComponents(f+
a,j+h,q+l,c+t).normalize();b[2].setComponents(f+d,j+g,q+n,c+p).normalize();b[3].setComponents(f-d,j-g,q-n,c-p).normalize();b[4].setComponents(f-e,j-i,q-m,c-r).normalize();b[5].setComponents(f+e,j+i,q+m,c+r).normalize();return this},intersectsObject:function(){var a=new THREE.Vector3;return function(b){var c=b.matrixWorld,d=this.planes,b=-b.geometry.boundingSphere.radius*c.getMaxScaleOnAxis();a.getPositionFromMatrix(c);for(c=0;6>c;c++)if(d[c].distanceToPoint(a)<b)return!1;return!0}}(),intersectsSphere:function(a){for(var b=
this.planes,c=a.center,a=-a.radius,d=0;6>d;d++)if(b[d].distanceToPoint(c)<a)return!1;return!0},containsPoint:function(a){for(var b=this.planes,c=0;6>c;c++)if(0>b[c].distanceToPoint(a))return!1;return!0},clone:function(){return(new THREE.Frustum).copy(this)}};THREE.Plane=function(a,b){this.normal=void 0!==a?a:new THREE.Vector3(1,0,0);this.constant=void 0!==b?b:0};
THREE.Plane.prototype={constructor:THREE.Plane,set:function(a,b){this.normal.copy(a);this.constant=b;return this},setComponents:function(a,b,c,d){this.normal.set(a,b,c);this.constant=d;return this},setFromNormalAndCoplanarPoint:function(a,b){this.normal.copy(a);this.constant=-b.dot(this.normal);return this},setFromCoplanarPoints:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d,e){d=a.subVectors(e,d).cross(b.subVectors(c,d)).normalize();this.setFromNormalAndCoplanarPoint(d,
c);return this}}(),copy:function(a){this.normal.copy(a.normal);this.constant=a.constant;return this},normalize:function(){var a=1/this.normal.length();this.normal.multiplyScalar(a);this.constant*=a;return this},negate:function(){this.constant*=-1;this.normal.negate();return this},distanceToPoint:function(a){return this.normal.dot(a)+this.constant},distanceToSphere:function(a){return this.distanceToPoint(a.center)-a.radius},projectPoint:function(a,b){return this.orthoPoint(a,b).sub(a).negate()},orthoPoint:function(a,
b){var c=this.distanceToPoint(a);return(b||new THREE.Vector3).copy(this.normal).multiplyScalar(c)},isIntersectionLine:function(a){var b=this.distanceToPoint(a.start),a=this.distanceToPoint(a.end);return 0>b&&0<a||0>a&&0<b},intersectLine:function(){var a=new THREE.Vector3;return function(b,c){var d=c||new THREE.Vector3,e=b.delta(a),f=this.normal.dot(e);if(0==f){if(0==this.distanceToPoint(b.start))return d.copy(b.start)}else return f=-(b.start.dot(this.normal)+this.constant)/f,0>f||1<f?void 0:d.copy(e).multiplyScalar(f).add(b.start)}}(),
coplanarPoint:function(a){return(a||new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c,d){var d=d||(new THREE.Matrix3).getNormalMatrix(c),e=a.copy(this.normal).applyMatrix3(d),f=this.coplanarPoint(b);f.applyMatrix4(c);this.setFromNormalAndCoplanarPoint(e,f);return this}}(),translate:function(a){this.constant-=a.dot(this.normal);return this},equals:function(a){return a.normal.equals(this.normal)&&
a.constant==this.constant},clone:function(){return(new THREE.Plane).copy(this)}};THREE.Math={generateUUID:function(){var a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),b=Array(36),c=0,d;return function(){for(var e=0;36>e;e++)8==e||13==e||18==e||23==e?b[e]="-":14==e?b[e]="4":(2>=c&&(c=33554432+16777216*Math.random()|0),d=c&15,c>>=4,b[e]=a[19==e?d&3|8:d]);return b.join("")}}(),clamp:function(a,b,c){return a<b?b:a>c?c:a},clampBottom:function(a,b){return a<b?b:a},mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-b)},smoothstep:function(a,b,c){if(a<=
b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*(3-2*a)},smootherstep:function(a,b,c){if(a<=b)return 0;if(a>=c)return 1;a=(a-b)/(c-b);return a*a*a*(a*(6*a-15)+10)},random16:function(){return(65280*Math.random()+255*Math.random())/65535},randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},randFloat:function(a,b){return a+Math.random()*(b-a)},randFloatSpread:function(a){return a*(0.5-Math.random())},sign:function(a){return 0>a?-1:0<a?1:0},degToRad:function(){var a=Math.PI/180;return function(b){return b*
a}}(),radToDeg:function(){var a=180/Math.PI;return function(b){return b*a}}()};THREE.Spline=function(a){function b(a,b,c,d,e,f,h){a=0.5*(c-a);d=0.5*(d-b);return(2*(b-c)+a+d)*h+(-3*(b-c)-2*a-d)*f+a*e+b}this.points=a;var c=[],d={x:0,y:0,z:0},e,f,h,g,i,j,l,n,m;this.initFromArray=function(a){this.points=[];for(var b=0;b<a.length;b++)this.points[b]={x:a[b][0],y:a[b][1],z:a[b][2]}};this.getPoint=function(a){e=(this.points.length-1)*a;f=Math.floor(e);h=e-f;c[0]=0===f?f:f-1;c[1]=f;c[2]=f>this.points.length-2?this.points.length-1:f+1;c[3]=f>this.points.length-3?this.points.length-1:
f+2;j=this.points[c[0]];l=this.points[c[1]];n=this.points[c[2]];m=this.points[c[3]];g=h*h;i=h*g;d.x=b(j.x,l.x,n.x,m.x,h,g,i);d.y=b(j.y,l.y,n.y,m.y,h,g,i);d.z=b(j.z,l.z,n.z,m.z,h,g,i);return d};this.getControlPointsArray=function(){var a,b,c=this.points.length,d=[];for(a=0;a<c;a++)b=this.points[a],d[a]=[b.x,b.y,b.z];return d};this.getLength=function(a){var b,c,d,e=b=b=0,f=new THREE.Vector3,h=new THREE.Vector3,g=[],i=0;g[0]=0;a||(a=100);c=this.points.length*a;f.copy(this.points[0]);for(a=1;a<c;a++)b=
a/c,d=this.getPoint(b),h.copy(d),i+=h.distanceTo(f),f.copy(d),b*=this.points.length-1,b=Math.floor(b),b!=e&&(g[b]=i,e=b);g[g.length]=i;return{chunks:g,total:i}};this.reparametrizeByArcLength=function(a){var b,c,d,e,f,h,g=[],i=new THREE.Vector3,j=this.getLength();g.push(i.copy(this.points[0]).clone());for(b=1;b<this.points.length;b++){c=j.chunks[b]-j.chunks[b-1];h=Math.ceil(a*c/j.total);e=(b-1)/(this.points.length-1);f=b/(this.points.length-1);for(c=1;c<h-1;c++)d=e+c*(1/h)*(f-e),d=this.getPoint(d),
g.push(i.copy(d).clone());g.push(i.copy(this.points[b]).clone())}this.points=g}};THREE.Triangle=function(a,b,c){this.a=void 0!==a?a:new THREE.Vector3;this.b=void 0!==b?b:new THREE.Vector3;this.c=void 0!==c?c:new THREE.Vector3};THREE.Triangle.normal=function(){var a=new THREE.Vector3;return function(b,c,d,e){e=e||new THREE.Vector3;e.subVectors(d,c);a.subVectors(b,c);e.cross(a);b=e.lengthSq();return 0<b?e.multiplyScalar(1/Math.sqrt(b)):e.set(0,0,0)}}();
THREE.Triangle.barycoordFromPoint=function(){var a=new THREE.Vector3,b=new THREE.Vector3,c=new THREE.Vector3;return function(d,e,f,h,g){a.subVectors(h,e);b.subVectors(f,e);c.subVectors(d,e);var d=a.dot(a),e=a.dot(b),f=a.dot(c),i=b.dot(b),h=b.dot(c),j=d*i-e*e,g=g||new THREE.Vector3;if(0==j)return g.set(-2,-1,-1);j=1/j;i=(i*f-e*h)*j;d=(d*h-e*f)*j;return g.set(1-i-d,d,i)}}();
THREE.Triangle.containsPoint=function(){var a=new THREE.Vector3;return function(b,c,d,e){b=THREE.Triangle.barycoordFromPoint(b,c,d,e,a);return 0<=b.x&&0<=b.y&&1>=b.x+b.y}}();
THREE.Triangle.prototype={constructor:THREE.Triangle,set:function(a,b,c){this.a.copy(a);this.b.copy(b);this.c.copy(c);return this},setFromPointsAndIndices:function(a,b,c,d){this.a.copy(a[b]);this.b.copy(a[c]);this.c.copy(a[d]);return this},copy:function(a){this.a.copy(a.a);this.b.copy(a.b);this.c.copy(a.c);return this},area:function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(){a.subVectors(this.c,this.b);b.subVectors(this.a,this.b);return 0.5*a.cross(b).length()}}(),midpoint:function(a){return(a||
new THREE.Vector3).addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},normal:function(a){return THREE.Triangle.normal(this.a,this.b,this.c,a)},plane:function(a){return(a||new THREE.Plane).setFromCoplanarPoints(this.a,this.b,this.c)},barycoordFromPoint:function(a,b){return THREE.Triangle.barycoordFromPoint(a,this.a,this.b,this.c,b)},containsPoint:function(a){return THREE.Triangle.containsPoint(a,this.a,this.b,this.c)},equals:function(a){return a.a.equals(this.a)&&a.b.equals(this.b)&&a.c.equals(this.c)},
clone:function(){return(new THREE.Triangle).copy(this)}};THREE.Vertex=function(a){console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.");return a};THREE.UV=function(a,b){console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead.");return new THREE.Vector2(a,b)};THREE.Clock=function(a){this.autoStart=void 0!==a?a:!0;this.elapsedTime=this.oldTime=this.startTime=0;this.running=!1};
THREE.Clock.prototype={constructor:THREE.Clock,start:function(){this.oldTime=this.startTime=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now();this.running=!0},stop:function(){this.getElapsedTime();this.running=!1},getElapsedTime:function(){this.getDelta();return this.elapsedTime},getDelta:function(){var a=0;this.autoStart&&!this.running&&this.start();if(this.running){var b=void 0!==self.performance&&void 0!==self.performance.now?self.performance.now():Date.now(),
a=0.001*(b-this.oldTime);this.oldTime=b;this.elapsedTime+=a}return a}};THREE.EventDispatcher=function(){};
THREE.EventDispatcher.prototype={constructor:THREE.EventDispatcher,addEventListener:function(a,b){void 0===this._listeners&&(this._listeners={});var c=this._listeners;void 0===c[a]&&(c[a]=[]);-1===c[a].indexOf(b)&&c[a].push(b)},hasEventListener:function(a,b){if(void 0===this._listeners)return!1;var c=this._listeners;return void 0!==c[a]&&-1!==c[a].indexOf(b)?!0:!1},removeEventListener:function(a,b){if(void 0!==this._listeners){var c=this._listeners,d=c[a].indexOf(b);-1!==d&&c[a].splice(d,1)}},dispatchEvent:function(a){if(void 0!==
this._listeners){var b=this._listeners[a.type];if(void 0!==b){a.target=this;for(var c=0,d=b.length;c<d;c++)b[c].call(this,a)}}}};(function(a){a.Raycaster=function(b,c,d,e){this.ray=new a.Ray(b,c);0<this.ray.direction.lengthSq()&&this.ray.direction.normalize();this.near=d||0;this.far=e||Infinity};var b=new a.Sphere,c=new a.Ray,d=new a.Plane,e=new a.Vector3,f=new a.Vector3,h=new a.Matrix4,g=function(a,b){return a.distance-b.distance},i=function(g,j,m){if(g instanceof a.Particle){f.getPositionFromMatrix(g.matrixWorld);var q=j.ray.distanceToPoint(f);if(q>g.scale.x)return m;m.push({distance:q,point:g.position,face:null,object:g})}else if(g instanceof
a.LOD)f.getPositionFromMatrix(g.matrixWorld),q=j.ray.origin.distanceTo(f),i(g.getObjectForDistance(q),j,m);else if(g instanceof a.Mesh){f.getPositionFromMatrix(g.matrixWorld);b.set(f,g.geometry.boundingSphere.radius*g.matrixWorld.getMaxScaleOnAxis());if(!1===j.ray.isIntersectionSphere(b))return m;var q=g.geometry,t=q.vertices;if(q instanceof a.BufferGeometry){var p=g.material;if(void 0===p||!q.dynamic)return m;var r=g.material instanceof a.MeshFaceMaterial,s=!0===r?g.material.materials:null,v=g.material.side,
z,G,C=j.precision;h.getInverse(g.matrixWorld);c.copy(j.ray).applyMatrix4(h);var H,t=!1;q.attributes.index&&(t=!0);r=new a.Vector3;s=new a.Vector3;H=new a.Vector3;new a.Vector3;new a.Vector3;for(var I=0;I<q.offsets.length;++I)for(var F=q.offsets[I].start,A=q.offsets[I].index,K=F,B=F+q.offsets[I].count;K<B;K+=3)if(t?(v=A+q.attributes.index.array[K],z=A+q.attributes.index.array[K+1],G=A+q.attributes.index.array[K+2]):(v=A,z=A+1,G=A+2),r.set(q.attributes.position.array[3*v],q.attributes.position.array[3*
v+1],q.attributes.position.array[3*v+2]),s.set(q.attributes.position.array[3*z],q.attributes.position.array[3*z+1],q.attributes.position.array[3*z+2]),H.set(q.attributes.position.array[3*G],q.attributes.position.array[3*G+1],q.attributes.position.array[3*G+2]),d.setFromCoplanarPoints(r,s,H),F=c.distanceToPlane(d),!(Math.abs(F)<C)&&!(0>F)){v=p.side;if(v!==a.DoubleSide&&(z=c.direction.dot(d.normal),!(v===a.FrontSide?0>z:0<z)))continue;F<j.near||F>j.far||(e=c.at(F,e),a.Triangle.containsPoint(e,r,s,H)&&
m.push({distance:F,point:j.ray.at(F),face:null,faceIndex:null,object:g}))}}else if(q instanceof a.Geometry){r=g.material instanceof a.MeshFaceMaterial;s=!0===r?g.material.materials:null;C=j.precision;h.getInverse(g.matrixWorld);c.copy(j.ray).applyMatrix4(h);I=0;for(H=q.faces.length;I<H;I++)if(A=q.faces[I],p=!0===r?s[A.materialIndex]:g.material,void 0!==p&&(d.setFromNormalAndCoplanarPoint(A.normal,t[A.a]),F=c.distanceToPlane(d),!(Math.abs(F)<C)&&!(0>F))){v=p.side;if(v!==a.DoubleSide&&(z=c.direction.dot(d.normal),
!(v===a.FrontSide?0>z:0<z)))continue;if(!(F<j.near||F>j.far)){e=c.at(F,e);if(A instanceof a.Face3){if(v=t[A.a],z=t[A.b],G=t[A.c],!a.Triangle.containsPoint(e,v,z,G))continue}else if(A instanceof a.Face4){if(v=t[A.a],z=t[A.b],G=t[A.c],p=t[A.d],!a.Triangle.containsPoint(e,v,z,p)&&!a.Triangle.containsPoint(e,z,G,p))continue}else throw Error("face type not supported");m.push({distance:F,point:j.ray.at(F),face:A,faceIndex:I,object:g})}}}}},j=function(a,b,c){for(var a=a.getDescendants(),d=0,e=a.length;d<
e;d++)i(a[d],b,c)};a.Raycaster.prototype.precision=1E-4;a.Raycaster.prototype.set=function(a,b){this.ray.set(a,b);0<this.ray.direction.length()&&this.ray.direction.normalize()};a.Raycaster.prototype.intersectObject=function(a,b){var c=[];!0===b&&j(a,this,c);i(a,this,c);c.sort(g);return c};a.Raycaster.prototype.intersectObjects=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)i(a[d],this,c),!0===b&&j(a[d],this,c);c.sort(g);return c}})(THREE);THREE.Object3D=function(){this.id=THREE.Math.generateUUID();this.name="";this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.eulerOrder=THREE.Object3D.defaultEulerOrder;this.scale=new THREE.Vector3(1,1,1);this.renderDepth=null;this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixWorldNeedsUpdate=this.matrixAutoUpdate=!0;this.quaternion=new THREE.Quaternion;this.useQuaternion=
!1;this.visible=!0;this.receiveShadow=this.castShadow=!1;this.frustumCulled=!0;this.userData={}};
THREE.Object3D.prototype={constructor:THREE.Object3D,addEventListener:THREE.EventDispatcher.prototype.addEventListener,hasEventListener:THREE.EventDispatcher.prototype.hasEventListener,removeEventListener:THREE.EventDispatcher.prototype.removeEventListener,dispatchEvent:THREE.EventDispatcher.prototype.dispatchEvent,applyMatrix:function(){var a=new THREE.Matrix4;return function(b){this.matrix.multiplyMatrices(b,this.matrix);this.position.getPositionFromMatrix(this.matrix);this.scale.getScaleFromMatrix(this.matrix);
a.extractRotation(this.matrix);!0===this.useQuaternion?this.quaternion.setFromRotationMatrix(a):this.rotation.setEulerFromRotationMatrix(a,this.eulerOrder)}}(),rotateOnAxis:function(){var a=new THREE.Quaternion,b=new THREE.Quaternion;return function(c,d){a.setFromAxisAngle(c,d);!0===this.useQuaternion?this.quaternion.multiply(a):(b.setFromEuler(this.rotation,this.eulerOrder),b.multiply(a),this.rotation.setEulerFromQuaternion(b,this.eulerOrder));return this}}(),translateOnAxis:function(){var a=new THREE.Vector3;
return function(b,c){a.copy(b);!0===this.useQuaternion?a.applyQuaternion(this.quaternion):a.applyEuler(this.rotation,this.eulerOrder);this.position.add(a.multiplyScalar(c));return this}}(),translate:function(a,b){console.warn("DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed.");return this.translateOnAxis(b,a)},translateX:function(){var a=new THREE.Vector3(1,0,0);return function(b){return this.translateOnAxis(a,b)}}(),
translateY:function(){var a=new THREE.Vector3(0,1,0);return function(b){return this.translateOnAxis(a,b)}}(),translateZ:function(){var a=new THREE.Vector3(0,0,1);return function(b){return this.translateOnAxis(a,b)}}(),localToWorld:function(a){return a.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var a=new THREE.Matrix4;return function(b){return b.applyMatrix4(a.getInverse(this.matrixWorld))}}(),lookAt:function(){var a=new THREE.Matrix4;return function(b){a.lookAt(b,this.position,this.up);
!0===this.useQuaternion?this.quaternion.setFromRotationMatrix(a):this.rotation.setEulerFromRotationMatrix(a,this.eulerOrder)}}(),add:function(a){if(a===this)console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");else if(a instanceof THREE.Object3D){void 0!==a.parent&&a.parent.remove(a);a.parent=this;this.children.push(a);for(var b=this;void 0!==b.parent;)b=b.parent;void 0!==b&&b instanceof THREE.Scene&&b.__addObject(a)}},remove:function(a){var b=this.children.indexOf(a);
if(-1!==b){a.parent=void 0;this.children.splice(b,1);for(b=this;void 0!==b.parent;)b=b.parent;void 0!==b&&b instanceof THREE.Scene&&b.__removeObject(a)}},traverse:function(a){a(this);for(var b=0,c=this.children.length;b<c;b++)this.children[b].traverse(a)},getObjectById:function(a,b){for(var c=0,d=this.children.length;c<d;c++){var e=this.children[c];if(e.id===a||!0===b&&(e=e.getObjectById(a,b),void 0!==e))return e}},getObjectByName:function(a,b){for(var c=0,d=this.children.length;c<d;c++){var e=this.children[c];
if(e.name===a||!0===b&&(e=e.getObjectByName(a,b),void 0!==e))return e}},getChildByName:function(a,b){console.warn("DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName().");return this.getObjectByName(a,b)},getDescendants:function(a){void 0===a&&(a=[]);Array.prototype.push.apply(a,this.children);for(var b=0,c=this.children.length;b<c;b++)this.children[b].getDescendants(a);return a},updateMatrix:function(){!1===this.useQuaternion?this.matrix.makeFromPositionEulerScale(this.position,
this.rotation,this.eulerOrder,this.scale):this.matrix.makeFromPositionQuaternionScale(this.position,this.quaternion,this.scale);this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){!0===this.matrixAutoUpdate&&this.updateMatrix();if(!0===this.matrixWorldNeedsUpdate||!0===a)void 0===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)},
clone:function(a,b){void 0===a&&(a=new THREE.Object3D);void 0===b&&(b=!0);a.name=this.name;a.up.copy(this.up);a.position.copy(this.position);a.rotation instanceof THREE.Vector3&&a.rotation.copy(this.rotation);a.eulerOrder=this.eulerOrder;a.scale.copy(this.scale);a.renderDepth=this.renderDepth;a.rotationAutoUpdate=this.rotationAutoUpdate;a.matrix.copy(this.matrix);a.matrixWorld.copy(this.matrixWorld);a.matrixAutoUpdate=this.matrixAutoUpdate;a.matrixWorldNeedsUpdate=this.matrixWorldNeedsUpdate;a.quaternion.copy(this.quaternion);
a.useQuaternion=this.useQuaternion;a.visible=this.visible;a.castShadow=this.castShadow;a.receiveShadow=this.receiveShadow;a.frustumCulled=this.frustumCulled;a.userData=JSON.parse(JSON.stringify(this.userData));if(!0===b)for(var c=0;c<this.children.length;c++)a.add(this.children[c].clone());return a}};THREE.Object3D.defaultEulerOrder="XYZ";THREE.Projector=function(){function a(){if(i===l){var a=new THREE.RenderableVertex;j.push(a);l++;i++;return a}return j[i++]}function b(a,b){return b.z-a.z}function c(a,b){var c=0,d=1,e=a.z+a.w,f=b.z+b.w,h=-a.z+a.w,g=-b.z+b.w;if(0<=e&&0<=f&&0<=h&&0<=g)return!0;if(0>e&&0>f||0>h&&0>g)return!1;0>e?c=Math.max(c,e/(e-f)):0>f&&(d=Math.min(d,e/(e-f)));0>h?c=Math.max(c,h/(h-g)):0>g&&(d=Math.min(d,h/(h-g)));if(d<c)return!1;a.lerp(b,c);b.lerp(a,1-d);return!0}var d,e,f=[],h=0,g,i,j=[],l=0,n,m,q=[],t=0,p,r=[],
s=0,v,z,G=[],C=0,H,I,F=[],A=0,K={objects:[],sprites:[],lights:[],elements:[]},B=new THREE.Vector3,J=new THREE.Vector4,N=new THREE.Box3(new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1)),y=new THREE.Box3,M=Array(3),w=Array(4),Z=new THREE.Matrix4,L=new THREE.Matrix4,oa,Pa=new THREE.Matrix4,Va=new THREE.Matrix3,O=new THREE.Matrix3,qa=new THREE.Vector3,Fa=new THREE.Frustum,wa=new THREE.Vector4,D=new THREE.Vector4;this.projectVector=function(a,b){b.matrixWorldInverse.getInverse(b.matrixWorld);L.multiplyMatrices(b.projectionMatrix,
b.matrixWorldInverse);return a.applyProjection(L)};this.unprojectVector=function(a,b){b.projectionMatrixInverse.getInverse(b.projectionMatrix);L.multiplyMatrices(b.matrixWorld,b.projectionMatrixInverse);return a.applyProjection(L)};this.pickingRay=function(a,b){a.z=-1;var c=new THREE.Vector3(a.x,a.y,1);this.unprojectVector(a,b);this.unprojectVector(c,b);c.sub(a).normalize();return new THREE.Raycaster(a,c)};var V=function(a){if(e===h){var b=new THREE.RenderableObject;f.push(b);h++;e++;d=b}else d=f[e++];
d.object=a;null!==a.renderDepth?d.z=a.renderDepth:(B.getPositionFromMatrix(a.matrixWorld),B.applyProjection(L),d.z=B.z);return d},ea=function(a){if(!1!==a.visible){a instanceof THREE.Light?K.lights.push(a):a instanceof THREE.Mesh||a instanceof THREE.Line?(!1===a.frustumCulled||!0===Fa.intersectsObject(a))&&K.objects.push(V(a)):(a instanceof THREE.Sprite||a instanceof THREE.Particle)&&K.sprites.push(V(a));for(var b=0,c=a.children.length;b<c;b++)ea(a.children[b])}};this.projectScene=function(d,f,h,
l){var V=!1,B,fa,da,T,aa,la,Y,ma,xa,bb,ia,ha,ra;I=z=p=m=0;K.elements.length=0;!0===d.autoUpdate&&d.updateMatrixWorld();void 0===f.parent&&f.updateMatrixWorld();Z.copy(f.matrixWorldInverse.getInverse(f.matrixWorld));L.multiplyMatrices(f.projectionMatrix,Z);O.getNormalMatrix(Z);Fa.setFromMatrix(L);e=0;K.objects.length=0;K.sprites.length=0;K.lights.length=0;ea(d);!0===h&&K.objects.sort(b);d=0;for(h=K.objects.length;d<h;d++)if(ma=K.objects[d].object,oa=ma.matrixWorld,i=0,ma instanceof THREE.Mesh){xa=
ma.geometry;da=xa.vertices;bb=xa.faces;xa=xa.faceVertexUvs;Va.getNormalMatrix(oa);ha=ma.material instanceof THREE.MeshFaceMaterial;ra=!0===ha?ma.material:null;B=0;for(fa=da.length;B<fa;B++)g=a(),g.positionWorld.copy(da[B]).applyMatrix4(oa),g.positionScreen.copy(g.positionWorld).applyMatrix4(L),g.positionScreen.x/=g.positionScreen.w,g.positionScreen.y/=g.positionScreen.w,g.positionScreen.z/=g.positionScreen.w,g.visible=!(-1>g.positionScreen.x||1<g.positionScreen.x||-1>g.positionScreen.y||1<g.positionScreen.y||
-1>g.positionScreen.z||1<g.positionScreen.z);da=0;for(B=bb.length;da<B;da++){fa=bb[da];var ka=!0===ha?ra.materials[fa.materialIndex]:ma.material;if(void 0!==ka){la=ka.side;if(fa instanceof THREE.Face3)if(T=j[fa.a],aa=j[fa.b],Y=j[fa.c],M[0]=T.positionScreen,M[1]=aa.positionScreen,M[2]=Y.positionScreen,!0===T.visible||!0===aa.visible||!0===Y.visible||N.isIntersectionBox(y.setFromPoints(M)))if(V=0>(Y.positionScreen.x-T.positionScreen.x)*(aa.positionScreen.y-T.positionScreen.y)-(Y.positionScreen.y-T.positionScreen.y)*
(aa.positionScreen.x-T.positionScreen.x),la===THREE.DoubleSide||V===(la===THREE.FrontSide))m===t?(ia=new THREE.RenderableFace3,q.push(ia),t++,m++,n=ia):n=q[m++],n.v1.copy(T),n.v2.copy(aa),n.v3.copy(Y);else continue;else continue;else if(fa instanceof THREE.Face4)if(T=j[fa.a],aa=j[fa.b],Y=j[fa.c],ia=j[fa.d],w[0]=T.positionScreen,w[1]=aa.positionScreen,w[2]=Y.positionScreen,w[3]=ia.positionScreen,!0===T.visible||!0===aa.visible||!0===Y.visible||!0===ia.visible||N.isIntersectionBox(y.setFromPoints(w)))if(V=
0>(ia.positionScreen.x-T.positionScreen.x)*(aa.positionScreen.y-T.positionScreen.y)-(ia.positionScreen.y-T.positionScreen.y)*(aa.positionScreen.x-T.positionScreen.x)||0>(aa.positionScreen.x-Y.positionScreen.x)*(ia.positionScreen.y-Y.positionScreen.y)-(aa.positionScreen.y-Y.positionScreen.y)*(ia.positionScreen.x-Y.positionScreen.x),la===THREE.DoubleSide||V===(la===THREE.FrontSide)){if(p===s){var ua=new THREE.RenderableFace4;r.push(ua);s++;p++;n=ua}else n=r[p++];n.v1.copy(T);n.v2.copy(aa);n.v3.copy(Y);
n.v4.copy(ia)}else continue;else continue;n.normalModel.copy(fa.normal);!1===V&&(la===THREE.BackSide||la===THREE.DoubleSide)&&n.normalModel.negate();n.normalModel.applyMatrix3(Va).normalize();n.normalModelView.copy(n.normalModel).applyMatrix3(O);n.centroidModel.copy(fa.centroid).applyMatrix4(oa);Y=fa.vertexNormals;T=0;for(aa=Y.length;T<aa;T++)ia=n.vertexNormalsModel[T],ia.copy(Y[T]),!1===V&&(la===THREE.BackSide||la===THREE.DoubleSide)&&ia.negate(),ia.applyMatrix3(Va).normalize(),n.vertexNormalsModelView[T].copy(ia).applyMatrix3(O);
n.vertexNormalsLength=Y.length;T=0;for(aa=xa.length;T<aa;T++)if(ia=xa[T][da],void 0!==ia){la=0;for(Y=ia.length;la<Y;la++)n.uvs[T][la]=ia[la]}n.color=fa.color;n.material=ka;qa.copy(n.centroidModel).applyProjection(L);n.z=qa.z;K.elements.push(n)}}}else if(ma instanceof THREE.Line){Pa.multiplyMatrices(L,oa);da=ma.geometry.vertices;T=a();T.positionScreen.copy(da[0]).applyMatrix4(Pa);bb=ma.type===THREE.LinePieces?2:1;B=1;for(fa=da.length;B<fa;B++)T=a(),T.positionScreen.copy(da[B]).applyMatrix4(Pa),0<(B+
1)%bb||(aa=j[i-2],wa.copy(T.positionScreen),D.copy(aa.positionScreen),!0===c(wa,D)&&(wa.multiplyScalar(1/wa.w),D.multiplyScalar(1/D.w),z===C?(xa=new THREE.RenderableLine,G.push(xa),C++,z++,v=xa):v=G[z++],v.v1.positionScreen.copy(wa),v.v2.positionScreen.copy(D),v.z=Math.max(wa.z,D.z),v.material=ma.material,ma.material.vertexColors===THREE.VertexColors&&(v.vertexColors[0].copy(ma.geometry.colors[B]),v.vertexColors[1].copy(ma.geometry.colors[B-1])),K.elements.push(v)))}d=0;for(h=K.sprites.length;d<h;d++)ma=
K.sprites[d].object,oa=ma.matrixWorld,ma instanceof THREE.Particle&&(J.set(oa.elements[12],oa.elements[13],oa.elements[14],1),J.applyMatrix4(L),J.z/=J.w,0<J.z&&1>J.z&&(I===A?(V=new THREE.RenderableParticle,F.push(V),A++,I++,H=V):H=F[I++],H.object=ma,H.x=J.x/J.w,H.y=J.y/J.w,H.z=J.z,H.rotation=ma.rotation.z,H.scale.x=ma.scale.x*Math.abs(H.x-(J.x+f.projectionMatrix.elements[0])/(J.w+f.projectionMatrix.elements[12])),H.scale.y=ma.scale.y*Math.abs(H.y-(J.y+f.projectionMatrix.elements[5])/(J.w+f.projectionMatrix.elements[13])),
H.material=ma.material,K.elements.push(H)));!0===l&&K.elements.sort(b);return K}};THREE.Face3=function(a,b,c,d,e,f){this.a=a;this.b=b;this.c=c;this.normal=d instanceof THREE.Vector3?d:new THREE.Vector3;this.vertexNormals=d instanceof Array?d:[];this.color=e instanceof THREE.Color?e:new THREE.Color;this.vertexColors=e instanceof Array?e:[];this.vertexTangents=[];this.materialIndex=void 0!==f?f:0;this.centroid=new THREE.Vector3};
THREE.Face3.prototype={constructor:THREE.Face3,clone:function(){var a=new THREE.Face3(this.a,this.b,this.c);a.normal.copy(this.normal);a.color.copy(this.color);a.centroid.copy(this.centroid);a.materialIndex=this.materialIndex;var b,c;b=0;for(c=this.vertexNormals.length;b<c;b++)a.vertexNormals[b]=this.vertexNormals[b].clone();b=0;for(c=this.vertexColors.length;b<c;b++)a.vertexColors[b]=this.vertexColors[b].clone();b=0;for(c=this.vertexTangents.length;b<c;b++)a.vertexTangents[b]=this.vertexTangents[b].clone();
return a}};THREE.Face4=function(a,b,c,d,e,f,h){this.a=a;this.b=b;this.c=c;this.d=d;this.normal=e instanceof THREE.Vector3?e:new THREE.Vector3;this.vertexNormals=e instanceof Array?e:[];this.color=f instanceof THREE.Color?f:new THREE.Color;this.vertexColors=f instanceof Array?f:[];this.vertexTangents=[];this.materialIndex=void 0!==h?h:0;this.centroid=new THREE.Vector3};
THREE.Face4.prototype={constructor:THREE.Face4,clone:function(){var a=new THREE.Face4(this.a,this.b,this.c,this.d);a.normal.copy(this.normal);a.color.copy(this.color);a.centroid.copy(this.centroid);a.materialIndex=this.materialIndex;var b,c;b=0;for(c=this.vertexNormals.length;b<c;b++)a.vertexNormals[b]=this.vertexNormals[b].clone();b=0;for(c=this.vertexColors.length;b<c;b++)a.vertexColors[b]=this.vertexColors[b].clone();b=0;for(c=this.vertexTangents.length;b<c;b++)a.vertexTangents[b]=this.vertexTangents[b].clone();
return a}};THREE.Geometry=function(){this.id=THREE.Math.generateUUID();this.name="";this.vertices=[];this.colors=[];this.normals=[];this.faces=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingSphere=this.boundingBox=null;this.hasTangents=!1;this.dynamic=!0;this.buffersNeedUpdate=this.lineDistancesNeedUpdate=this.colorsNeedUpdate=this.tangentsNeedUpdate=this.normalsNeedUpdate=this.uvsNeedUpdate=
this.elementsNeedUpdate=this.verticesNeedUpdate=!1};
THREE.Geometry.prototype={constructor:THREE.Geometry,addEventListener:THREE.EventDispatcher.prototype.addEventListener,hasEventListener:THREE.EventDispatcher.prototype.hasEventListener,removeEventListener:THREE.EventDispatcher.prototype.removeEventListener,dispatchEvent:THREE.EventDispatcher.prototype.dispatchEvent,applyMatrix:function(a){for(var b=(new THREE.Matrix3).getNormalMatrix(a),c=0,d=this.vertices.length;c<d;c++)this.vertices[c].applyMatrix4(a);c=0;for(d=this.faces.length;c<d;c++){var e=
this.faces[c];e.normal.applyMatrix3(b).normalize();for(var f=0,h=e.vertexNormals.length;f<h;f++)e.vertexNormals[f].applyMatrix3(b).normalize();e.centroid.applyMatrix4(a)}this.boundingBox instanceof THREE.Box3&&this.computeBoundingBox();this.boundingSphere instanceof THREE.Sphere&&this.computeBoundingSphere()},computeCentroids:function(){var a,b,c;a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],c.centroid.set(0,0,0),c instanceof THREE.Face3?(c.centroid.add(this.vertices[c.a]),c.centroid.add(this.vertices[c.b]),
c.centroid.add(this.vertices[c.c]),c.centroid.divideScalar(3)):c instanceof THREE.Face4&&(c.centroid.add(this.vertices[c.a]),c.centroid.add(this.vertices[c.b]),c.centroid.add(this.vertices[c.c]),c.centroid.add(this.vertices[c.d]),c.centroid.divideScalar(4))},computeFaceNormals:function(){for(var a=new THREE.Vector3,b=new THREE.Vector3,c=0,d=this.faces.length;c<d;c++){var e=this.faces[c],f=this.vertices[e.a],h=this.vertices[e.b];a.subVectors(this.vertices[e.c],h);b.subVectors(f,h);a.cross(b);a.normalize();
e.normal.copy(a)}},computeVertexNormals:function(a){var b,c,d,e;if(void 0===this.__tmpVertices){e=this.__tmpVertices=Array(this.vertices.length);b=0;for(c=this.vertices.length;b<c;b++)e[b]=new THREE.Vector3;b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?d.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]:d instanceof THREE.Face4&&(d.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3])}else{e=this.__tmpVertices;b=
0;for(c=this.vertices.length;b<c;b++)e[b].set(0,0,0)}if(a){var f,h,g,i=new THREE.Vector3,j=new THREE.Vector3,l=new THREE.Vector3,n=new THREE.Vector3,m=new THREE.Vector3;b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?(a=this.vertices[d.a],f=this.vertices[d.b],h=this.vertices[d.c],i.subVectors(h,f),j.subVectors(a,f),i.cross(j),e[d.a].add(i),e[d.b].add(i),e[d.c].add(i)):d instanceof THREE.Face4&&(a=this.vertices[d.a],f=this.vertices[d.b],h=this.vertices[d.c],g=this.vertices[d.d],
l.subVectors(g,f),j.subVectors(a,f),l.cross(j),e[d.a].add(l),e[d.b].add(l),e[d.d].add(l),n.subVectors(g,h),m.subVectors(f,h),n.cross(m),e[d.b].add(n),e[d.c].add(n),e[d.d].add(n))}else{b=0;for(c=this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?(e[d.a].add(d.normal),e[d.b].add(d.normal),e[d.c].add(d.normal)):d instanceof THREE.Face4&&(e[d.a].add(d.normal),e[d.b].add(d.normal),e[d.c].add(d.normal),e[d.d].add(d.normal))}b=0;for(c=this.vertices.length;b<c;b++)e[b].normalize();b=0;for(c=
this.faces.length;b<c;b++)d=this.faces[b],d instanceof THREE.Face3?(d.vertexNormals[0].copy(e[d.a]),d.vertexNormals[1].copy(e[d.b]),d.vertexNormals[2].copy(e[d.c])):d instanceof THREE.Face4&&(d.vertexNormals[0].copy(e[d.a]),d.vertexNormals[1].copy(e[d.b]),d.vertexNormals[2].copy(e[d.c]),d.vertexNormals[3].copy(e[d.d]))},computeMorphNormals:function(){var a,b,c,d,e;c=0;for(d=this.faces.length;c<d;c++){e=this.faces[c];e.__originalFaceNormal?e.__originalFaceNormal.copy(e.normal):e.__originalFaceNormal=
e.normal.clone();e.__originalVertexNormals||(e.__originalVertexNormals=[]);a=0;for(b=e.vertexNormals.length;a<b;a++)e.__originalVertexNormals[a]?e.__originalVertexNormals[a].copy(e.vertexNormals[a]):e.__originalVertexNormals[a]=e.vertexNormals[a].clone()}var f=new THREE.Geometry;f.faces=this.faces;a=0;for(b=this.morphTargets.length;a<b;a++){if(!this.morphNormals[a]){this.morphNormals[a]={};this.morphNormals[a].faceNormals=[];this.morphNormals[a].vertexNormals=[];var h=this.morphNormals[a].faceNormals,
g=this.morphNormals[a].vertexNormals,i,j;c=0;for(d=this.faces.length;c<d;c++)e=this.faces[c],i=new THREE.Vector3,j=e instanceof THREE.Face3?{a:new THREE.Vector3,b:new THREE.Vector3,c:new THREE.Vector3}:{a:new THREE.Vector3,b:new THREE.Vector3,c:new THREE.Vector3,d:new THREE.Vector3},h.push(i),g.push(j)}h=this.morphNormals[a];f.vertices=this.morphTargets[a].vertices;f.computeFaceNormals();f.computeVertexNormals();c=0;for(d=this.faces.length;c<d;c++)e=this.faces[c],i=h.faceNormals[c],j=h.vertexNormals[c],
i.copy(e.normal),e instanceof THREE.Face3?(j.a.copy(e.vertexNormals[0]),j.b.copy(e.vertexNormals[1]),j.c.copy(e.vertexNormals[2])):(j.a.copy(e.vertexNormals[0]),j.b.copy(e.vertexNormals[1]),j.c.copy(e.vertexNormals[2]),j.d.copy(e.vertexNormals[3]))}c=0;for(d=this.faces.length;c<d;c++)e=this.faces[c],e.normal=e.__originalFaceNormal,e.vertexNormals=e.__originalVertexNormals},computeTangents:function(){function a(a,b,c,d,e,f,y){g=a.vertices[b];i=a.vertices[c];j=a.vertices[d];l=h[e];n=h[f];m=h[y];q=i.x-
g.x;t=j.x-g.x;p=i.y-g.y;r=j.y-g.y;s=i.z-g.z;v=j.z-g.z;z=n.x-l.x;G=m.x-l.x;C=n.y-l.y;H=m.y-l.y;I=1/(z*H-G*C);B.set((H*q-C*t)*I,(H*p-C*r)*I,(H*s-C*v)*I);J.set((z*t-G*q)*I,(z*r-G*p)*I,(z*v-G*s)*I);A[b].add(B);A[c].add(B);A[d].add(B);K[b].add(J);K[c].add(J);K[d].add(J)}var b,c,d,e,f,h,g,i,j,l,n,m,q,t,p,r,s,v,z,G,C,H,I,F,A=[],K=[],B=new THREE.Vector3,J=new THREE.Vector3,N=new THREE.Vector3,y=new THREE.Vector3,M=new THREE.Vector3;b=0;for(c=this.vertices.length;b<c;b++)A[b]=new THREE.Vector3,K[b]=new THREE.Vector3;
b=0;for(c=this.faces.length;b<c;b++)f=this.faces[b],h=this.faceVertexUvs[0][b],f instanceof THREE.Face3?a(this,f.a,f.b,f.c,0,1,2):f instanceof THREE.Face4&&(a(this,f.a,f.b,f.d,0,1,3),a(this,f.b,f.c,f.d,1,2,3));var w=["a","b","c","d"];b=0;for(c=this.faces.length;b<c;b++){f=this.faces[b];for(d=0;d<f.vertexNormals.length;d++)M.copy(f.vertexNormals[d]),e=f[w[d]],F=A[e],N.copy(F),N.sub(M.multiplyScalar(M.dot(F))).normalize(),y.crossVectors(f.vertexNormals[d],F),e=y.dot(K[e]),e=0>e?-1:1,f.vertexTangents[d]=
new THREE.Vector4(N.x,N.y,N.z,e)}this.hasTangents=!0},computeLineDistances:function(){for(var a=0,b=this.vertices,c=0,d=b.length;c<d;c++)0<c&&(a+=b[c].distanceTo(b[c-1])),this.lineDistances[c]=a},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3);this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere);this.boundingSphere.setFromPoints(this.vertices)},mergeVertices:function(){var a=
{},b=[],c=[],d,e=Math.pow(10,4),f,h,g,i,j;this.__tmpVertices=void 0;f=0;for(h=this.vertices.length;f<h;f++)d=this.vertices[f],d=Math.round(d.x*e)+"_"+Math.round(d.y*e)+"_"+Math.round(d.z*e),void 0===a[d]?(a[d]=f,b.push(this.vertices[f]),c[f]=b.length-1):c[f]=c[a[d]];e=[];f=0;for(h=this.faces.length;f<h;f++)if(a=this.faces[f],a instanceof THREE.Face3){a.a=c[a.a];a.b=c[a.b];a.c=c[a.c];g=[a.a,a.b,a.c];d=-1;for(i=0;3>i;i++)if(g[i]==g[(i+1)%3]){e.push(f);break}}else if(a instanceof THREE.Face4){a.a=c[a.a];
a.b=c[a.b];a.c=c[a.c];a.d=c[a.d];g=[a.a,a.b,a.c,a.d];d=-1;for(i=0;4>i;i++)g[i]==g[(i+1)%4]&&(0<=d&&e.push(f),d=i);if(0<=d){g.splice(d,1);var l=new THREE.Face3(g[0],g[1],g[2],a.normal,a.color,a.materialIndex);g=0;for(i=this.faceVertexUvs.length;g<i;g++)(j=this.faceVertexUvs[g][f])&&j.splice(d,1);a.vertexNormals&&0<a.vertexNormals.length&&(l.vertexNormals=a.vertexNormals,l.vertexNormals.splice(d,1));a.vertexColors&&0<a.vertexColors.length&&(l.vertexColors=a.vertexColors,l.vertexColors.splice(d,1));
this.faces[f]=l}}for(f=e.length-1;0<=f;f--){this.faces.splice(f,1);g=0;for(i=this.faceVertexUvs.length;g<i;g++)this.faceVertexUvs[g].splice(f,1)}c=this.vertices.length-b.length;this.vertices=b;return c},clone:function(){for(var a=new THREE.Geometry,b=this.vertices,c=0,d=b.length;c<d;c++)a.vertices.push(b[c].clone());b=this.faces;c=0;for(d=b.length;c<d;c++)a.faces.push(b[c].clone());b=this.faceVertexUvs[0];c=0;for(d=b.length;c<d;c++){for(var e=b[c],f=[],h=0,g=e.length;h<g;h++)f.push(new THREE.Vector2(e[h].x,
e[h].y));a.faceVertexUvs[0].push(f)}return a},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.BufferGeometry=function(){this.id=THREE.Math.generateUUID();this.attributes={};this.dynamic=!1;this.offsets=[];this.boundingSphere=this.boundingBox=null;this.hasTangents=!1;this.morphTargets=[]};
THREE.BufferGeometry.prototype={constructor:THREE.BufferGeometry,addEventListener:THREE.EventDispatcher.prototype.addEventListener,hasEventListener:THREE.EventDispatcher.prototype.hasEventListener,removeEventListener:THREE.EventDispatcher.prototype.removeEventListener,dispatchEvent:THREE.EventDispatcher.prototype.dispatchEvent,applyMatrix:function(a){var b,c;this.attributes.position&&(b=this.attributes.position.array);this.attributes.normal&&(c=this.attributes.normal.array);void 0!==b&&(a.multiplyVector3Array(b),
this.verticesNeedUpdate=!0);void 0!==c&&((new THREE.Matrix3).getNormalMatrix(a).multiplyVector3Array(c),this.normalizeNormals(),this.normalsNeedUpdate=!0)},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new THREE.Box3);var a=this.attributes.position.array;if(a){var b=this.boundingBox,c,d,e;3<=a.length&&(b.min.x=b.max.x=a[0],b.min.y=b.max.y=a[1],b.min.z=b.max.z=a[2]);for(var f=3,h=a.length;f<h;f+=3)c=a[f],d=a[f+1],e=a[f+2],c<b.min.x?b.min.x=c:c>b.max.x&&(b.max.x=c),d<b.min.y?
b.min.y=d:d>b.max.y&&(b.max.y=d),e<b.min.z?b.min.z=e:e>b.max.z&&(b.max.z=e)}if(void 0===a||0===a.length)this.boundingBox.min.set(0,0,0),this.boundingBox.max.set(0,0,0)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new THREE.Sphere);var a=this.attributes.position.array;if(a){for(var b,c=0,d,e,f=0,h=a.length;f<h;f+=3)b=a[f],d=a[f+1],e=a[f+2],b=b*b+d*d+e*e,b>c&&(c=b);this.boundingSphere.radius=Math.sqrt(c)}},computeVertexNormals:function(){if(this.attributes.position){var a,
b,c,d;a=this.attributes.position.array.length;if(void 0===this.attributes.normal)this.attributes.normal={itemSize:3,array:new Float32Array(a)};else{a=0;for(b=this.attributes.normal.array.length;a<b;a++)this.attributes.normal.array[a]=0}var e=this.attributes.position.array,f=this.attributes.normal.array,h,g,i,j,l,n,m=new THREE.Vector3,q=new THREE.Vector3,t=new THREE.Vector3,p=new THREE.Vector3,r=new THREE.Vector3;if(this.attributes.index){var s=this.attributes.index.array,v=this.offsets;c=0;for(d=
v.length;c<d;++c){b=v[c].start;h=v[c].count;var z=v[c].index;a=b;for(b+=h;a<b;a+=3)h=z+s[a],g=z+s[a+1],i=z+s[a+2],j=e[3*h],l=e[3*h+1],n=e[3*h+2],m.set(j,l,n),j=e[3*g],l=e[3*g+1],n=e[3*g+2],q.set(j,l,n),j=e[3*i],l=e[3*i+1],n=e[3*i+2],t.set(j,l,n),p.subVectors(t,q),r.subVectors(m,q),p.cross(r),f[3*h]+=p.x,f[3*h+1]+=p.y,f[3*h+2]+=p.z,f[3*g]+=p.x,f[3*g+1]+=p.y,f[3*g+2]+=p.z,f[3*i]+=p.x,f[3*i+1]+=p.y,f[3*i+2]+=p.z}}else{a=0;for(b=e.length;a<b;a+=9)j=e[a],l=e[a+1],n=e[a+2],m.set(j,l,n),j=e[a+3],l=e[a+4],
n=e[a+5],q.set(j,l,n),j=e[a+6],l=e[a+7],n=e[a+8],t.set(j,l,n),p.subVectors(t,q),r.subVectors(m,q),p.cross(r),f[a]=p.x,f[a+1]=p.y,f[a+2]=p.z,f[a+3]=p.x,f[a+4]=p.y,f[a+5]=p.z,f[a+6]=p.x,f[a+7]=p.y,f[a+8]=p.z}this.normalizeNormals();this.normalsNeedUpdate=!0}},normalizeNormals:function(){for(var a=this.attributes.normal.array,b,c,d,e=0,f=a.length;e<f;e+=3)b=a[e],c=a[e+1],d=a[e+2],b=1/Math.sqrt(b*b+c*c+d*d),a[e]*=b,a[e+1]*=b,a[e+2]*=b},computeTangents:function(){function a(a){Pa.x=d[3*a];Pa.y=d[3*a+1];
Pa.z=d[3*a+2];Va.copy(Pa);qa=g[a];L.copy(qa);L.sub(Pa.multiplyScalar(Pa.dot(qa))).normalize();oa.crossVectors(Va,qa);Fa=oa.dot(i[a]);O=0>Fa?-1:1;h[4*a]=L.x;h[4*a+1]=L.y;h[4*a+2]=L.z;h[4*a+3]=O}if(void 0===this.attributes.index||void 0===this.attributes.position||void 0===this.attributes.normal||void 0===this.attributes.uv)console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");else{var b=this.attributes.index.array,c=this.attributes.position.array,
d=this.attributes.normal.array,e=this.attributes.uv.array,f=c.length/3;void 0===this.attributes.tangent&&(this.attributes.tangent={itemSize:4,array:new Float32Array(4*f)});for(var h=this.attributes.tangent.array,g=[],i=[],j=0;j<f;j++)g[j]=new THREE.Vector3,i[j]=new THREE.Vector3;var l,n,m,q,t,p,r,s,v,z,G,C,H,I,F,f=new THREE.Vector3,j=new THREE.Vector3,A,K,B,J,N,y,M,w=this.offsets;B=0;for(J=w.length;B<J;++B){K=w[B].start;N=w[B].count;var Z=w[B].index;A=K;for(K+=N;A<K;A+=3)N=Z+b[A],y=Z+b[A+1],M=Z+b[A+
2],l=c[3*N],n=c[3*N+1],m=c[3*N+2],q=c[3*y],t=c[3*y+1],p=c[3*y+2],r=c[3*M],s=c[3*M+1],v=c[3*M+2],z=e[2*N],G=e[2*N+1],C=e[2*y],H=e[2*y+1],I=e[2*M],F=e[2*M+1],q-=l,l=r-l,t-=n,n=s-n,p-=m,m=v-m,C-=z,z=I-z,H-=G,G=F-G,F=1/(C*G-z*H),f.set((G*q-H*l)*F,(G*t-H*n)*F,(G*p-H*m)*F),j.set((C*l-z*q)*F,(C*n-z*t)*F,(C*m-z*p)*F),g[N].add(f),g[y].add(f),g[M].add(f),i[N].add(j),i[y].add(j),i[M].add(j)}var L=new THREE.Vector3,oa=new THREE.Vector3,Pa=new THREE.Vector3,Va=new THREE.Vector3,O,qa,Fa;B=0;for(J=w.length;B<J;++B){K=
w[B].start;N=w[B].count;Z=w[B].index;A=K;for(K+=N;A<K;A+=3)N=Z+b[A],y=Z+b[A+1],M=Z+b[A+2],a(N),a(y),a(M)}this.tangentsNeedUpdate=this.hasTangents=!0}},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.Camera=function(){THREE.Object3D.call(this);this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=new THREE.Matrix4;this.projectionMatrixInverse=new THREE.Matrix4};THREE.Camera.prototype=Object.create(THREE.Object3D.prototype);THREE.Camera.prototype.lookAt=function(){var a=new THREE.Matrix4;return function(b){a.lookAt(this.position,b,this.up);!0===this.useQuaternion?this.quaternion.setFromRotationMatrix(a):this.rotation.setEulerFromRotationMatrix(a,this.eulerOrder)}}();THREE.OrthographicCamera=function(a,b,c,d,e,f){THREE.Camera.call(this);this.left=a;this.right=b;this.top=c;this.bottom=d;this.near=void 0!==e?e:0.1;this.far=void 0!==f?f:2E3;this.updateProjectionMatrix()};THREE.OrthographicCamera.prototype=Object.create(THREE.Camera.prototype);THREE.OrthographicCamera.prototype.updateProjectionMatrix=function(){this.projectionMatrix.makeOrthographic(this.left,this.right,this.top,this.bottom,this.near,this.far)};THREE.PerspectiveCamera=function(a,b,c,d){THREE.Camera.call(this);this.fov=void 0!==a?a:50;this.aspect=void 0!==b?b:1;this.near=void 0!==c?c:0.1;this.far=void 0!==d?d:2E3;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype=Object.create(THREE.Camera.prototype);THREE.PerspectiveCamera.prototype.setLens=function(a,b){void 0===b&&(b=24);this.fov=2*THREE.Math.radToDeg(Math.atan(b/(2*a)));this.updateProjectionMatrix()};
THREE.PerspectiveCamera.prototype.setViewOffset=function(a,b,c,d,e,f){this.fullWidth=a;this.fullHeight=b;this.x=c;this.y=d;this.width=e;this.height=f;this.updateProjectionMatrix()};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var a=this.fullWidth/this.fullHeight,b=Math.tan(THREE.Math.degToRad(0.5*this.fov))*this.near,c=-b,d=a*c,a=Math.abs(a*b-d),c=Math.abs(b-c);this.projectionMatrix.makeFrustum(d+this.x*a/this.fullWidth,d+(this.x+this.width)*a/this.fullWidth,b-(this.y+this.height)*c/this.fullHeight,b-this.y*c/this.fullHeight,this.near,this.far)}else this.projectionMatrix.makePerspective(this.fov,this.aspect,this.near,this.far)};THREE.Light=function(a){THREE.Object3D.call(this);this.color=new THREE.Color(a)};THREE.Light.prototype=Object.create(THREE.Object3D.prototype);THREE.Light.prototype.clone=function(a){void 0===a&&(a=new THREE.Light);THREE.Object3D.prototype.clone.call(this,a);a.color.copy(this.color);return a};THREE.AmbientLight=function(a){THREE.Light.call(this,a)};THREE.AmbientLight.prototype=Object.create(THREE.Light.prototype);THREE.AmbientLight.prototype.clone=function(){var a=new THREE.AmbientLight;THREE.Light.prototype.clone.call(this,a);return a};THREE.AreaLight=function(a,b){THREE.Light.call(this,a);this.normal=new THREE.Vector3(0,-1,0);this.right=new THREE.Vector3(1,0,0);this.intensity=void 0!==b?b:1;this.height=this.width=1;this.constantAttenuation=1.5;this.linearAttenuation=0.5;this.quadraticAttenuation=0.1};THREE.AreaLight.prototype=Object.create(THREE.Light.prototype);THREE.DirectionalLight=function(a,b){THREE.Light.call(this,a);this.position.set(0,1,0);this.target=new THREE.Object3D;this.intensity=void 0!==b?b:1;this.onlyShadow=this.castShadow=!1;this.shadowCameraNear=50;this.shadowCameraFar=5E3;this.shadowCameraLeft=-500;this.shadowCameraTop=this.shadowCameraRight=500;this.shadowCameraBottom=-500;this.shadowCameraVisible=!1;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;this.shadowCascade=!1;this.shadowCascadeOffset=new THREE.Vector3(0,
0,-1E3);this.shadowCascadeCount=2;this.shadowCascadeBias=[0,0,0];this.shadowCascadeWidth=[512,512,512];this.shadowCascadeHeight=[512,512,512];this.shadowCascadeNearZ=[-1,0.99,0.998];this.shadowCascadeFarZ=[0.99,0.998,1];this.shadowCascadeArray=[];this.shadowMatrix=this.shadowCamera=this.shadowMapSize=this.shadowMap=null};THREE.DirectionalLight.prototype=Object.create(THREE.Light.prototype);
THREE.DirectionalLight.prototype.clone=function(){var a=new THREE.DirectionalLight;THREE.Light.prototype.clone.call(this,a);a.target=this.target.clone();a.intensity=this.intensity;a.castShadow=this.castShadow;a.onlyShadow=this.onlyShadow;return a};THREE.HemisphereLight=function(a,b,c){THREE.Light.call(this,a);this.position.set(0,100,0);this.groundColor=new THREE.Color(b);this.intensity=void 0!==c?c:1};THREE.HemisphereLight.prototype=Object.create(THREE.Light.prototype);THREE.HemisphereLight.prototype.clone=function(){var a=new THREE.PointLight;THREE.Light.prototype.clone.call(this,a);a.groundColor.copy(this.groundColor);a.intensity=this.intensity;return a};THREE.PointLight=function(a,b,c){THREE.Light.call(this,a);this.intensity=void 0!==b?b:1;this.distance=void 0!==c?c:0};THREE.PointLight.prototype=Object.create(THREE.Light.prototype);THREE.PointLight.prototype.clone=function(){var a=new THREE.PointLight;THREE.Light.prototype.clone.call(this,a);a.intensity=this.intensity;a.distance=this.distance;return a};THREE.SpotLight=function(a,b,c,d,e){THREE.Light.call(this,a);this.position.set(0,1,0);this.target=new THREE.Object3D;this.intensity=void 0!==b?b:1;this.distance=void 0!==c?c:0;this.angle=void 0!==d?d:Math.PI/3;this.exponent=void 0!==e?e:10;this.onlyShadow=this.castShadow=!1;this.shadowCameraNear=50;this.shadowCameraFar=5E3;this.shadowCameraFov=50;this.shadowCameraVisible=!1;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;this.shadowMatrix=this.shadowCamera=this.shadowMapSize=
this.shadowMap=null};THREE.SpotLight.prototype=Object.create(THREE.Light.prototype);THREE.SpotLight.prototype.clone=function(){var a=new THREE.SpotLight;THREE.Light.prototype.clone.call(this,a);a.target=this.target.clone();a.intensity=this.intensity;a.distance=this.distance;a.angle=this.angle;a.exponent=this.exponent;a.castShadow=this.castShadow;a.onlyShadow=this.onlyShadow;return a};THREE.Loader=function(a){this.statusDomElement=(this.showStatus=a)?THREE.Loader.prototype.addStatusElement():null;this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){}};
THREE.Loader.prototype={constructor:THREE.Loader,crossOrigin:"anonymous",addStatusElement:function(){var a=document.createElement("div");a.style.position="absolute";a.style.right="0px";a.style.top="0px";a.style.fontSize="0.8em";a.style.textAlign="left";a.style.background="rgba(0,0,0,0.25)";a.style.color="#fff";a.style.width="120px";a.style.padding="0.5em 0.5em 0.5em 0.5em";a.style.zIndex=1E3;a.innerHTML="Loading ...";return a},updateProgress:function(a){var b="Loaded ",b=a.total?b+((100*a.loaded/
a.total).toFixed(0)+"%"):b+((a.loaded/1E3).toFixed(2)+" KB");this.statusDomElement.innerHTML=b},extractUrlBase:function(a){a=a.split("/");a.pop();return(1>a.length?".":a.join("/"))+"/"},initMaterials:function(a,b){for(var c=[],d=0;d<a.length;++d)c[d]=THREE.Loader.prototype.createMaterial(a[d],b);return c},needsTangents:function(a){for(var b=0,c=a.length;b<c;b++)if(a[b]instanceof THREE.ShaderMaterial)return!0;return!1},createMaterial:function(a,b){function c(a){a=Math.log(a)/Math.LN2;return Math.floor(a)==
a}function d(a){a=Math.log(a)/Math.LN2;return Math.pow(2,Math.round(a))}function e(a,e,f,g,i,j,r){var s=/\.dds$/i.test(f),v=b+"/"+f;if(s){var z=THREE.ImageUtils.loadCompressedTexture(v);a[e]=z}else z=document.createElement("canvas"),a[e]=new THREE.Texture(z);a[e].sourceFile=f;g&&(a[e].repeat.set(g[0],g[1]),1!==g[0]&&(a[e].wrapS=THREE.RepeatWrapping),1!==g[1]&&(a[e].wrapT=THREE.RepeatWrapping));i&&a[e].offset.set(i[0],i[1]);j&&(f={repeat:THREE.RepeatWrapping,mirror:THREE.MirroredRepeatWrapping},void 0!==
f[j[0]]&&(a[e].wrapS=f[j[0]]),void 0!==f[j[1]]&&(a[e].wrapT=f[j[1]]));r&&(a[e].anisotropy=r);if(!s){var G=a[e],a=new Image;a.onload=function(){if(!c(this.width)||!c(this.height)){var a=d(this.width),b=d(this.height);G.image.width=a;G.image.height=b;G.image.getContext("2d").drawImage(this,0,0,a,b)}else G.image=this;G.needsUpdate=!0};a.crossOrigin=h.crossOrigin;a.src=v}}function f(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]}var h=this,g="MeshLambertMaterial",i={color:15658734,opacity:1,map:null,
lightMap:null,normalMap:null,bumpMap:null,wireframe:!1};if(a.shading){var j=a.shading.toLowerCase();"phong"===j?g="MeshPhongMaterial":"basic"===j&&(g="MeshBasicMaterial")}void 0!==a.blending&&void 0!==THREE[a.blending]&&(i.blending=THREE[a.blending]);if(void 0!==a.transparent||1>a.opacity)i.transparent=a.transparent;void 0!==a.depthTest&&(i.depthTest=a.depthTest);void 0!==a.depthWrite&&(i.depthWrite=a.depthWrite);void 0!==a.visible&&(i.visible=a.visible);void 0!==a.flipSided&&(i.side=THREE.BackSide);
void 0!==a.doubleSided&&(i.side=THREE.DoubleSide);void 0!==a.wireframe&&(i.wireframe=a.wireframe);void 0!==a.vertexColors&&("face"===a.vertexColors?i.vertexColors=THREE.FaceColors:a.vertexColors&&(i.vertexColors=THREE.VertexColors));a.colorDiffuse?i.color=f(a.colorDiffuse):a.DbgColor&&(i.color=a.DbgColor);a.colorSpecular&&(i.specular=f(a.colorSpecular));a.colorAmbient&&(i.ambient=f(a.colorAmbient));a.transparency&&(i.opacity=a.transparency);a.specularCoef&&(i.shininess=a.specularCoef);a.mapDiffuse&&
b&&e(i,"map",a.mapDiffuse,a.mapDiffuseRepeat,a.mapDiffuseOffset,a.mapDiffuseWrap,a.mapDiffuseAnisotropy);a.mapLight&&b&&e(i,"lightMap",a.mapLight,a.mapLightRepeat,a.mapLightOffset,a.mapLightWrap,a.mapLightAnisotropy);a.mapBump&&b&&e(i,"bumpMap",a.mapBump,a.mapBumpRepeat,a.mapBumpOffset,a.mapBumpWrap,a.mapBumpAnisotropy);a.mapNormal&&b&&e(i,"normalMap",a.mapNormal,a.mapNormalRepeat,a.mapNormalOffset,a.mapNormalWrap,a.mapNormalAnisotropy);a.mapSpecular&&b&&e(i,"specularMap",a.mapSpecular,a.mapSpecularRepeat,
a.mapSpecularOffset,a.mapSpecularWrap,a.mapSpecularAnisotropy);a.mapBumpScale&&(i.bumpScale=a.mapBumpScale);a.mapNormal?(g=THREE.ShaderLib.normalmap,j=THREE.UniformsUtils.clone(g.uniforms),j.tNormal.value=i.normalMap,a.mapNormalFactor&&j.uNormalScale.value.set(a.mapNormalFactor,a.mapNormalFactor),i.map&&(j.tDiffuse.value=i.map,j.enableDiffuse.value=!0),i.specularMap&&(j.tSpecular.value=i.specularMap,j.enableSpecular.value=!0),i.lightMap&&(j.tAO.value=i.lightMap,j.enableAO.value=!0),j.uDiffuseColor.value.setHex(i.color),
j.uSpecularColor.value.setHex(i.specular),j.uAmbientColor.value.setHex(i.ambient),j.uShininess.value=i.shininess,void 0!==i.opacity&&(j.uOpacity.value=i.opacity),g=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:j,lights:!0,fog:!0}),i.transparent&&(g.transparent=!0)):g=new THREE[g](i);void 0!==a.DbgName&&(g.name=a.DbgName);return g}};THREE.XHRLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.XHRLoader.prototype={constructor:THREE.XHRLoader,load:function(a,b,c,d){var e=this,f=new XMLHttpRequest;void 0!==b&&f.addEventListener("load",function(c){e.manager.itemEnd(a);b(c.target.responseText)},!1);void 0!==c&&f.addEventListener("progress",function(a){c(a)},!1);void 0!==d&&f.addEventListener("error",function(a){d(a)},!1);void 0!==this.crossOrigin&&(f.crossOrigin=this.crossOrigin);f.open("GET",a,!0);f.send(null);e.manager.itemStart(a)},setCrossOrigin:function(a){this.crossOrigin=a}};THREE.ImageLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.ImageLoader.prototype={constructor:THREE.ImageLoader,load:function(a,b,c,d){var e=this,f=document.createElement("img");void 0!==b&&f.addEventListener("load",function(){e.manager.itemEnd(a);b(this)},!1);void 0!==c&&f.addEventListener("progress",function(a){c(a)},!1);void 0!==d&&f.addEventListener("error",function(a){d(a)},!1);void 0!==this.crossOrigin&&(f.crossOrigin=this.crossOrigin);f.src=a;e.manager.itemStart(a)},setCrossOrigin:function(a){this.crossOrigin=a}};THREE.JSONLoader=function(a){THREE.Loader.call(this,a);this.withCredentials=!1};THREE.JSONLoader.prototype=Object.create(THREE.Loader.prototype);THREE.JSONLoader.prototype.load=function(a,b,c){c=c&&"string"===typeof c?c:this.extractUrlBase(a);this.onLoadStart();this.loadAjaxJSON(this,a,b,c)};
THREE.JSONLoader.prototype.loadAjaxJSON=function(a,b,c,d,e){var f=new XMLHttpRequest,h=0;f.onreadystatechange=function(){if(f.readyState===f.DONE)if(200===f.status||0===f.status){if(f.responseText){var g=JSON.parse(f.responseText),g=a.parse(g,d);c(g.geometry,g.materials)}else console.warn("THREE.JSONLoader: ["+b+"] seems to be unreachable or file there is empty");a.onLoadComplete()}else console.error("THREE.JSONLoader: Couldn't load ["+b+"] ["+f.status+"]");else f.readyState===f.LOADING?e&&(0===h&&
(h=f.getResponseHeader("Content-Length")),e({total:h,loaded:f.responseText.length})):f.readyState===f.HEADERS_RECEIVED&&void 0!==e&&(h=f.getResponseHeader("Content-Length"))};f.open("GET",b,!0);f.withCredentials=this.withCredentials;f.send(null)};
THREE.JSONLoader.prototype.parse=function(a,b){var c=new THREE.Geometry,d=void 0!==a.scale?1/a.scale:1,e,f,h,g,i,j,l,n,m,q,t,p,r,s,v,z=a.faces;q=a.vertices;var G=a.normals,C=a.colors,H=0;for(e=0;e<a.uvs.length;e++)a.uvs[e].length&&H++;for(e=0;e<H;e++)c.faceUvs[e]=[],c.faceVertexUvs[e]=[];g=0;for(i=q.length;g<i;)j=new THREE.Vector3,j.x=q[g++]*d,j.y=q[g++]*d,j.z=q[g++]*d,c.vertices.push(j);g=0;for(i=z.length;g<i;){q=z[g++];j=q&1;h=q&2;e=q&4;f=q&8;n=q&16;l=q&32;t=q&64;q&=128;j?(p=new THREE.Face4,p.a=
z[g++],p.b=z[g++],p.c=z[g++],p.d=z[g++],j=4):(p=new THREE.Face3,p.a=z[g++],p.b=z[g++],p.c=z[g++],j=3);h&&(h=z[g++],p.materialIndex=h);h=c.faces.length;if(e)for(e=0;e<H;e++)r=a.uvs[e],m=z[g++],v=r[2*m],m=r[2*m+1],c.faceUvs[e][h]=new THREE.Vector2(v,m);if(f)for(e=0;e<H;e++){r=a.uvs[e];s=[];for(f=0;f<j;f++)m=z[g++],v=r[2*m],m=r[2*m+1],s[f]=new THREE.Vector2(v,m);c.faceVertexUvs[e][h]=s}n&&(n=3*z[g++],f=new THREE.Vector3,f.x=G[n++],f.y=G[n++],f.z=G[n],p.normal=f);if(l)for(e=0;e<j;e++)n=3*z[g++],f=new THREE.Vector3,
f.x=G[n++],f.y=G[n++],f.z=G[n],p.vertexNormals.push(f);t&&(l=z[g++],l=new THREE.Color(C[l]),p.color=l);if(q)for(e=0;e<j;e++)l=z[g++],l=new THREE.Color(C[l]),p.vertexColors.push(l);c.faces.push(p)}if(a.skinWeights){g=0;for(i=a.skinWeights.length;g<i;g+=2)z=a.skinWeights[g],G=a.skinWeights[g+1],c.skinWeights.push(new THREE.Vector4(z,G,0,0))}if(a.skinIndices){g=0;for(i=a.skinIndices.length;g<i;g+=2)z=a.skinIndices[g],G=a.skinIndices[g+1],c.skinIndices.push(new THREE.Vector4(z,G,0,0))}c.bones=a.bones;
c.animation=a.animation;if(void 0!==a.morphTargets){g=0;for(i=a.morphTargets.length;g<i;g++){c.morphTargets[g]={};c.morphTargets[g].name=a.morphTargets[g].name;c.morphTargets[g].vertices=[];C=c.morphTargets[g].vertices;H=a.morphTargets[g].vertices;z=0;for(G=H.length;z<G;z+=3)q=new THREE.Vector3,q.x=H[z]*d,q.y=H[z+1]*d,q.z=H[z+2]*d,C.push(q)}}if(void 0!==a.morphColors){g=0;for(i=a.morphColors.length;g<i;g++){c.morphColors[g]={};c.morphColors[g].name=a.morphColors[g].name;c.morphColors[g].colors=[];
G=c.morphColors[g].colors;C=a.morphColors[g].colors;d=0;for(z=C.length;d<z;d+=3)H=new THREE.Color(16755200),H.setRGB(C[d],C[d+1],C[d+2]),G.push(H)}}c.computeCentroids();c.computeFaceNormals();if(void 0===a.materials)return{geometry:c};d=this.initMaterials(a.materials,b);this.needsTangents(d)&&c.computeTangents();return{geometry:c,materials:d}};THREE.LoadingManager=function(a,b,c){var d=this,e=0,f=0;this.onLoad=a;this.onProgress=b;this.onError=c;this.itemStart=function(){f++};this.itemEnd=function(a){e++;if(void 0!==d.onProgress)d.onProgress(a,e,f);if(e===f&&void 0!==d.onLoad)d.onLoad()}};THREE.DefaultLoadingManager=new THREE.LoadingManager;THREE.GeometryLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};THREE.GeometryLoader.prototype={constructor:THREE.GeometryLoader,load:function(a,b){var c=this,d=new THREE.XHRLoader;d.setCrossOrigin(this.crossOrigin);d.load(a,function(a){b(c.parse(JSON.parse(a)))})},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(){}};THREE.MaterialLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.MaterialLoader.prototype={constructor:THREE.MaterialLoader,load:function(a,b){var c=this,d=new THREE.XHRLoader;d.setCrossOrigin(this.crossOrigin);d.load(a,function(a){b(c.parse(JSON.parse(a)))})},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b;switch(a.type){case "MeshBasicMaterial":b=new THREE.MeshBasicMaterial({color:a.color,opacity:a.opacity,transparent:a.transparent,wireframe:a.wireframe});break;case "MeshLambertMaterial":b=new THREE.MeshLambertMaterial({color:a.color,
ambient:a.ambient,emissive:a.emissive,opacity:a.opacity,transparent:a.transparent,wireframe:a.wireframe});break;case "MeshPhongMaterial":b=new THREE.MeshPhongMaterial({color:a.color,ambient:a.ambient,emissive:a.emissive,specular:a.specular,shininess:a.shininess,opacity:a.opacity,transparent:a.transparent,wireframe:a.wireframe});break;case "MeshNormalMaterial":b=new THREE.MeshNormalMaterial({opacity:a.opacity,transparent:a.transparent,wireframe:a.wireframe});break;case "MeshDepthMaterial":b=new THREE.MeshDepthMaterial({opacity:a.opacity,
transparent:a.transparent,wireframe:a.wireframe})}return b}};THREE.ObjectLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};
THREE.ObjectLoader.prototype={constructor:THREE.ObjectLoader,load:function(a,b){var c=this,d=new THREE.XHRLoader(c.manager);d.setCrossOrigin(this.crossOrigin);d.load(a,function(a){b(c.parse(JSON.parse(a)))})},setCrossOrigin:function(a){this.crossOrigin=a},parse:function(a){var b=this.parseGeometries(a.geometries),c=this.parseMaterials(a.materials);return this.parseObject(a.object,b,c)},parseGeometries:function(a){var b={};if(void 0!==a)for(var c=new THREE.JSONLoader,d=0,e=a.length;d<e;d++){var f,
h=a[d];switch(h.type){case "PlaneGeometry":f=new THREE.PlaneGeometry(h.width,h.height,h.widthSegments,h.heightSegments);break;case "CubeGeometry":f=new THREE.CubeGeometry(h.width,h.height,h.depth,h.widthSegments,h.heightSegments,h.depthSegments);break;case "CylinderGeometry":f=new THREE.CylinderGeometry(h.radiusTop,h.radiusBottom,h.height,h.radiusSegments,h.heightSegments,h.openEnded);break;case "SphereGeometry":f=new THREE.SphereGeometry(h.radius,h.widthSegments,h.heightSegments,h.phiStart,h.phiLength,
h.thetaStart,h.thetaLength);break;case "IcosahedronGeometry":f=new THREE.IcosahedronGeometry(h.radius,h.detail);break;case "TorusGeometry":f=new THREE.TorusGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.arc);break;case "TorusKnotGeometry":f=new THREE.TorusKnotGeometry(h.radius,h.tube,h.radialSegments,h.tubularSegments,h.p,h.q,h.heightScale);break;case "Geometry":f=c.parse(h.data).geometry}void 0!==h.id&&(f.id=h.id);void 0!==h.name&&(f.name=h.name);b[h.id]=f}return b},parseMaterials:function(a){var b=
{};if(void 0!==a)for(var c=new THREE.MaterialLoader,d=0,e=a.length;d<e;d++){var f=a[d],h=c.parse(f);void 0!==f.id&&(h.id=f.id);void 0!==f.name&&(h.name=f.name);b[f.id]=h}return b},parseObject:function(a,b,c){var d;switch(a.type){case "Scene":d=new THREE.Scene;break;case "PerspectiveCamera":d=new THREE.PerspectiveCamera(a.fov,a.aspect,a.near,a.far);d.position.fromArray(a.position);d.rotation.fromArray(a.rotation);break;case "OrthographicCamera":d=new THREE.OrthographicCamera(a.left,a.right,a.top,a.bottom,
a.near,a.far);d.position.fromArray(a.position);d.rotation.fromArray(a.rotation);break;case "AmbientLight":d=new THREE.AmbientLight(a.color);break;case "DirectionalLight":d=new THREE.DirectionalLight(a.color,a.intensity);d.position.fromArray(a.position);break;case "PointLight":d=new THREE.PointLight(a.color,a.intensity,a.distance);d.position.fromArray(a.position);break;case "SpotLight":d=new THREE.SpotLight(a.color,a.intensity,a.distance,a.angle,a.exponent);d.position.fromArray(a.position);break;case "HemisphereLight":d=
new THREE.HemisphereLight(a.color,a.groundColor,a.intensity);d.position.fromArray(a.position);break;case "Mesh":d=new THREE.Mesh(b[a.geometry],c[a.material]);d.position.fromArray(a.position);d.rotation.fromArray(a.rotation);d.scale.fromArray(a.scale);break;default:d=new THREE.Object3D,d.position.fromArray(a.position),d.rotation.fromArray(a.rotation),d.scale.fromArray(a.scale)}void 0!==a.id&&(d.id=a.id);void 0!==a.name&&(d.name=a.name);void 0!==a.visible&&(d.visible=a.visible);void 0!==a.userData&&
(d.userData=a.userData);if(void 0!==a.children)for(var e in a.children)d.add(this.parseObject(a.children[e],b,c));return d}};THREE.SceneLoader=function(){this.onLoadStart=function(){};this.onLoadProgress=function(){};this.onLoadComplete=function(){};this.callbackSync=function(){};this.callbackProgress=function(){};this.geometryHandlers={};this.hierarchyHandlers={};this.addGeometryHandler("ascii",THREE.JSONLoader)};
THREE.SceneLoader.prototype={constructor:THREE.SceneLoader,load:function(a,b){var c=this,d=new THREE.XHRLoader(c.manager);d.setCrossOrigin(this.crossOrigin);d.load(a,function(d){c.parse(JSON.parse(d),b,a)})},setCrossOrigin:function(a){this.crossOrigin=a},addGeometryHandler:function(a,b){this.geometryHandlers[a]={loaderClass:b}},addHierarchyHandler:function(a,b){this.hierarchyHandlers[a]={loaderClass:b}},parse:function(a,b,c){function d(a,b){return"relativeToHTML"==b?a:m+"/"+a}function e(){f(A.scene,
B.objects)}function f(a,b){var c,e,h,i,j,l,m;for(m in b){var r=A.objects[m],s=b[m];if(void 0===r){if(s.type&&s.type in n.hierarchyHandlers){if(void 0===s.loading){e={type:1,url:1,material:1,position:1,rotation:1,scale:1,visible:1,children:1,userData:1,skin:1,morph:1,mirroredLoop:1,duration:1};h={};for(var y in s)y in e||(h[y]=s[y]);t=A.materials[s.material];s.loading=!0;e=n.hierarchyHandlers[s.type].loaderObject;e.options?e.load(d(s.url,B.urlBaseType),g(m,a,t,s)):e.load(d(s.url,B.urlBaseType),g(m,
a,t,s),h)}}else if(void 0!==s.geometry){if(q=A.geometries[s.geometry]){r=!1;t=A.materials[s.material];r=t instanceof THREE.ShaderMaterial;h=s.position;i=s.rotation;j=s.scale;c=s.matrix;l=s.quaternion;s.material||(t=new THREE.MeshFaceMaterial(A.face_materials[s.geometry]));t instanceof THREE.MeshFaceMaterial&&0===t.materials.length&&(t=new THREE.MeshFaceMaterial(A.face_materials[s.geometry]));if(t instanceof THREE.MeshFaceMaterial)for(e=0;e<t.materials.length;e++)r=r||t.materials[e]instanceof THREE.ShaderMaterial;
r&&q.computeTangents();s.skin?r=new THREE.SkinnedMesh(q,t):s.morph?(r=new THREE.MorphAnimMesh(q,t),void 0!==s.duration&&(r.duration=s.duration),void 0!==s.time&&(r.time=s.time),void 0!==s.mirroredLoop&&(r.mirroredLoop=s.mirroredLoop),t.morphNormals&&q.computeMorphNormals()):r=new THREE.Mesh(q,t);r.name=m;c?(r.matrixAutoUpdate=!1,r.matrix.set(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8],c[9],c[10],c[11],c[12],c[13],c[14],c[15])):(r.position.fromArray(h),l?(r.quaternion.fromArray(l),r.useQuaternion=
!0):r.rotation.fromArray(i),r.scale.fromArray(j));r.visible=s.visible;r.castShadow=s.castShadow;r.receiveShadow=s.receiveShadow;a.add(r);A.objects[m]=r}}else"DirectionalLight"===s.type||"PointLight"===s.type||"AmbientLight"===s.type?(z=void 0!==s.color?s.color:16777215,G=void 0!==s.intensity?s.intensity:1,"DirectionalLight"===s.type?(h=s.direction,v=new THREE.DirectionalLight(z,G),v.position.fromArray(h),s.target&&(K.push({object:v,targetName:s.target}),v.target=null)):"PointLight"===s.type?(h=s.position,
e=s.distance,v=new THREE.PointLight(z,G,e),v.position.fromArray(h)):"AmbientLight"===s.type&&(v=new THREE.AmbientLight(z)),a.add(v),v.name=m,A.lights[m]=v,A.objects[m]=v):"PerspectiveCamera"===s.type||"OrthographicCamera"===s.type?(h=s.position,i=s.rotation,l=s.quaternion,"PerspectiveCamera"===s.type?p=new THREE.PerspectiveCamera(s.fov,s.aspect,s.near,s.far):"OrthographicCamera"===s.type&&(p=new THREE.OrthographicCamera(s.left,s.right,s.top,s.bottom,s.near,s.far)),p.name=m,p.position.fromArray(h),
void 0!==l?(p.quaternion.fromArray(l),p.useQuaternion=!0):void 0!==i&&p.rotation.fromArray(i),a.add(p),A.cameras[m]=p,A.objects[m]=p):(h=s.position,i=s.rotation,j=s.scale,l=s.quaternion,r=new THREE.Object3D,r.name=m,r.position.fromArray(h),l?(r.quaternion.fromArray(l),r.useQuaternion=!0):r.rotation.fromArray(i),r.scale.fromArray(j),r.visible=void 0!==s.visible?s.visible:!1,a.add(r),A.objects[m]=r,A.empties[m]=r);if(r){if(void 0!==s.userData)for(var C in s.userData)r.userData[C]=s.userData[C];if(void 0!==
s.groups)for(e=0;e<s.groups.length;e++)h=s.groups[e],void 0===A.groups[h]&&(A.groups[h]=[]),A.groups[h].push(m)}}void 0!==r&&void 0!==s.children&&f(r,s.children)}}function h(a){return function(b,c){b.name=a;A.geometries[a]=b;A.face_materials[a]=c;e();C-=1;n.onLoadComplete();j()}}function g(a,b,c,d){return function(f){var f=f.content?f.content:f.dae?f.scene:f,h=d.rotation,g=d.quaternion,i=d.scale;f.position.fromArray(d.position);g?(f.quaternion.fromArray(g),f.useQuaternion=!0):f.rotation.fromArray(h);
f.scale.fromArray(i);c&&f.traverse(function(a){a.material=c});var l=void 0!==d.visible?d.visible:!0;f.traverse(function(a){a.visible=l});b.add(f);f.name=a;A.objects[a]=f;e();C-=1;n.onLoadComplete();j()}}function i(a){return function(b,c){b.name=a;A.geometries[a]=b;A.face_materials[a]=c}}function j(){n.callbackProgress({totalModels:I,totalTextures:F,loadedModels:I-C,loadedTextures:F-H},A);n.onLoadProgress();if(0===C&&0===H){for(var a=0;a<K.length;a++){var c=K[a],d=A.objects[c.targetName];d?c.object.target=
d:(c.object.target=new THREE.Object3D,A.scene.add(c.object.target));c.object.target.userData.targetInverse=c.object}b(A)}}function l(a,b){b(a);if(void 0!==a.children)for(var c in a.children)l(a.children[c],b)}var n=this,m=THREE.Loader.prototype.extractUrlBase(c),q,t,p,r,s,v,z,G,C,H,I,F,A,K=[],B=a,J;for(J in this.geometryHandlers)a=this.geometryHandlers[J].loaderClass,this.geometryHandlers[J].loaderObject=new a;for(J in this.hierarchyHandlers)a=this.hierarchyHandlers[J].loaderClass,this.hierarchyHandlers[J].loaderObject=
new a;H=C=0;A={scene:new THREE.Scene,geometries:{},face_materials:{},materials:{},textures:{},objects:{},cameras:{},lights:{},fogs:{},empties:{},groups:{}};if(B.transform&&(J=B.transform.position,a=B.transform.rotation,c=B.transform.scale,J&&A.scene.position.fromArray(J),a&&A.scene.rotation.fromArray(a),c&&A.scene.scale.fromArray(c),J||a||c))A.scene.updateMatrix(),A.scene.updateMatrixWorld();J=function(a){return function(){H-=a;j();n.onLoadComplete()}};for(var N in B.fogs)a=B.fogs[N],"linear"===a.type?
r=new THREE.Fog(0,a.near,a.far):"exp2"===a.type&&(r=new THREE.FogExp2(0,a.density)),a=a.color,r.color.setRGB(a[0],a[1],a[2]),A.fogs[N]=r;for(var y in B.geometries)r=B.geometries[y],r.type in this.geometryHandlers&&(C+=1,n.onLoadStart());for(var M in B.objects)l(B.objects[M],function(a){a.type&&a.type in n.hierarchyHandlers&&(C+=1,n.onLoadStart())});I=C;for(y in B.geometries)if(r=B.geometries[y],"cube"===r.type)q=new THREE.CubeGeometry(r.width,r.height,r.depth,r.widthSegments,r.heightSegments,r.depthSegments),
q.name=y,A.geometries[y]=q;else if("plane"===r.type)q=new THREE.PlaneGeometry(r.width,r.height,r.widthSegments,r.heightSegments),q.name=y,A.geometries[y]=q;else if("sphere"===r.type)q=new THREE.SphereGeometry(r.radius,r.widthSegments,r.heightSegments),q.name=y,A.geometries[y]=q;else if("cylinder"===r.type)q=new THREE.CylinderGeometry(r.topRad,r.botRad,r.height,r.radSegs,r.heightSegs),q.name=y,A.geometries[y]=q;else if("torus"===r.type)q=new THREE.TorusGeometry(r.radius,r.tube,r.segmentsR,r.segmentsT),
q.name=y,A.geometries[y]=q;else if("icosahedron"===r.type)q=new THREE.IcosahedronGeometry(r.radius,r.subdivisions),q.name=y,A.geometries[y]=q;else if(r.type in this.geometryHandlers){M={};for(s in r)"type"!==s&&"url"!==s&&(M[s]=r[s]);this.geometryHandlers[r.type].loaderObject.load(d(r.url,B.urlBaseType),h(y),M)}else"embedded"===r.type&&(M=B.embeds[r.id],M.metadata=B.metadata,M&&(M=this.geometryHandlers.ascii.loaderObject.parse(M,""),i(y)(M.geometry,M.materials)));for(var w in B.textures)if(y=B.textures[w],
y.url instanceof Array){H+=y.url.length;for(s=0;s<y.url.length;s++)n.onLoadStart()}else H+=1,n.onLoadStart();F=H;for(w in B.textures){y=B.textures[w];void 0!==y.mapping&&void 0!==THREE[y.mapping]&&(y.mapping=new THREE[y.mapping]);if(y.url instanceof Array){M=y.url.length;r=[];for(s=0;s<M;s++)r[s]=d(y.url[s],B.urlBaseType);s=(s=/\.dds$/i.test(r[0]))?THREE.ImageUtils.loadCompressedTextureCube(r,y.mapping,J(M)):THREE.ImageUtils.loadTextureCube(r,y.mapping,J(M))}else s=/\.dds$/i.test(y.url),M=d(y.url,
B.urlBaseType),r=J(1),s=s?THREE.ImageUtils.loadCompressedTexture(M,y.mapping,r):THREE.ImageUtils.loadTexture(M,y.mapping,r),void 0!==THREE[y.minFilter]&&(s.minFilter=THREE[y.minFilter]),void 0!==THREE[y.magFilter]&&(s.magFilter=THREE[y.magFilter]),y.anisotropy&&(s.anisotropy=y.anisotropy),y.repeat&&(s.repeat.set(y.repeat[0],y.repeat[1]),1!==y.repeat[0]&&(s.wrapS=THREE.RepeatWrapping),1!==y.repeat[1]&&(s.wrapT=THREE.RepeatWrapping)),y.offset&&s.offset.set(y.offset[0],y.offset[1]),y.wrap&&(M={repeat:THREE.RepeatWrapping,
mirror:THREE.MirroredRepeatWrapping},void 0!==M[y.wrap[0]]&&(s.wrapS=M[y.wrap[0]]),void 0!==M[y.wrap[1]]&&(s.wrapT=M[y.wrap[1]]));A.textures[w]=s}var Z,L;for(Z in B.materials){w=B.materials[Z];for(L in w.parameters)"envMap"===L||"map"===L||"lightMap"===L||"bumpMap"===L?w.parameters[L]=A.textures[w.parameters[L]]:"shading"===L?w.parameters[L]="flat"===w.parameters[L]?THREE.FlatShading:THREE.SmoothShading:"side"===L?w.parameters[L]="double"==w.parameters[L]?THREE.DoubleSide:"back"==w.parameters[L]?
THREE.BackSide:THREE.FrontSide:"blending"===L?w.parameters[L]=w.parameters[L]in THREE?THREE[w.parameters[L]]:THREE.NormalBlending:"combine"===L?w.parameters[L]=w.parameters[L]in THREE?THREE[w.parameters[L]]:THREE.MultiplyOperation:"vertexColors"===L?"face"==w.parameters[L]?w.parameters[L]=THREE.FaceColors:w.parameters[L]&&(w.parameters[L]=THREE.VertexColors):"wrapRGB"===L&&(J=w.parameters[L],w.parameters[L]=new THREE.Vector3(J[0],J[1],J[2]));void 0!==w.parameters.opacity&&1>w.parameters.opacity&&
(w.parameters.transparent=!0);w.parameters.normalMap?(J=THREE.ShaderLib.normalmap,y=THREE.UniformsUtils.clone(J.uniforms),s=w.parameters.color,M=w.parameters.specular,r=w.parameters.ambient,N=w.parameters.shininess,y.tNormal.value=A.textures[w.parameters.normalMap],w.parameters.normalScale&&y.uNormalScale.value.set(w.parameters.normalScale[0],w.parameters.normalScale[1]),w.parameters.map&&(y.tDiffuse.value=w.parameters.map,y.enableDiffuse.value=!0),w.parameters.envMap&&(y.tCube.value=w.parameters.envMap,
y.enableReflection.value=!0,y.uReflectivity.value=w.parameters.reflectivity),w.parameters.lightMap&&(y.tAO.value=w.parameters.lightMap,y.enableAO.value=!0),w.parameters.specularMap&&(y.tSpecular.value=A.textures[w.parameters.specularMap],y.enableSpecular.value=!0),w.parameters.displacementMap&&(y.tDisplacement.value=A.textures[w.parameters.displacementMap],y.enableDisplacement.value=!0,y.uDisplacementBias.value=w.parameters.displacementBias,y.uDisplacementScale.value=w.parameters.displacementScale),
y.uDiffuseColor.value.setHex(s),y.uSpecularColor.value.setHex(M),y.uAmbientColor.value.setHex(r),y.uShininess.value=N,w.parameters.opacity&&(y.uOpacity.value=w.parameters.opacity),t=new THREE.ShaderMaterial({fragmentShader:J.fragmentShader,vertexShader:J.vertexShader,uniforms:y,lights:!0,fog:!0})):t=new THREE[w.type](w.parameters);t.name=Z;A.materials[Z]=t}for(Z in B.materials)if(w=B.materials[Z],w.parameters.materials){L=[];for(s=0;s<w.parameters.materials.length;s++)L.push(A.materials[w.parameters.materials[s]]);
A.materials[Z].materials=L}e();A.cameras&&B.defaults.camera&&(A.currentCamera=A.cameras[B.defaults.camera]);A.fogs&&B.defaults.fog&&(A.scene.fog=A.fogs[B.defaults.fog]);n.callbackSync(A);j()}};THREE.TextureLoader=function(a){this.manager=void 0!==a?a:THREE.DefaultLoadingManager};THREE.TextureLoader.prototype={constructor:THREE.TextureLoader,load:function(a,b){var c=new THREE.ImageLoader(this.manager);c.setCrossOrigin(this.crossOrigin);c.load(a,function(a){a=new THREE.Texture(a);a.needsUpdate=!0;void 0!==b&&b(a)})},setCrossOrigin:function(a){this.crossOrigin=a}};THREE.Material=function(){this.id=THREE.Math.generateUUID();this.name="";this.side=THREE.FrontSide;this.opacity=1;this.transparent=!1;this.blending=THREE.NormalBlending;this.blendSrc=THREE.SrcAlphaFactor;this.blendDst=THREE.OneMinusSrcAlphaFactor;this.blendEquation=THREE.AddEquation;this.depthWrite=this.depthTest=!0;this.polygonOffset=!1;this.overdraw=this.alphaTest=this.polygonOffsetUnits=this.polygonOffsetFactor=0;this.needsUpdate=this.visible=!0};
THREE.Material.prototype={constructor:THREE.Material,addEventListener:THREE.EventDispatcher.prototype.addEventListener,hasEventListener:THREE.EventDispatcher.prototype.hasEventListener,removeEventListener:THREE.EventDispatcher.prototype.removeEventListener,dispatchEvent:THREE.EventDispatcher.prototype.dispatchEvent,setValues:function(a){if(void 0!==a)for(var b in a){var c=a[b];if(void 0===c)console.warn("THREE.Material: '"+b+"' parameter is undefined.");else if(b in this){var d=this[b];d instanceof
THREE.Color?d.set(c):d instanceof THREE.Vector3&&c instanceof THREE.Vector3?d.copy(c):this[b]="overdraw"==b?Number(c):c}}},clone:function(a){void 0===a&&(a=new THREE.Material);a.name=this.name;a.side=this.side;a.opacity=this.opacity;a.transparent=this.transparent;a.blending=this.blending;a.blendSrc=this.blendSrc;a.blendDst=this.blendDst;a.blendEquation=this.blendEquation;a.depthTest=this.depthTest;a.depthWrite=this.depthWrite;a.polygonOffset=this.polygonOffset;a.polygonOffsetFactor=this.polygonOffsetFactor;
a.polygonOffsetUnits=this.polygonOffsetUnits;a.alphaTest=this.alphaTest;a.overdraw=this.overdraw;a.visible=this.visible;return a},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.LineBasicMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.linewidth=1;this.linejoin=this.linecap="round";this.vertexColors=!1;this.fog=!0;this.setValues(a)};THREE.LineBasicMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone=function(){var a=new THREE.LineBasicMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.linewidth=this.linewidth;a.linecap=this.linecap;a.linejoin=this.linejoin;a.vertexColors=this.vertexColors;a.fog=this.fog;return a};THREE.LineDashedMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.scale=this.linewidth=1;this.dashSize=3;this.gapSize=1;this.vertexColors=!1;this.fog=!0;this.setValues(a)};THREE.LineDashedMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.LineDashedMaterial.prototype.clone=function(){var a=new THREE.LineDashedMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.linewidth=this.linewidth;a.scale=this.scale;a.dashSize=this.dashSize;a.gapSize=this.gapSize;a.vertexColors=this.vertexColors;a.fog=this.fog;return a};THREE.MeshBasicMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.envMap=this.specularMap=this.lightMap=this.map=null;this.combine=THREE.MultiplyOperation;this.reflectivity=1;this.refractionRatio=0.98;this.fog=!0;this.shading=THREE.SmoothShading;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.vertexColors=THREE.NoColors;this.morphTargets=this.skinning=!1;this.setValues(a)};
THREE.MeshBasicMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone=function(){var a=new THREE.MeshBasicMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;a.lightMap=this.lightMap;a.specularMap=this.specularMap;a.envMap=this.envMap;a.combine=this.combine;a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=
this.wireframeLinejoin;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;return a};THREE.MeshLambertMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.ambient=new THREE.Color(16777215);this.emissive=new THREE.Color(0);this.wrapAround=!1;this.wrapRGB=new THREE.Vector3(1,1,1);this.envMap=this.specularMap=this.lightMap=this.map=null;this.combine=THREE.MultiplyOperation;this.reflectivity=1;this.refractionRatio=0.98;this.fog=!0;this.shading=THREE.SmoothShading;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap=
"round";this.vertexColors=THREE.NoColors;this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)};THREE.MeshLambertMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone=function(){var a=new THREE.MeshLambertMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.ambient.copy(this.ambient);a.emissive.copy(this.emissive);a.wrapAround=this.wrapAround;a.wrapRGB.copy(this.wrapRGB);a.map=this.map;a.lightMap=this.lightMap;a.specularMap=this.specularMap;a.envMap=this.envMap;a.combine=this.combine;a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;a.shading=this.shading;
a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=this.wireframeLinejoin;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;a.morphNormals=this.morphNormals;return a};THREE.MeshPhongMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.ambient=new THREE.Color(16777215);this.emissive=new THREE.Color(0);this.specular=new THREE.Color(1118481);this.shininess=30;this.metal=!1;this.perPixel=!0;this.wrapAround=!1;this.wrapRGB=new THREE.Vector3(1,1,1);this.bumpMap=this.lightMap=this.map=null;this.bumpScale=1;this.normalMap=null;this.normalScale=new THREE.Vector2(1,1);this.envMap=this.specularMap=null;this.combine=THREE.MultiplyOperation;
this.reflectivity=1;this.refractionRatio=0.98;this.fog=!0;this.shading=THREE.SmoothShading;this.wireframe=!1;this.wireframeLinewidth=1;this.wireframeLinejoin=this.wireframeLinecap="round";this.vertexColors=THREE.NoColors;this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)};THREE.MeshPhongMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone=function(){var a=new THREE.MeshPhongMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.ambient.copy(this.ambient);a.emissive.copy(this.emissive);a.specular.copy(this.specular);a.shininess=this.shininess;a.metal=this.metal;a.perPixel=this.perPixel;a.wrapAround=this.wrapAround;a.wrapRGB.copy(this.wrapRGB);a.map=this.map;a.lightMap=this.lightMap;a.bumpMap=this.bumpMap;a.bumpScale=this.bumpScale;a.normalMap=this.normalMap;a.normalScale.copy(this.normalScale);
a.specularMap=this.specularMap;a.envMap=this.envMap;a.combine=this.combine;a.reflectivity=this.reflectivity;a.refractionRatio=this.refractionRatio;a.fog=this.fog;a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.wireframeLinecap=this.wireframeLinecap;a.wireframeLinejoin=this.wireframeLinejoin;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=this.morphTargets;a.morphNormals=this.morphNormals;return a};THREE.MeshDepthMaterial=function(a){THREE.Material.call(this);this.wireframe=!1;this.wireframeLinewidth=1;this.setValues(a)};THREE.MeshDepthMaterial.prototype=Object.create(THREE.Material.prototype);THREE.MeshDepthMaterial.prototype.clone=function(){var a=new THREE.MeshDepthMaterial;THREE.Material.prototype.clone.call(this,a);a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;return a};THREE.MeshNormalMaterial=function(a){THREE.Material.call(this,a);this.shading=THREE.FlatShading;this.wireframe=!1;this.wireframeLinewidth=1;this.morphTargets=!1;this.setValues(a)};THREE.MeshNormalMaterial.prototype=Object.create(THREE.Material.prototype);THREE.MeshNormalMaterial.prototype.clone=function(){var a=new THREE.MeshNormalMaterial;THREE.Material.prototype.clone.call(this,a);a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;return a};THREE.MeshFaceMaterial=function(a){this.materials=a instanceof Array?a:[]};THREE.MeshFaceMaterial.prototype.clone=function(){return new THREE.MeshFaceMaterial(this.materials.slice(0))};THREE.ParticleBasicMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.map=null;this.size=1;this.sizeAttenuation=!0;this.vertexColors=!1;this.fog=!0;this.setValues(a)};THREE.ParticleBasicMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone=function(){var a=new THREE.ParticleBasicMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;a.size=this.size;a.sizeAttenuation=this.sizeAttenuation;a.vertexColors=this.vertexColors;a.fog=this.fog;return a};THREE.ParticleCanvasMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.program=function(){};this.setValues(a)};THREE.ParticleCanvasMaterial.prototype=Object.create(THREE.Material.prototype);THREE.ParticleCanvasMaterial.prototype.clone=function(){var a=new THREE.ParticleCanvasMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.program=this.program;return a};THREE.ShaderMaterial=function(a){THREE.Material.call(this);this.vertexShader=this.fragmentShader="void main() {}";this.uniforms={};this.defines={};this.attributes=null;this.shading=THREE.SmoothShading;this.linewidth=1;this.wireframe=!1;this.wireframeLinewidth=1;this.lights=this.fog=!1;this.vertexColors=THREE.NoColors;this.morphNormals=this.morphTargets=this.skinning=!1;this.setValues(a)};THREE.ShaderMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone=function(){var a=new THREE.ShaderMaterial;THREE.Material.prototype.clone.call(this,a);a.fragmentShader=this.fragmentShader;a.vertexShader=this.vertexShader;a.uniforms=THREE.UniformsUtils.clone(this.uniforms);a.attributes=this.attributes;a.defines=this.defines;a.shading=this.shading;a.wireframe=this.wireframe;a.wireframeLinewidth=this.wireframeLinewidth;a.fog=this.fog;a.lights=this.lights;a.vertexColors=this.vertexColors;a.skinning=this.skinning;a.morphTargets=
this.morphTargets;a.morphNormals=this.morphNormals;return a};THREE.SpriteMaterial=function(a){THREE.Material.call(this);this.color=new THREE.Color(16777215);this.map=new THREE.Texture;this.useScreenCoordinates=!0;this.depthTest=!this.useScreenCoordinates;this.sizeAttenuation=!this.useScreenCoordinates;this.scaleByViewport=!this.sizeAttenuation;this.alignment=THREE.SpriteAlignment.center.clone();this.fog=!1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=new THREE.Vector2(1,1);this.setValues(a);a=a||{};void 0===a.depthTest&&(this.depthTest=!this.useScreenCoordinates);
void 0===a.sizeAttenuation&&(this.sizeAttenuation=!this.useScreenCoordinates);void 0===a.scaleByViewport&&(this.scaleByViewport=!this.sizeAttenuation)};THREE.SpriteMaterial.prototype=Object.create(THREE.Material.prototype);
THREE.SpriteMaterial.prototype.clone=function(){var a=new THREE.SpriteMaterial;THREE.Material.prototype.clone.call(this,a);a.color.copy(this.color);a.map=this.map;a.useScreenCoordinates=this.useScreenCoordinates;a.sizeAttenuation=this.sizeAttenuation;a.scaleByViewport=this.scaleByViewport;a.alignment.copy(this.alignment);a.uvOffset.copy(this.uvOffset);a.uvScale.copy(this.uvScale);a.fog=this.fog;return a};THREE.SpriteAlignment={};THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);
THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1);THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1);THREE.Texture=function(a,b,c,d,e,f,h,g,i){this.id=THREE.Math.generateUUID();this.name="";this.image=a;this.mipmaps=[];this.mapping=void 0!==b?b:new THREE.UVMapping;this.wrapS=void 0!==c?c:THREE.ClampToEdgeWrapping;this.wrapT=void 0!==d?d:THREE.ClampToEdgeWrapping;this.magFilter=void 0!==e?e:THREE.LinearFilter;this.minFilter=void 0!==f?f:THREE.LinearMipMapLinearFilter;this.anisotropy=void 0!==i?i:1;this.format=void 0!==h?h:THREE.RGBAFormat;this.type=void 0!==g?g:THREE.UnsignedByteType;this.offset=
new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.generateMipmaps=!0;this.premultiplyAlpha=!1;this.flipY=!0;this.unpackAlignment=4;this.needsUpdate=!1;this.onUpdate=null};
THREE.Texture.prototype={constructor:THREE.Texture,addEventListener:THREE.EventDispatcher.prototype.addEventListener,hasEventListener:THREE.EventDispatcher.prototype.hasEventListener,removeEventListener:THREE.EventDispatcher.prototype.removeEventListener,dispatchEvent:THREE.EventDispatcher.prototype.dispatchEvent,clone:function(a){void 0===a&&(a=new THREE.Texture);a.image=this.image;a.mipmaps=this.mipmaps.slice(0);a.mapping=this.mapping;a.wrapS=this.wrapS;a.wrapT=this.wrapT;a.magFilter=this.magFilter;
a.minFilter=this.minFilter;a.anisotropy=this.anisotropy;a.format=this.format;a.type=this.type;a.offset.copy(this.offset);a.repeat.copy(this.repeat);a.generateMipmaps=this.generateMipmaps;a.premultiplyAlpha=this.premultiplyAlpha;a.flipY=this.flipY;a.unpackAlignment=this.unpackAlignment;return a},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.CompressedTexture=function(a,b,c,d,e,f,h,g,i,j,l){THREE.Texture.call(this,null,f,h,g,i,j,d,e,l);this.image={width:b,height:c};this.mipmaps=a;this.generateMipmaps=!1};THREE.CompressedTexture.prototype=Object.create(THREE.Texture.prototype);THREE.CompressedTexture.prototype.clone=function(){var a=new THREE.CompressedTexture;THREE.Texture.prototype.clone.call(this,a);return a};THREE.DataTexture=function(a,b,c,d,e,f,h,g,i,j,l){THREE.Texture.call(this,null,f,h,g,i,j,d,e,l);this.image={data:a,width:b,height:c}};THREE.DataTexture.prototype=Object.create(THREE.Texture.prototype);THREE.DataTexture.prototype.clone=function(){var a=new THREE.DataTexture;THREE.Texture.prototype.clone.call(this,a);return a};THREE.Particle=function(a){THREE.Object3D.call(this);this.material=a};THREE.Particle.prototype=Object.create(THREE.Object3D.prototype);THREE.Particle.prototype.clone=function(a){void 0===a&&(a=new THREE.Particle(this.material));THREE.Object3D.prototype.clone.call(this,a);return a};THREE.ParticleSystem=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=void 0!==b?b:new THREE.ParticleBasicMaterial({color:16777215*Math.random()});this.sortParticles=!1;this.geometry&&null===this.geometry.boundingSphere&&this.geometry.computeBoundingSphere();this.frustumCulled=!1};THREE.ParticleSystem.prototype=Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem.prototype.clone=function(a){void 0===a&&(a=new THREE.ParticleSystem(this.geometry,this.material));a.sortParticles=this.sortParticles;THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Line=function(a,b,c){THREE.Object3D.call(this);this.geometry=a;this.material=void 0!==b?b:new THREE.LineBasicMaterial({color:16777215*Math.random()});this.type=void 0!==c?c:THREE.LineStrip;this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere())};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone=function(a){void 0===a&&(a=new THREE.Line(this.geometry,this.material,this.type));THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Mesh=function(a,b){THREE.Object3D.call(this);this.material=this.geometry=null;this.setGeometry(a);this.setMaterial(b)};THREE.Mesh.prototype=Object.create(THREE.Object3D.prototype);THREE.Mesh.prototype.setGeometry=function(a){void 0!==a&&(this.geometry=a,null===this.geometry.boundingSphere&&this.geometry.computeBoundingSphere(),this.updateMorphTargets())};THREE.Mesh.prototype.setMaterial=function(a){this.material=void 0!==a?a:new THREE.MeshBasicMaterial({color:16777215*Math.random(),wireframe:!0})};
THREE.Mesh.prototype.updateMorphTargets=function(){if(0<this.geometry.morphTargets.length){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var a=0,b=this.geometry.morphTargets.length;a<b;a++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[a].name]=a}};
THREE.Mesh.prototype.getMorphTargetIndexByName=function(a){if(void 0!==this.morphTargetDictionary[a])return this.morphTargetDictionary[a];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+a+" does not exist. Returning 0.");return 0};THREE.Mesh.prototype.clone=function(a){void 0===a&&(a=new THREE.Mesh(this.geometry,this.material));THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Bone=function(a){THREE.Object3D.call(this);this.skin=a;this.skinMatrix=new THREE.Matrix4};THREE.Bone.prototype=Object.create(THREE.Object3D.prototype);THREE.Bone.prototype.update=function(a,b){this.matrixAutoUpdate&&(b|=this.updateMatrix());if(b||this.matrixWorldNeedsUpdate)a?this.skinMatrix.multiplyMatrices(a,this.matrix):this.skinMatrix.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,b=!0;var c,d=this.children.length;for(c=0;c<d;c++)this.children[c].update(this.skinMatrix,b)};THREE.SkinnedMesh=function(a,b,c){THREE.Mesh.call(this,a,b);this.useVertexTexture=void 0!==c?c:!0;this.identityMatrix=new THREE.Matrix4;this.bones=[];this.boneMatrices=[];var d,e,f;if(this.geometry&&void 0!==this.geometry.bones){for(a=0;a<this.geometry.bones.length;a++)c=this.geometry.bones[a],d=c.pos,e=c.rotq,f=c.scl,b=this.addBone(),b.name=c.name,b.position.set(d[0],d[1],d[2]),b.quaternion.set(e[0],e[1],e[2],e[3]),b.useQuaternion=!0,void 0!==f?b.scale.set(f[0],f[1],f[2]):b.scale.set(1,1,1);for(a=
0;a<this.bones.length;a++)c=this.geometry.bones[a],b=this.bones[a],-1===c.parent?this.add(b):this.bones[c.parent].add(b);a=this.bones.length;this.useVertexTexture?(this.boneTextureHeight=this.boneTextureWidth=a=256<a?64:64<a?32:16<a?16:8,this.boneMatrices=new Float32Array(4*this.boneTextureWidth*this.boneTextureHeight),this.boneTexture=new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType),this.boneTexture.minFilter=THREE.NearestFilter,
this.boneTexture.magFilter=THREE.NearestFilter,this.boneTexture.generateMipmaps=!1,this.boneTexture.flipY=!1):this.boneMatrices=new Float32Array(16*a);this.pose()}};THREE.SkinnedMesh.prototype=Object.create(THREE.Mesh.prototype);THREE.SkinnedMesh.prototype.addBone=function(a){void 0===a&&(a=new THREE.Bone(this));this.bones.push(a);return a};
THREE.SkinnedMesh.prototype.updateMatrixWorld=function(){var a=new THREE.Matrix4;return function(b){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||b)this.parent?this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1;for(var b=0,c=this.children.length;b<c;b++){var d=this.children[b];d instanceof THREE.Bone?d.update(this.identityMatrix,!1):d.updateMatrixWorld(!0)}if(void 0==this.boneInverses){this.boneInverses=
[];b=0;for(c=this.bones.length;b<c;b++)d=new THREE.Matrix4,d.getInverse(this.bones[b].skinMatrix),this.boneInverses.push(d)}b=0;for(c=this.bones.length;b<c;b++)a.multiplyMatrices(this.bones[b].skinMatrix,this.boneInverses[b]),a.flattenToArrayOffset(this.boneMatrices,16*b);this.useVertexTexture&&(this.boneTexture.needsUpdate=!0)}}();THREE.SkinnedMesh.prototype.pose=function(){this.updateMatrixWorld(!0);this.normalizeSkinWeights()};
THREE.SkinnedMesh.prototype.normalizeSkinWeights=function(){if(this.geometry instanceof THREE.Geometry)for(var a=0;a<this.geometry.skinIndices.length;a++){var b=this.geometry.skinWeights[a],c=1/b.lengthManhattan();Infinity!==c?b.multiplyScalar(c):b.set(1)}};THREE.SkinnedMesh.prototype.clone=function(a){void 0===a&&(a=new THREE.SkinnedMesh(this.geometry,this.material,this.useVertexTexture));THREE.Mesh.prototype.clone.call(this,a);return a};THREE.MorphAnimMesh=function(a,b){THREE.Mesh.call(this,a,b);this.duration=1E3;this.mirroredLoop=!1;this.currentKeyframe=this.lastKeyframe=this.time=0;this.direction=1;this.directionBackwards=!1;this.setFrameRange(0,this.geometry.morphTargets.length-1)};THREE.MorphAnimMesh.prototype=Object.create(THREE.Mesh.prototype);THREE.MorphAnimMesh.prototype.setFrameRange=function(a,b){this.startKeyframe=a;this.endKeyframe=b;this.length=this.endKeyframe-this.startKeyframe+1};
THREE.MorphAnimMesh.prototype.setDirectionForward=function(){this.direction=1;this.directionBackwards=!1};THREE.MorphAnimMesh.prototype.setDirectionBackward=function(){this.direction=-1;this.directionBackwards=!0};
THREE.MorphAnimMesh.prototype.parseAnimations=function(){var a=this.geometry;a.animations||(a.animations={});for(var b,c=a.animations,d=/([a-z]+)(\d+)/,e=0,f=a.morphTargets.length;e<f;e++){var h=a.morphTargets[e].name.match(d);if(h&&1<h.length){h=h[1];c[h]||(c[h]={start:Infinity,end:-Infinity});var g=c[h];e<g.start&&(g.start=e);e>g.end&&(g.end=e);b||(b=h)}}a.firstAnimation=b};
THREE.MorphAnimMesh.prototype.setAnimationLabel=function(a,b,c){this.geometry.animations||(this.geometry.animations={});this.geometry.animations[a]={start:b,end:c}};THREE.MorphAnimMesh.prototype.playAnimation=function(a,b){var c=this.geometry.animations[a];c?(this.setFrameRange(c.start,c.end),this.duration=1E3*((c.end-c.start)/b),this.time=0):console.warn("animation["+a+"] undefined")};
THREE.MorphAnimMesh.prototype.updateAnimation=function(a){var b=this.duration/this.length;this.time+=this.direction*a;if(this.mirroredLoop){if(this.time>this.duration||0>this.time)this.direction*=-1,this.time>this.duration&&(this.time=this.duration,this.directionBackwards=!0),0>this.time&&(this.time=0,this.directionBackwards=!1)}else this.time%=this.duration,0>this.time&&(this.time+=this.duration);a=this.startKeyframe+THREE.Math.clamp(Math.floor(this.time/b),0,this.length-1);a!==this.currentKeyframe&&
(this.morphTargetInfluences[this.lastKeyframe]=0,this.morphTargetInfluences[this.currentKeyframe]=1,this.morphTargetInfluences[a]=0,this.lastKeyframe=this.currentKeyframe,this.currentKeyframe=a);b=this.time%b/b;this.directionBackwards&&(b=1-b);this.morphTargetInfluences[this.currentKeyframe]=b;this.morphTargetInfluences[this.lastKeyframe]=1-b};
THREE.MorphAnimMesh.prototype.clone=function(a){void 0===a&&(a=new THREE.MorphAnimMesh(this.geometry,this.material));a.duration=this.duration;a.mirroredLoop=this.mirroredLoop;a.time=this.time;a.lastKeyframe=this.lastKeyframe;a.currentKeyframe=this.currentKeyframe;a.direction=this.direction;a.directionBackwards=this.directionBackwards;THREE.Mesh.prototype.clone.call(this,a);return a};THREE.Ribbon=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b};THREE.Ribbon.prototype=Object.create(THREE.Object3D.prototype);THREE.Ribbon.prototype.clone=function(a){void 0===a&&(a=new THREE.Ribbon(this.geometry,this.material));THREE.Object3D.prototype.clone.call(this,a);return a};THREE.LOD=function(){THREE.Object3D.call(this);this.objects=[]};THREE.LOD.prototype=Object.create(THREE.Object3D.prototype);THREE.LOD.prototype.addLevel=function(a,b){void 0===b&&(b=0);for(var b=Math.abs(b),c=0;c<this.objects.length&&!(b<this.objects[c].distance);c++);this.objects.splice(c,0,{distance:b,object:a});this.add(a)};THREE.LOD.prototype.getObjectForDistance=function(a){for(var b=1,c=this.objects.length;b<c&&!(a<this.objects[b].distance);b++);return this.objects[b-1].object};
THREE.LOD.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Vector3;return function(c){if(1<this.objects.length){a.getPositionFromMatrix(c.matrixWorld);b.getPositionFromMatrix(this.matrixWorld);c=a.distanceTo(b);this.objects[0].object.visible=!0;for(var d=1,e=this.objects.length;d<e;d++)if(c>=this.objects[d].distance)this.objects[d-1].object.visible=!1,this.objects[d].object.visible=!0;else break;for(;d<e;d++)this.objects[d].object.visible=!1}}}();THREE.LOD.prototype.clone=function(){};THREE.Sprite=function(a){THREE.Object3D.call(this);this.material=void 0!==a?a:new THREE.SpriteMaterial;this.rotation3d=this.rotation;this.rotation=0};THREE.Sprite.prototype=Object.create(THREE.Object3D.prototype);THREE.Sprite.prototype.updateMatrix=function(){this.rotation3d.set(0,0,this.rotation);this.quaternion.setFromEuler(this.rotation3d,this.eulerOrder);this.matrix.makeFromPositionQuaternionScale(this.position,this.quaternion,this.scale);this.matrixWorldNeedsUpdate=!0};
THREE.Sprite.prototype.clone=function(a){void 0===a&&(a=new THREE.Sprite(this.material));THREE.Object3D.prototype.clone.call(this,a);return a};THREE.Scene=function(){THREE.Object3D.call(this);this.overrideMaterial=this.fog=null;this.autoUpdate=!0;this.matrixAutoUpdate=!1;this.__objects=[];this.__lights=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject=function(a){if(a instanceof THREE.Light)-1===this.__lights.indexOf(a)&&this.__lights.push(a),a.target&&void 0===a.target.parent&&this.add(a.target);else if(!(a instanceof THREE.Camera||a instanceof THREE.Bone)&&-1===this.__objects.indexOf(a)){this.__objects.push(a);this.__objectsAdded.push(a);var b=this.__objectsRemoved.indexOf(a);-1!==b&&this.__objectsRemoved.splice(b,1)}for(b=0;b<a.children.length;b++)this.__addObject(a.children[b])};
THREE.Scene.prototype.__removeObject=function(a){if(a instanceof THREE.Light){var b=this.__lights.indexOf(a);-1!==b&&this.__lights.splice(b,1)}else a instanceof THREE.Camera||(b=this.__objects.indexOf(a),-1!==b&&(this.__objects.splice(b,1),this.__objectsRemoved.push(a),b=this.__objectsAdded.indexOf(a),-1!==b&&this.__objectsAdded.splice(b,1)));for(b=0;b<a.children.length;b++)this.__removeObject(a.children[b])};
THREE.Scene.prototype.clone=function(a){void 0===a&&(a=new THREE.Scene);THREE.Object3D.prototype.clone.call(this,a);null!==this.fog&&(a.fog=this.fog.clone());null!==this.overrideMaterial&&(a.overrideMaterial=this.overrideMaterial.clone());a.autoUpdate=this.autoUpdate;a.matrixAutoUpdate=this.matrixAutoUpdate;return a};THREE.Fog=function(a,b,c){this.name="";this.color=new THREE.Color(a);this.near=void 0!==b?b:1;this.far=void 0!==c?c:1E3};THREE.Fog.prototype.clone=function(){return new THREE.Fog(this.color.getHex(),this.near,this.far)};THREE.FogExp2=function(a,b){this.name="";this.color=new THREE.Color(a);this.density=void 0!==b?b:2.5E-4};THREE.FogExp2.prototype.clone=function(){return new THREE.FogExp2(this.color.getHex(),this.density)};THREE.CanvasRenderer=function(a){function b(a,b,c){for(var d=0,e=I.length;d<e;d++){var f=I[d];Xb.copy(f.color);if(f instanceof THREE.DirectionalLight){var h=Xa.getPositionFromMatrix(f.matrixWorld).normalize(),g=b.dot(h);0>=g||(g*=f.intensity,c.add(Xb.multiplyScalar(g)))}else f instanceof THREE.PointLight&&(h=Xa.getPositionFromMatrix(f.matrixWorld),g=b.dot(Xa.subVectors(h,a).normalize()),0>=g||(g*=0==f.distance?1:1-Math.min(a.distanceTo(h)/f.distance,1),0!=g&&(g*=f.intensity,c.add(Xb.multiplyScalar(g)))))}}
function c(a,c,e,l,q,r,U,p){G.info.render.vertices+=3;G.info.render.faces++;n(p.opacity);m(p.blending);ya=a.positionScreen.x;Ha=a.positionScreen.y;fa=c.positionScreen.x;da=c.positionScreen.y;T=e.positionScreen.x;aa=e.positionScreen.y;d(ya,Ha,fa,da,T,aa);(p instanceof THREE.MeshLambertMaterial||p instanceof THREE.MeshPhongMaterial)&&null===p.map?(Qa.copy(p.color),Ya.copy(p.emissive),p.vertexColors===THREE.FaceColors&&Qa.multiply(U.color),!1===p.wireframe&&p.shading==THREE.SmoothShading&&3==U.vertexNormalsLength?
(ra.copy(ib),ka.copy(ib),ua.copy(ib),b(U.v1.positionWorld,U.vertexNormalsModel[0],ra),b(U.v2.positionWorld,U.vertexNormalsModel[1],ka),b(U.v3.positionWorld,U.vertexNormalsModel[2],ua),ra.multiply(Qa).add(Ya),ka.multiply(Qa).add(Ya),ua.multiply(Qa).add(Ya),Ra.addColors(ka,ua).multiplyScalar(0.5),lb=j(ra,ka,ua,Ra),i(ya,Ha,fa,da,T,aa,0,0,1,0,0,1,lb)):(ha.copy(ib),b(U.centroidModel,U.normalModel,ha),ha.multiply(Qa).add(Ya),!0===p.wireframe?f(ha,p.wireframeLinewidth,p.wireframeLinecap,p.wireframeLinejoin):
h(ha))):p instanceof THREE.MeshBasicMaterial||p instanceof THREE.MeshLambertMaterial||p instanceof THREE.MeshPhongMaterial?null!==p.map?p.map.mapping instanceof THREE.UVMapping&&(Ga=U.uvs[0],g(ya,Ha,fa,da,T,aa,Ga[l].x,Ga[l].y,Ga[q].x,Ga[q].y,Ga[r].x,Ga[r].y,p.map)):null!==p.envMap?p.envMap.mapping instanceof THREE.SphericalReflectionMapping&&(Xa.copy(U.vertexNormalsModelView[l]),Ca=0.5*Xa.x+0.5,yb=0.5*Xa.y+0.5,Xa.copy(U.vertexNormalsModelView[q]),Ib=0.5*Xa.x+0.5,k=0.5*Xa.y+0.5,Xa.copy(U.vertexNormalsModelView[r]),
Rb=0.5*Xa.x+0.5,Yb=0.5*Xa.y+0.5,g(ya,Ha,fa,da,T,aa,Ca,yb,Ib,k,Rb,Yb,p.envMap)):(ha.copy(p.color),p.vertexColors===THREE.FaceColors&&ha.multiply(U.color),!0===p.wireframe?f(ha,p.wireframeLinewidth,p.wireframeLinecap,p.wireframeLinejoin):h(ha)):p instanceof THREE.MeshDepthMaterial?(Sa=D.near,xb=D.far,ra.r=ra.g=ra.b=1-z(a.positionScreen.z*a.positionScreen.w,Sa,xb),ka.r=ka.g=ka.b=1-z(c.positionScreen.z*c.positionScreen.w,Sa,xb),ua.r=ua.g=ua.b=1-z(e.positionScreen.z*e.positionScreen.w,Sa,xb),Ra.addColors(ka,
ua).multiplyScalar(0.5),lb=j(ra,ka,ua,Ra),i(ya,Ha,fa,da,T,aa,0,0,1,0,0,1,lb)):p instanceof THREE.MeshNormalMaterial&&(p.shading==THREE.FlatShading?(a=U.normalModelView,ha.setRGB(a.x,a.y,a.z).multiplyScalar(0.5).addScalar(0.5),!0===p.wireframe?f(ha,p.wireframeLinewidth,p.wireframeLinecap,p.wireframeLinejoin):h(ha)):p.shading==THREE.SmoothShading&&(a=U.vertexNormalsModelView[l],ra.setRGB(a.x,a.y,a.z).multiplyScalar(0.5).addScalar(0.5),a=U.vertexNormalsModelView[q],ka.setRGB(a.x,a.y,a.z).multiplyScalar(0.5).addScalar(0.5),
a=U.vertexNormalsModelView[r],ua.setRGB(a.x,a.y,a.z).multiplyScalar(0.5).addScalar(0.5),Ra.addColors(ka,ua).multiplyScalar(0.5),lb=j(ra,ka,ua,Ra),i(ya,Ha,fa,da,T,aa,0,0,1,0,0,1,lb)))}function d(a,b,c,d,e,f){y.beginPath();y.moveTo(a,b);y.lineTo(c,d);y.lineTo(e,f);y.closePath()}function e(a,b,c,d,e,f,h,g){y.beginPath();y.moveTo(a,b);y.lineTo(c,d);y.lineTo(e,f);y.lineTo(h,g);y.closePath()}function f(a,b,c,d){q(b);t(c);p(d);r(a.getStyle());y.stroke();va.expandByScalar(2*b)}function h(a){s(a.getStyle());
y.fill()}function g(a,b,c,d,e,f,g,k,i,j,n,l,m){if(!(m instanceof THREE.DataTexture||void 0===m.image||0==m.image.width)){if(!0===m.needsUpdate){var p=m.wrapS==THREE.RepeatWrapping,q=m.wrapT==THREE.RepeatWrapping;Jb[m.id]=y.createPattern(m.image,!0===p&&!0===q?"repeat":!0===p&&!1===q?"repeat-x":!1===p&&!0===q?"repeat-y":"no-repeat");m.needsUpdate=!1}void 0===Jb[m.id]?s("rgba(0,0,0,1)"):s(Jb[m.id]);var p=m.offset.x/m.repeat.x,q=m.offset.y/m.repeat.y,r=m.image.width*m.repeat.x,t=m.image.height*m.repeat.y,
g=(g+p)*r,k=(1-k+q)*t,c=c-a,d=d-b,e=e-a,f=f-b,i=(i+p)*r-g,j=(1-j+q)*t-k,n=(n+p)*r-g,l=(1-l+q)*t-k,p=i*l-n*j;0===p?(void 0===Ab[m.id]&&(b=document.createElement("canvas"),b.width=m.image.width,b.height=m.image.height,b=b.getContext("2d"),b.drawImage(m.image,0,0),Ab[m.id]=b.getImageData(0,0,m.image.width,m.image.height).data),b=Ab[m.id],g=4*(Math.floor(g)+Math.floor(k)*m.image.width),ha.setRGB(b[g]/255,b[g+1]/255,b[g+2]/255),h(ha)):(p=1/p,m=(l*c-j*e)*p,j=(l*d-j*f)*p,c=(i*e-n*c)*p,d=(i*f-n*d)*p,a=a-
m*g-c*k,g=b-j*g-d*k,y.save(),y.transform(m,j,c,d,a,g),y.fill(),y.restore())}}function i(a,b,c,d,e,f,h,g,k,i,j,n,l){var m,p;m=l.width-1;p=l.height-1;h*=m;g*=p;c-=a;d-=b;e-=a;f-=b;k=k*m-h;i=i*p-g;j=j*m-h;n=n*p-g;p=1/(k*n-j*i);m=(n*c-i*e)*p;i=(n*d-i*f)*p;c=(k*e-j*c)*p;d=(k*f-j*d)*p;a=a-m*h-c*g;b=b-i*h-d*g;y.save();y.transform(m,i,c,d,a,b);y.clip();y.drawImage(l,0,0);y.restore()}function j(a,b,c,d){Ka[0]=255*a.r|0;Ka[1]=255*a.g|0;Ka[2]=255*a.b|0;Ka[4]=255*b.r|0;Ka[5]=255*b.g|0;Ka[6]=255*b.b|0;Ka[8]=255*
c.r|0;Ka[9]=255*c.g|0;Ka[10]=255*c.b|0;Ka[12]=255*d.r|0;Ka[13]=255*d.g|0;Ka[14]=255*d.b|0;Bb.putImageData(Kb,0,0);Lb.drawImage(Gb,0,0);return Sb}function l(a,b,c){var d=b.x-a.x,e=b.y-a.y,f=d*d+e*e;0!==f&&(c/=Math.sqrt(f),d*=c,e*=c,b.x+=d,b.y+=e,a.x-=d,a.y-=e)}function n(a){Z!==a&&(Z=y.globalAlpha=a)}function m(a){L!==a&&(a===THREE.NormalBlending?y.globalCompositeOperation="source-over":a===THREE.AdditiveBlending?y.globalCompositeOperation="lighter":a===THREE.SubtractiveBlending&&(y.globalCompositeOperation=
"darker"),L=a)}function q(a){Va!==a&&(Va=y.lineWidth=a)}function t(a){O!==a&&(O=y.lineCap=a)}function p(a){qa!==a&&(qa=y.lineJoin=a)}function r(a){oa!==a&&(oa=y.strokeStyle=a)}function s(a){Pa!==a&&(Pa=y.fillStyle=a)}function v(a,b){if(Fa!==a||wa!==b)y.setLineDash([a,b]),Fa=a,wa=b}console.log("THREE.CanvasRenderer",THREE.REVISION);var z=THREE.Math.smoothstep,a=a||{},G=this,C,H,I,F=new THREE.Projector,A=void 0!==a.canvas?a.canvas:document.createElement("canvas"),K,B,J,N,y=A.getContext("2d"),M=new THREE.Color(0),
w=0,Z=1,L=0,oa=null,Pa=null,Va=null,O=null,qa=null,Fa=null,wa=0,D,V,ea,pa,Ua,pb=new THREE.RenderableVertex,ub=new THREE.RenderableVertex,ya,Ha,fa,da,T,aa,la,Y,ma,xa,bb,ia,ha=new THREE.Color,ra=new THREE.Color,ka=new THREE.Color,ua=new THREE.Color,Ra=new THREE.Color,Qa=new THREE.Color,Ya=new THREE.Color,Xb=new THREE.Color,Jb={},Ab={},Sa,xb,lb,Ga,Ca,yb,Ib,k,Rb,Yb,fb=new THREE.Box2,na=new THREE.Box2,va=new THREE.Box2,ib=new THREE.Color,Tb=new THREE.Color,Ub=new THREE.Color,Xa=new THREE.Vector3,Gb,Bb,
Kb,Ka,Sb,Lb,Hb=16;Gb=document.createElement("canvas");Gb.width=Gb.height=2;Bb=Gb.getContext("2d");Bb.fillStyle="rgba(0,0,0,1)";Bb.fillRect(0,0,2,2);Kb=Bb.getImageData(0,0,2,2);Ka=Kb.data;Sb=document.createElement("canvas");Sb.width=Sb.height=Hb;Lb=Sb.getContext("2d");Lb.translate(-Hb/2,-Hb/2);Lb.scale(Hb,Hb);Hb--;void 0===y.setLineDash&&(y.setLineDash=void 0!==y.mozDash?function(a){y.mozDash=null!==a[0]?a:null}:function(){});this.domElement=A;this.devicePixelRatio=void 0!==a.devicePixelRatio?a.devicePixelRatio:
void 0!==window.devicePixelRatio?window.devicePixelRatio:1;this.sortElements=this.sortObjects=this.autoClear=!0;this.info={render:{vertices:0,faces:0}};this.supportsVertexTextures=function(){};this.setFaceCulling=function(){};this.setSize=function(a,b,c){K=a*this.devicePixelRatio;B=b*this.devicePixelRatio;J=Math.floor(K/2);N=Math.floor(B/2);A.width=K;A.height=B;1!==this.devicePixelRatio&&!1!==c&&(A.style.width=a+"px",A.style.height=b+"px");fb.set(new THREE.Vector2(-J,-N),new THREE.Vector2(J,N));na.set(new THREE.Vector2(-J,
-N),new THREE.Vector2(J,N));Z=1;L=0;qa=O=Va=Pa=oa=null};this.setClearColor=function(a,b){M.set(a);w=void 0!==b?b:1;na.set(new THREE.Vector2(-J,-N),new THREE.Vector2(J,N))};this.setClearColorHex=function(a,b){console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead.");this.setClearColor(a,b)};this.getMaxAnisotropy=function(){return 0};this.clear=function(){y.setTransform(1,0,0,-1,J,N);!1===na.empty()&&(na.intersect(fb),na.expandByScalar(2),1>w&&y.clearRect(na.min.x|
0,na.min.y|0,na.max.x-na.min.x|0,na.max.y-na.min.y|0),0<w&&(m(THREE.NormalBlending),n(1),s("rgba("+Math.floor(255*M.r)+","+Math.floor(255*M.g)+","+Math.floor(255*M.b)+","+w+")"),y.fillRect(na.min.x|0,na.min.y|0,na.max.x-na.min.x|0,na.max.y-na.min.y|0)),na.makeEmpty())};this.render=function(a,g){if(!1===g instanceof THREE.Camera)console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");else{!0===this.autoClear&&this.clear();y.setTransform(1,0,0,-1,J,N);G.info.render.vertices=
0;G.info.render.faces=0;C=F.projectScene(a,g,this.sortObjects,this.sortElements);H=C.elements;I=C.lights;D=g;ib.setRGB(0,0,0);Tb.setRGB(0,0,0);Ub.setRGB(0,0,0);for(var k=0,A=I.length;k<A;k++){var w=I[k],B=w.color;w instanceof THREE.AmbientLight?ib.add(B):w instanceof THREE.DirectionalLight?Tb.add(B):w instanceof THREE.PointLight&&Ub.add(B)}k=0;for(A=H.length;k<A;k++){var U=H[k],w=U.material;if(!(void 0===w||!1===w.visible)){va.makeEmpty();if(U instanceof THREE.RenderableParticle){V=U;V.x*=J;V.y*=
N;B=V;n(w.opacity);m(w.blending);var mb=void 0,nb=void 0,vb=void 0,zb=void 0,Zb=void 0,Jc=void 0,Kc=void 0;w instanceof THREE.ParticleBasicMaterial?null===w.map?(vb=U.object.scale.x,zb=U.object.scale.y,vb*=U.scale.x*J,zb*=U.scale.y*N,va.min.set(B.x-vb,B.y-zb),va.max.set(B.x+vb,B.y+zb),!1===fb.isIntersectionBox(va)?va.makeEmpty():(s(w.color.getStyle()),y.save(),y.translate(B.x,B.y),y.rotate(-U.rotation),y.scale(vb,zb),y.fillRect(-1,-1,2,2),y.restore())):(Zb=w.map.image,Jc=Zb.width>>1,Kc=Zb.height>>
1,vb=U.scale.x*J,zb=U.scale.y*N,mb=vb*Jc,nb=zb*Kc,va.min.set(B.x-mb,B.y-nb),va.max.set(B.x+mb,B.y+nb),!1===fb.isIntersectionBox(va)?va.makeEmpty():(y.save(),y.translate(B.x,B.y),y.rotate(-U.rotation),y.scale(vb,-zb),y.translate(-Jc,-Kc),y.drawImage(Zb,0,0),y.restore())):w instanceof THREE.ParticleCanvasMaterial&&(mb=U.scale.x*J,nb=U.scale.y*N,va.min.set(B.x-mb,B.y-nb),va.max.set(B.x+mb,B.y+nb),!1===fb.isIntersectionBox(va)?va.makeEmpty():(r(w.color.getStyle()),s(w.color.getStyle()),y.save(),y.translate(B.x,
B.y),y.rotate(-U.rotation),y.scale(mb,nb),w.program(y),y.restore()))}else if(U instanceof THREE.RenderableLine){if(V=U.v1,ea=U.v2,V.positionScreen.x*=J,V.positionScreen.y*=N,ea.positionScreen.x*=J,ea.positionScreen.y*=N,va.setFromPoints([V.positionScreen,ea.positionScreen]),!0===fb.isIntersectionBox(va))if(B=V,mb=ea,n(w.opacity),m(w.blending),y.beginPath(),y.moveTo(B.positionScreen.x,B.positionScreen.y),y.lineTo(mb.positionScreen.x,mb.positionScreen.y),w instanceof THREE.LineBasicMaterial){q(w.linewidth);
t(w.linecap);p(w.linejoin);if(w.vertexColors!==THREE.VertexColors)r(w.color.getStyle());else if(nb=U.vertexColors[0].getStyle(),U=U.vertexColors[1].getStyle(),nb===U)r(nb);else{try{var wc=y.createLinearGradient(B.positionScreen.x,B.positionScreen.y,mb.positionScreen.x,mb.positionScreen.y);wc.addColorStop(0,nb);wc.addColorStop(1,U)}catch(fd){wc=nb}r(wc)}y.stroke();va.expandByScalar(2*w.linewidth)}else w instanceof THREE.LineDashedMaterial&&(q(w.linewidth),t(w.linecap),p(w.linejoin),r(w.color.getStyle()),
v(w.dashSize,w.gapSize),y.stroke(),va.expandByScalar(2*w.linewidth),v(null,null))}else if(U instanceof THREE.RenderableFace3){V=U.v1;ea=U.v2;pa=U.v3;if(-1>V.positionScreen.z||1<V.positionScreen.z)continue;if(-1>ea.positionScreen.z||1<ea.positionScreen.z)continue;if(-1>pa.positionScreen.z||1<pa.positionScreen.z)continue;V.positionScreen.x*=J;V.positionScreen.y*=N;ea.positionScreen.x*=J;ea.positionScreen.y*=N;pa.positionScreen.x*=J;pa.positionScreen.y*=N;0<w.overdraw&&(l(V.positionScreen,ea.positionScreen,
w.overdraw),l(ea.positionScreen,pa.positionScreen,w.overdraw),l(pa.positionScreen,V.positionScreen,w.overdraw));va.setFromPoints([V.positionScreen,ea.positionScreen,pa.positionScreen]);!0===fb.isIntersectionBox(va)&&c(V,ea,pa,0,1,2,U,w)}else if(U instanceof THREE.RenderableFace4){V=U.v1;ea=U.v2;pa=U.v3;Ua=U.v4;if(-1>V.positionScreen.z||1<V.positionScreen.z)continue;if(-1>ea.positionScreen.z||1<ea.positionScreen.z)continue;if(-1>pa.positionScreen.z||1<pa.positionScreen.z)continue;if(-1>Ua.positionScreen.z||
1<Ua.positionScreen.z)continue;V.positionScreen.x*=J;V.positionScreen.y*=N;ea.positionScreen.x*=J;ea.positionScreen.y*=N;pa.positionScreen.x*=J;pa.positionScreen.y*=N;Ua.positionScreen.x*=J;Ua.positionScreen.y*=N;pb.positionScreen.copy(ea.positionScreen);ub.positionScreen.copy(Ua.positionScreen);0<w.overdraw&&(l(V.positionScreen,ea.positionScreen,w.overdraw),l(ea.positionScreen,Ua.positionScreen,w.overdraw),l(Ua.positionScreen,V.positionScreen,w.overdraw),l(pa.positionScreen,pb.positionScreen,w.overdraw),
l(pa.positionScreen,ub.positionScreen,w.overdraw));va.setFromPoints([V.positionScreen,ea.positionScreen,pa.positionScreen,Ua.positionScreen]);!0===fb.isIntersectionBox(va)&&(B=V,mb=ea,nb=pa,vb=Ua,zb=pb,Zb=ub,G.info.render.vertices+=4,G.info.render.faces++,n(w.opacity),m(w.blending),void 0!==w.map&&null!==w.map||void 0!==w.envMap&&null!==w.envMap?(c(B,mb,vb,0,1,3,U,w),c(zb,nb,Zb,1,2,3,U,w)):(ya=B.positionScreen.x,Ha=B.positionScreen.y,fa=mb.positionScreen.x,da=mb.positionScreen.y,T=nb.positionScreen.x,
aa=nb.positionScreen.y,la=vb.positionScreen.x,Y=vb.positionScreen.y,ma=zb.positionScreen.x,xa=zb.positionScreen.y,bb=Zb.positionScreen.x,ia=Zb.positionScreen.y,w instanceof THREE.MeshLambertMaterial||w instanceof THREE.MeshPhongMaterial?(Qa.copy(w.color),Ya.copy(w.emissive),w.vertexColors===THREE.FaceColors&&Qa.multiply(U.color),!1===w.wireframe&&w.shading==THREE.SmoothShading&&4==U.vertexNormalsLength?(ra.copy(ib),ka.copy(ib),ua.copy(ib),Ra.copy(ib),b(U.v1.positionWorld,U.vertexNormalsModel[0],ra),
b(U.v2.positionWorld,U.vertexNormalsModel[1],ka),b(U.v4.positionWorld,U.vertexNormalsModel[3],ua),b(U.v3.positionWorld,U.vertexNormalsModel[2],Ra),ra.multiply(Qa).add(Ya),ka.multiply(Qa).add(Ya),ua.multiply(Qa).add(Ya),Ra.multiply(Qa).add(Ya),lb=j(ra,ka,ua,Ra),d(ya,Ha,fa,da,la,Y),i(ya,Ha,fa,da,la,Y,0,0,1,0,0,1,lb),d(ma,xa,T,aa,bb,ia),i(ma,xa,T,aa,bb,ia,1,0,1,1,0,1,lb)):(ha.copy(ib),b(U.centroidModel,U.normalModel,ha),ha.multiply(Qa).add(Ya),e(ya,Ha,fa,da,T,aa,la,Y),!0===w.wireframe?f(ha,w.wireframeLinewidth,
w.wireframeLinecap,w.wireframeLinejoin):h(ha))):w instanceof THREE.MeshBasicMaterial?(ha.copy(w.color),w.vertexColors===THREE.FaceColors&&ha.multiply(U.color),e(ya,Ha,fa,da,T,aa,la,Y),!0===w.wireframe?f(ha,w.wireframeLinewidth,w.wireframeLinecap,w.wireframeLinejoin):h(ha)):w instanceof THREE.MeshNormalMaterial?(B=void 0,w.shading==THREE.FlatShading?(B=U.normalModelView,ha.setRGB(B.x,B.y,B.z).multiplyScalar(0.5).addScalar(0.5),e(ya,Ha,fa,da,T,aa,la,Y),!0===w.wireframe?f(ha,w.wireframeLinewidth,w.wireframeLinecap,
w.wireframeLinejoin):h(ha)):w.shading==THREE.SmoothShading&&(B=U.vertexNormalsModelView[0],ra.setRGB(B.x,B.y,B.z).multiplyScalar(0.5).addScalar(0.5),B=U.vertexNormalsModelView[1],ka.setRGB(B.x,B.y,B.z).multiplyScalar(0.5).addScalar(0.5),B=U.vertexNormalsModelView[3],ua.setRGB(B.x,B.y,B.z).multiplyScalar(0.5).addScalar(0.5),B=U.vertexNormalsModelView[2],Ra.setRGB(B.x,B.y,B.z).multiplyScalar(0.5).addScalar(0.5),lb=j(ra,ka,ua,Ra),d(ya,Ha,fa,da,la,Y),i(ya,Ha,fa,da,la,Y,0,0,1,0,0,1,lb),d(ma,xa,T,aa,bb,
ia),i(ma,xa,T,aa,bb,ia,1,0,1,1,0,1,lb))):w instanceof THREE.MeshDepthMaterial&&(Sa=D.near,xb=D.far,ra.r=ra.g=ra.b=1-z(B.positionScreen.z*B.positionScreen.w,Sa,xb),ka.r=ka.g=ka.b=1-z(mb.positionScreen.z*mb.positionScreen.w,Sa,xb),ua.r=ua.g=ua.b=1-z(vb.positionScreen.z*vb.positionScreen.w,Sa,xb),Ra.r=Ra.g=Ra.b=1-z(nb.positionScreen.z*nb.positionScreen.w,Sa,xb),lb=j(ra,ka,ua,Ra),d(ya,Ha,fa,da,la,Y),i(ya,Ha,fa,da,la,Y,0,0,1,0,0,1,lb),d(ma,xa,T,aa,bb,ia),i(ma,xa,T,aa,bb,ia,1,0,1,1,0,1,lb))))}na.union(va)}}y.setTransform(1,
0,0,1,0,0)}}};THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",fog_fragment:"#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
envmap_pars_fragment:"#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",envmap_fragment:"#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
envmap_pars_vertex:"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
envmap_vertex:"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",map_particle_pars_fragment:"#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
map_particle_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",map_pars_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",map_pars_fragment:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
map_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",map_fragment:"#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
lightmap_fragment:"#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
normalmap_pars_fragment:"#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",lights_lambert_pars_vertex:"uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
lights_lambert_vertex:"vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
lights_phong_pars_vertex:"#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
lights_phong_vertex:"#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
lights_phong_pars_fragment:"uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
lights_phong_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
color_pars_fragment:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
skinbase_vertex:"#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",skinning_vertex:"#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
morphtarget_vertex:"#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
default_vertex:"vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
skinnormal_vertex:"#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",defaultnormal_vertex:"vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",shadowmap_fragment:"#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nvec3 shadowZ = vec3( shadowCoord.z );\nshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\nshadowKernel[0] *= vec3(0.25);\nshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\nshadowKernel[1] *= vec3(0.25);\nshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\nshadowKernel[2] *= vec3(0.25);\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",shadowmap_vertex:"#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",alphatest_fragment:"#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",linear_to_gamma_fragment:"#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"};
THREE.UniformsUtils={merge:function(a){var b,c,d,e={};for(b=0;b<a.length;b++)for(c in d=this.clone(a[b]),d)e[c]=d[c];return e},clone:function(a){var b,c,d,e={};for(b in a)for(c in e[b]={},a[b])d=a[b][c],e[b][c]=d instanceof THREE.Color||d instanceof THREE.Vector2||d instanceof THREE.Vector3||d instanceof THREE.Vector4||d instanceof THREE.Matrix4||d instanceof THREE.Texture?d.clone():d instanceof Array?d.slice():d;return e}};
THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:null},specularMap:{type:"t",value:null},envMap:{type:"t",value:null},flipEnvMap:{type:"f",value:-1},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},combine:{type:"i",value:0},morphTargetInfluences:{type:"f",value:0}},bump:{bumpMap:{type:"t",
value:null},bumpScale:{type:"f",value:1}},normalmap:{normalMap:{type:"t",value:null},normalScale:{type:"v2",value:new THREE.Vector2(1,1)}},fog:{fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},lights:{ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},hemisphereLightDirection:{type:"fv",value:[]},hemisphereLightSkyColor:{type:"fv",
value:[]},hemisphereLightGroundColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]},spotLightColor:{type:"fv",value:[]},spotLightPosition:{type:"fv",value:[]},spotLightDirection:{type:"fv",value:[]},spotLightDistance:{type:"fv1",value:[]},spotLightAngleCos:{type:"fv1",value:[]},spotLightExponent:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",
value:1},scale:{type:"f",value:1},map:{type:"t",value:null},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},shadowmap:{shadowMap:{type:"tv",value:[]},shadowMapSize:{type:"v2v",value:[]},shadowBias:{type:"fv1",value:[]},shadowDarkness:{type:"fv1",value:[]},shadowMatrix:{type:"m4v",value:[]}}};
THREE.ShaderLib={basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.shadowmap]),vertexShader:[THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,
THREE.ShaderChunk.skinbase_vertex,"#ifdef USE_ENVMAP",THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"#endif",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,
THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,
THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},emissive:{type:"c",value:new THREE.Color(0)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_lambert_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,
THREE.ShaderChunk.defaultnormal_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.lights_lambert_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,
THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,"#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",THREE.ShaderChunk.lightmap_fragment,
THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.bump,THREE.UniformsLib.normalmap,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},emissive:{type:"c",value:new THREE.Color(0)},specular:{type:"c",
value:new THREE.Color(1118481)},shininess:{type:"f",value:30},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),vertexShader:["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_phong_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,
"void main() {",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,THREE.ShaderChunk.defaultnormal_vertex,"vNormal = normalize( transformedNormal );",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,"vViewPosition = -mvPosition.xyz;",THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.envmap_vertex,
THREE.ShaderChunk.lights_phong_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_phong_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,
THREE.ShaderChunk.bumpmap_pars_fragment,THREE.ShaderChunk.normalmap_pars_fragment,THREE.ShaderChunk.specularmap_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.specularmap_fragment,THREE.ShaderChunk.lights_phong_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,
THREE.ShaderChunk.fog_fragment,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.particle,THREE.UniformsLib.shadowmap]),vertexShader:["uniform float size;\nuniform float scale;",THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
THREE.ShaderChunk.worldpos_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 psColor;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.shadowmap_fragment,
THREE.ShaderChunk.fog_fragment,"}"].join("\n")},dashed:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,{scale:{type:"f",value:1},dashSize:{type:"f",value:1},totalSize:{type:"f",value:2}}]),vertexShader:["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;",THREE.ShaderChunk.color_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n"),
fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2E3},opacity:{type:"f",
value:1}},vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"},normal:{uniforms:{opacity:{type:"f",value:1}},vertexShader:["varying vec3 vNormal;",THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvNormal = normalize( normalMatrix * normal );",
THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n"),fragmentShader:"uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"},normalmap:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{enableAO:{type:"i",value:0},enableDiffuse:{type:"i",value:0},enableSpecular:{type:"i",value:0},enableReflection:{type:"i",value:0},enableDisplacement:{type:"i",
value:0},tDisplacement:{type:"t",value:null},tDiffuse:{type:"t",value:null},tCube:{type:"t",value:null},tNormal:{type:"t",value:null},tSpecular:{type:"t",value:null},tAO:{type:"t",value:null},uNormalScale:{type:"v2",value:new THREE.Vector2(1,1)},uDisplacementBias:{type:"f",value:0},uDisplacementScale:{type:"f",value:1},uDiffuseColor:{type:"c",value:new THREE.Color(16777215)},uSpecularColor:{type:"c",value:new THREE.Color(1118481)},uAmbientColor:{type:"c",value:new THREE.Color(16777215)},uShininess:{type:"f",
value:30},uOpacity:{type:"f",value:1},useRefract:{type:"i",value:0},uRefractionRatio:{type:"f",value:0.98},uReflectivity:{type:"f",value:0.5},uOffset:{type:"v2",value:new THREE.Vector2(0,0)},uRepeat:{type:"v2",value:new THREE.Vector2(1,1)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,1,1)}}]),fragmentShader:["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
THREE.ShaderChunk.shadowmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n"),vertexShader:["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {",THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.skinnormal_vertex,"#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}"].join("\n")},
cube:{uniforms:{tCube:{type:"t",value:null},tFlip:{type:"f",value:-1}},vertexShader:"varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}"},
depthRGBA:{uniforms:{},vertexShader:[THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,"void main() {",THREE.ShaderChunk.skinbase_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n"),fragmentShader:"vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"}};THREE.WebGLRenderer=function(a){function b(a){if(a.__webglCustomAttributesList)for(var b in a.__webglCustomAttributesList)k.deleteBuffer(a.__webglCustomAttributesList[b].buffer)}function c(a,b){var c=a.vertices.length,d=b.material;if(d.attributes){void 0===a.__webglCustomAttributesList&&(a.__webglCustomAttributesList=[]);for(var e in d.attributes){var f=d.attributes[e];if(!f.__webglInitialized||f.createUniqueBuffers){f.__webglInitialized=!0;var h=1;"v2"===f.type?h=2:"v3"===f.type?h=3:"v4"===f.type?
h=4:"c"===f.type&&(h=3);f.size=h;f.array=new Float32Array(c*h);f.buffer=k.createBuffer();f.buffer.belongsToAttribute=e;f.needsUpdate=!0}a.__webglCustomAttributesList.push(f)}}}function d(a,b){var c=b.geometry,d=a.faces3,g=a.faces4,i=3*d.length+4*g.length,j=1*d.length+2*g.length,g=3*d.length+4*g.length,d=e(b,a),n=h(d),l=f(d),m=d.vertexColors?d.vertexColors:!1;a.__vertexArray=new Float32Array(3*i);l&&(a.__normalArray=new Float32Array(3*i));c.hasTangents&&(a.__tangentArray=new Float32Array(4*i));m&&
(a.__colorArray=new Float32Array(3*i));if(n){if(0<c.faceUvs.length||0<c.faceVertexUvs.length)a.__uvArray=new Float32Array(2*i);if(1<c.faceUvs.length||1<c.faceVertexUvs.length)a.__uv2Array=new Float32Array(2*i)}b.geometry.skinWeights.length&&b.geometry.skinIndices.length&&(a.__skinIndexArray=new Float32Array(4*i),a.__skinWeightArray=new Float32Array(4*i));a.__faceArray=new Uint16Array(3*j);a.__lineArray=new Uint16Array(2*g);if(a.numMorphTargets){a.__morphTargetsArrays=[];c=0;for(n=a.numMorphTargets;c<
n;c++)a.__morphTargetsArrays.push(new Float32Array(3*i))}if(a.numMorphNormals){a.__morphNormalsArrays=[];c=0;for(n=a.numMorphNormals;c<n;c++)a.__morphNormalsArrays.push(new Float32Array(3*i))}a.__webglFaceCount=3*j;a.__webglLineCount=2*g;if(d.attributes){void 0===a.__webglCustomAttributesList&&(a.__webglCustomAttributesList=[]);for(var p in d.attributes){var j=d.attributes[p],c={},q;for(q in j)c[q]=j[q];if(!c.__webglInitialized||c.createUniqueBuffers)c.__webglInitialized=!0,g=1,"v2"===c.type?g=2:
"v3"===c.type?g=3:"v4"===c.type?g=4:"c"===c.type&&(g=3),c.size=g,c.array=new Float32Array(i*g),c.buffer=k.createBuffer(),c.buffer.belongsToAttribute=p,j.needsUpdate=!0,c.__original=j;a.__webglCustomAttributesList.push(c)}}a.__inittedArrays=!0}function e(a,b){return a.material instanceof THREE.MeshFaceMaterial?a.material.materials[b.materialIndex]:a.material}function f(a){return a instanceof THREE.MeshBasicMaterial&&!a.envMap||a instanceof THREE.MeshDepthMaterial?!1:a&&void 0!==a.shading&&a.shading===
THREE.SmoothShading?THREE.SmoothShading:THREE.FlatShading}function h(a){return a.map||a.lightMap||a.bumpMap||a.normalMap||a.specularMap||a instanceof THREE.ShaderMaterial?!0:!1}function g(a){Ab[a]||(k.enableVertexAttribArray(a),Ab[a]=!0)}function i(){for(var a in Ab)Ab[a]&&(k.disableVertexAttribArray(a),Ab[a]=!1)}function j(a,b){return a.z!==b.z?b.z-a.z:a.id-b.id}function l(a,b){return b[0]-a[0]}function n(a,b,c){if(a.length)for(var d=0,e=a.length;d<e;d++)ya=pa=null,pb=ub=T=da=bb=xa=aa=-1,yb=!0,a[d].render(b,
c,Xb,Jb),ya=pa=null,pb=ub=T=da=bb=xa=aa=-1,yb=!0}function m(a,b,c,d,e,f,h,g){var k,i,j,n;b?(i=a.length-1,n=b=-1):(i=0,b=a.length,n=1);for(var l=i;l!==b;l+=n)if(k=a[l],k.render){i=k.object;j=k.buffer;if(g)k=g;else{k=k[c];if(!k)continue;h&&D.setBlending(k.blending,k.blendEquation,k.blendSrc,k.blendDst);D.setDepthTest(k.depthTest);D.setDepthWrite(k.depthWrite);K(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits)}D.setMaterialFaces(k);j instanceof THREE.BufferGeometry?D.renderBufferDirect(d,
e,f,k,j,i):D.renderBuffer(d,e,f,k,j,i)}}function q(a,b,c,d,e,f,h){for(var g,k,i=0,j=a.length;i<j;i++)if(g=a[i],k=g.object,k.visible){if(h)g=h;else{g=g[b];if(!g)continue;f&&D.setBlending(g.blending,g.blendEquation,g.blendSrc,g.blendDst);D.setDepthTest(g.depthTest);D.setDepthWrite(g.depthWrite);K(g.polygonOffset,g.polygonOffsetFactor,g.polygonOffsetUnits)}D.renderImmediateObject(c,d,e,g,k)}}function t(a,b){var e,f,h,g;if(void 0===a.__webglInit&&(a.__webglInit=!0,a._modelViewMatrix=new THREE.Matrix4,
a._normalMatrix=new THREE.Matrix3,void 0!==a.geometry&&void 0===a.geometry.__webglInit&&(a.geometry.__webglInit=!0,a.geometry.addEventListener("dispose",lc)),f=a.geometry,void 0!==f))if(f instanceof THREE.BufferGeometry){var i,j;for(i in f.attributes)j="index"===i?k.ELEMENT_ARRAY_BUFFER:k.ARRAY_BUFFER,g=f.attributes[i],void 0===g.numItems&&(g.numItems=g.array.length),g.buffer=k.createBuffer(),k.bindBuffer(j,g.buffer),k.bufferData(j,g.array,k.STATIC_DRAW)}else if(a instanceof THREE.Mesh){h=a.material;
if(void 0===f.geometryGroups){i=f;var n,l,m,q,r;j={};var s=i.morphTargets.length,t=i.morphNormals.length,v=h instanceof THREE.MeshFaceMaterial;i.geometryGroups={};h=0;for(n=i.faces.length;h<n;h++)l=i.faces[h],m=v?l.materialIndex:0,void 0===j[m]&&(j[m]={hash:m,counter:0}),r=j[m].hash+"_"+j[m].counter,void 0===i.geometryGroups[r]&&(i.geometryGroups[r]={faces3:[],faces4:[],materialIndex:m,vertices:0,numMorphTargets:s,numMorphNormals:t}),q=l instanceof THREE.Face3?3:4,65535<i.geometryGroups[r].vertices+
q&&(j[m].counter+=1,r=j[m].hash+"_"+j[m].counter,void 0===i.geometryGroups[r]&&(i.geometryGroups[r]={faces3:[],faces4:[],materialIndex:m,vertices:0,numMorphTargets:s,numMorphNormals:t})),l instanceof THREE.Face3?i.geometryGroups[r].faces3.push(h):i.geometryGroups[r].faces4.push(h),i.geometryGroups[r].vertices+=q;i.geometryGroupsList=[];for(g in i.geometryGroups)i.geometryGroups[g].id=Ha++,i.geometryGroupsList.push(i.geometryGroups[g])}for(e in f.geometryGroups)if(g=f.geometryGroups[e],!g.__webglVertexBuffer){i=
g;i.__webglVertexBuffer=k.createBuffer();i.__webglNormalBuffer=k.createBuffer();i.__webglTangentBuffer=k.createBuffer();i.__webglColorBuffer=k.createBuffer();i.__webglUVBuffer=k.createBuffer();i.__webglUV2Buffer=k.createBuffer();i.__webglSkinIndicesBuffer=k.createBuffer();i.__webglSkinWeightsBuffer=k.createBuffer();i.__webglFaceBuffer=k.createBuffer();i.__webglLineBuffer=k.createBuffer();s=j=void 0;if(i.numMorphTargets){i.__webglMorphTargetsBuffers=[];j=0;for(s=i.numMorphTargets;j<s;j++)i.__webglMorphTargetsBuffers.push(k.createBuffer())}if(i.numMorphNormals){i.__webglMorphNormalsBuffers=
[];j=0;for(s=i.numMorphNormals;j<s;j++)i.__webglMorphNormalsBuffers.push(k.createBuffer())}D.info.memory.geometries++;d(g,a);f.verticesNeedUpdate=!0;f.morphTargetsNeedUpdate=!0;f.elementsNeedUpdate=!0;f.uvsNeedUpdate=!0;f.normalsNeedUpdate=!0;f.tangentsNeedUpdate=!0;f.colorsNeedUpdate=!0}}else a instanceof THREE.Ribbon?f.__webglVertexBuffer||(g=f,g.__webglVertexBuffer=k.createBuffer(),g.__webglColorBuffer=k.createBuffer(),g.__webglNormalBuffer=k.createBuffer(),D.info.memory.geometries++,g=f,i=g.vertices.length,
g.__vertexArray=new Float32Array(3*i),g.__colorArray=new Float32Array(3*i),g.__normalArray=new Float32Array(3*i),g.__webglVertexCount=i,c(g,a),f.verticesNeedUpdate=!0,f.colorsNeedUpdate=!0,f.normalsNeedUpdate=!0):a instanceof THREE.Line?f.__webglVertexBuffer||(g=f,g.__webglVertexBuffer=k.createBuffer(),g.__webglColorBuffer=k.createBuffer(),g.__webglLineDistanceBuffer=k.createBuffer(),D.info.memory.geometries++,g=f,i=g.vertices.length,g.__vertexArray=new Float32Array(3*i),g.__colorArray=new Float32Array(3*
i),g.__lineDistanceArray=new Float32Array(1*i),g.__webglLineCount=i,c(g,a),f.verticesNeedUpdate=!0,f.colorsNeedUpdate=!0,f.lineDistancesNeedUpdate=!0):a instanceof THREE.ParticleSystem&&!f.__webglVertexBuffer&&(g=f,g.__webglVertexBuffer=k.createBuffer(),g.__webglColorBuffer=k.createBuffer(),D.info.memory.geometries++,g=f,i=g.vertices.length,g.__vertexArray=new Float32Array(3*i),g.__colorArray=new Float32Array(3*i),g.__sortArray=[],g.__webglParticleCount=i,c(g,a),f.verticesNeedUpdate=!0,f.colorsNeedUpdate=
!0);if(void 0===a.__webglActive){if(a instanceof THREE.Mesh)if(f=a.geometry,f instanceof THREE.BufferGeometry)p(b.__webglObjects,f,a);else{if(f instanceof THREE.Geometry)for(e in f.geometryGroups)g=f.geometryGroups[e],p(b.__webglObjects,g,a)}else a instanceof THREE.Ribbon||a instanceof THREE.Line||a instanceof THREE.ParticleSystem?(f=a.geometry,p(b.__webglObjects,f,a)):a instanceof THREE.ImmediateRenderObject||a.immediateRenderCallback?b.__webglObjectsImmediate.push({id:null,object:a,opaque:null,
transparent:null,z:0}):a instanceof THREE.Sprite?b.__webglSprites.push(a):a instanceof THREE.LensFlare&&b.__webglFlares.push(a);a.__webglActive=!0}}function p(a,b,c){a.push({id:null,buffer:b,object:c,opaque:null,transparent:null,z:0})}function r(a){for(var b in a.attributes)if(a.attributes[b].needsUpdate)return!0;return!1}function s(a){for(var b in a.attributes)a.attributes[b].needsUpdate=!1}function v(a,b){a instanceof THREE.Mesh||a instanceof THREE.ParticleSystem||a instanceof THREE.Ribbon||a instanceof
THREE.Line?z(b.__webglObjects,a):a instanceof THREE.Sprite?G(b.__webglSprites,a):a instanceof THREE.LensFlare?G(b.__webglFlares,a):(a instanceof THREE.ImmediateRenderObject||a.immediateRenderCallback)&&z(b.__webglObjectsImmediate,a);delete a.__webglActive}function z(a,b){for(var c=a.length-1;0<=c;c--)a[c].object===b&&a.splice(c,1)}function G(a,b){for(var c=a.length-1;0<=c;c--)a[c]===b&&a.splice(c,1)}function C(a,b,c,d,e){fa=0;d.needsUpdate&&(d.program&&vc(d),D.initMaterial(d,b,c,e),d.needsUpdate=
!1);d.morphTargets&&!e.__webglMorphTargetInfluences&&(e.__webglMorphTargetInfluences=new Float32Array(D.maxMorphTargets));var f=!1,h=d.program,g=h.uniforms,i=d.uniforms;h!==pa&&(k.useProgram(h),pa=h,f=!0);d.id!==pb&&(pb=d.id,f=!0);if(f||a!==ya)k.uniformMatrix4fv(g.projectionMatrix,!1,a.projectionMatrix.elements),a!==ya&&(ya=a);if(d.skinning)if(Bb&&e.useVertexTexture){if(null!==g.boneTexture){var j=H();k.uniform1i(g.boneTexture,j);D.setTexture(e.boneTexture,j)}}else null!==g.boneGlobalMatrices&&k.uniformMatrix4fv(g.boneGlobalMatrices,
!1,e.boneMatrices);if(f){c&&d.fog&&(i.fogColor.value=c.color,c instanceof THREE.Fog?(i.fogNear.value=c.near,i.fogFar.value=c.far):c instanceof THREE.FogExp2&&(i.fogDensity.value=c.density));if(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d.lights){if(yb){for(var n,l=j=0,m=0,p,q,r,s=Ib,t=s.directional.colors,v=s.directional.positions,z=s.point.colors,y=s.point.positions,A=s.point.distances,B=s.spot.colors,G=s.spot.positions,C=s.spot.distances,E=s.spot.directions,J=
s.spot.anglesCos,L=s.spot.exponents,V=s.hemi.skyColors,K=s.hemi.groundColors,M=s.hemi.positions,O=0,ea=0,T=0,aa=0,da=0,R=0,S=0,P=0,ba=n=0,c=r=ba=0,f=b.length;c<f;c++)n=b[c],n.onlyShadow||(p=n.color,q=n.intensity,r=n.distance,n instanceof THREE.AmbientLight?n.visible&&(D.gammaInput?(j+=p.r*p.r,l+=p.g*p.g,m+=p.b*p.b):(j+=p.r,l+=p.g,m+=p.b)):n instanceof THREE.DirectionalLight?(da+=1,n.visible&&(Ca.getPositionFromMatrix(n.matrixWorld),Ga.getPositionFromMatrix(n.target.matrixWorld),Ca.sub(Ga),Ca.normalize(),
0===Ca.x&&0===Ca.y&&0===Ca.z||(n=3*O,v[n]=Ca.x,v[n+1]=Ca.y,v[n+2]=Ca.z,D.gammaInput?I(t,n,p,q*q):F(t,n,p,q),O+=1))):n instanceof THREE.PointLight?(R+=1,n.visible&&(ba=3*ea,D.gammaInput?I(z,ba,p,q*q):F(z,ba,p,q),Ga.getPositionFromMatrix(n.matrixWorld),y[ba]=Ga.x,y[ba+1]=Ga.y,y[ba+2]=Ga.z,A[ea]=r,ea+=1)):n instanceof THREE.SpotLight?(S+=1,n.visible&&(ba=3*T,D.gammaInput?I(B,ba,p,q*q):F(B,ba,p,q),Ga.getPositionFromMatrix(n.matrixWorld),G[ba]=Ga.x,G[ba+1]=Ga.y,G[ba+2]=Ga.z,C[T]=r,Ca.copy(Ga),Ga.getPositionFromMatrix(n.target.matrixWorld),
Ca.sub(Ga),Ca.normalize(),E[ba]=Ca.x,E[ba+1]=Ca.y,E[ba+2]=Ca.z,J[T]=Math.cos(n.angle),L[T]=n.exponent,T+=1)):n instanceof THREE.HemisphereLight&&(P+=1,n.visible&&(Ca.getPositionFromMatrix(n.matrixWorld),Ca.normalize(),0===Ca.x&&0===Ca.y&&0===Ca.z||(r=3*aa,M[r]=Ca.x,M[r+1]=Ca.y,M[r+2]=Ca.z,p=n.color,n=n.groundColor,D.gammaInput?(q*=q,I(V,r,p,q),I(K,r,n,q)):(F(V,r,p,q),F(K,r,n,q)),aa+=1))));c=3*O;for(f=Math.max(t.length,3*da);c<f;c++)t[c]=0;c=3*ea;for(f=Math.max(z.length,3*R);c<f;c++)z[c]=0;c=3*T;for(f=
Math.max(B.length,3*S);c<f;c++)B[c]=0;c=3*aa;for(f=Math.max(V.length,3*P);c<f;c++)V[c]=0;c=3*aa;for(f=Math.max(K.length,3*P);c<f;c++)K[c]=0;s.directional.length=O;s.point.length=ea;s.spot.length=T;s.hemi.length=aa;s.ambient[0]=j;s.ambient[1]=l;s.ambient[2]=m;yb=!1}c=Ib;i.ambientLightColor.value=c.ambient;i.directionalLightColor.value=c.directional.colors;i.directionalLightDirection.value=c.directional.positions;i.pointLightColor.value=c.point.colors;i.pointLightPosition.value=c.point.positions;i.pointLightDistance.value=
c.point.distances;i.spotLightColor.value=c.spot.colors;i.spotLightPosition.value=c.spot.positions;i.spotLightDistance.value=c.spot.distances;i.spotLightDirection.value=c.spot.directions;i.spotLightAngleCos.value=c.spot.anglesCos;i.spotLightExponent.value=c.spot.exponents;i.hemisphereLightSkyColor.value=c.hemi.skyColors;i.hemisphereLightGroundColor.value=c.hemi.groundColors;i.hemisphereLightDirection.value=c.hemi.positions}if(d instanceof THREE.MeshBasicMaterial||d instanceof THREE.MeshLambertMaterial||
d instanceof THREE.MeshPhongMaterial){i.opacity.value=d.opacity;D.gammaInput?i.diffuse.value.copyGammaToLinear(d.color):i.diffuse.value=d.color;i.map.value=d.map;i.lightMap.value=d.lightMap;i.specularMap.value=d.specularMap;d.bumpMap&&(i.bumpMap.value=d.bumpMap,i.bumpScale.value=d.bumpScale);d.normalMap&&(i.normalMap.value=d.normalMap,i.normalScale.value.copy(d.normalScale));var Y;d.map?Y=d.map:d.specularMap?Y=d.specularMap:d.normalMap?Y=d.normalMap:d.bumpMap&&(Y=d.bumpMap);void 0!==Y&&(c=Y.offset,
Y=Y.repeat,i.offsetRepeat.value.set(c.x,c.y,Y.x,Y.y));i.envMap.value=d.envMap;i.flipEnvMap.value=d.envMap instanceof THREE.WebGLRenderTargetCube?1:-1;i.reflectivity.value=d.reflectivity;i.refractionRatio.value=d.refractionRatio;i.combine.value=d.combine;i.useRefract.value=d.envMap&&d.envMap.mapping instanceof THREE.CubeRefractionMapping}d instanceof THREE.LineBasicMaterial?(i.diffuse.value=d.color,i.opacity.value=d.opacity):d instanceof THREE.LineDashedMaterial?(i.diffuse.value=d.color,i.opacity.value=
d.opacity,i.dashSize.value=d.dashSize,i.totalSize.value=d.dashSize+d.gapSize,i.scale.value=d.scale):d instanceof THREE.ParticleBasicMaterial?(i.psColor.value=d.color,i.opacity.value=d.opacity,i.size.value=d.size,i.scale.value=Z.height/2,i.map.value=d.map):d instanceof THREE.MeshPhongMaterial?(i.shininess.value=d.shininess,D.gammaInput?(i.ambient.value.copyGammaToLinear(d.ambient),i.emissive.value.copyGammaToLinear(d.emissive),i.specular.value.copyGammaToLinear(d.specular)):(i.ambient.value=d.ambient,
i.emissive.value=d.emissive,i.specular.value=d.specular),d.wrapAround&&i.wrapRGB.value.copy(d.wrapRGB)):d instanceof THREE.MeshLambertMaterial?(D.gammaInput?(i.ambient.value.copyGammaToLinear(d.ambient),i.emissive.value.copyGammaToLinear(d.emissive)):(i.ambient.value=d.ambient,i.emissive.value=d.emissive),d.wrapAround&&i.wrapRGB.value.copy(d.wrapRGB)):d instanceof THREE.MeshDepthMaterial?(i.mNear.value=a.near,i.mFar.value=a.far,i.opacity.value=d.opacity):d instanceof THREE.MeshNormalMaterial&&(i.opacity.value=
d.opacity);if(e.receiveShadow&&!d._shadowPass&&i.shadowMatrix){c=Y=0;for(f=b.length;c<f;c++)if(j=b[c],j.castShadow&&(j instanceof THREE.SpotLight||j instanceof THREE.DirectionalLight&&!j.shadowCascade))i.shadowMap.value[Y]=j.shadowMap,i.shadowMapSize.value[Y]=j.shadowMapSize,i.shadowMatrix.value[Y]=j.shadowMatrix,i.shadowDarkness.value[Y]=j.shadowDarkness,i.shadowBias.value[Y]=j.shadowBias,Y++}b=d.uniformsList;i=0;for(Y=b.length;i<Y;i++)if(f=h.uniforms[b[i][1]])if(c=b[i][0],l=c.type,j=c.value,"i"===
l)k.uniform1i(f,j);else if("f"===l)k.uniform1f(f,j);else if("v2"===l)k.uniform2f(f,j.x,j.y);else if("v3"===l)k.uniform3f(f,j.x,j.y,j.z);else if("v4"===l)k.uniform4f(f,j.x,j.y,j.z,j.w);else if("c"===l)k.uniform3f(f,j.r,j.g,j.b);else if("iv1"===l)k.uniform1iv(f,j);else if("iv"===l)k.uniform3iv(f,j);else if("fv1"===l)k.uniform1fv(f,j);else if("fv"===l)k.uniform3fv(f,j);else if("v2v"===l){void 0===c._array&&(c._array=new Float32Array(2*j.length));l=0;for(m=j.length;l<m;l++)s=2*l,c._array[s]=j[l].x,c._array[s+
1]=j[l].y;k.uniform2fv(f,c._array)}else if("v3v"===l){void 0===c._array&&(c._array=new Float32Array(3*j.length));l=0;for(m=j.length;l<m;l++)s=3*l,c._array[s]=j[l].x,c._array[s+1]=j[l].y,c._array[s+2]=j[l].z;k.uniform3fv(f,c._array)}else if("v4v"===l){void 0===c._array&&(c._array=new Float32Array(4*j.length));l=0;for(m=j.length;l<m;l++)s=4*l,c._array[s]=j[l].x,c._array[s+1]=j[l].y,c._array[s+2]=j[l].z,c._array[s+3]=j[l].w;k.uniform4fv(f,c._array)}else if("m4"===l)void 0===c._array&&(c._array=new Float32Array(16)),
j.flattenToArray(c._array),k.uniformMatrix4fv(f,!1,c._array);else if("m4v"===l){void 0===c._array&&(c._array=new Float32Array(16*j.length));l=0;for(m=j.length;l<m;l++)j[l].flattenToArrayOffset(c._array,16*l);k.uniformMatrix4fv(f,!1,c._array)}else if("t"===l){if(s=j,j=H(),k.uniform1i(f,j),s)if(s.image instanceof Array&&6===s.image.length){if(c=s,f=j,6===c.image.length)if(c.needsUpdate){c.image.__webglTextureCube||(c.addEventListener("dispose",gc),c.image.__webglTextureCube=k.createTexture(),D.info.memory.textures++);
k.activeTexture(k.TEXTURE0+f);k.bindTexture(k.TEXTURE_CUBE_MAP,c.image.__webglTextureCube);k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,c.flipY);f=c instanceof THREE.CompressedTexture;j=[];for(l=0;6>l;l++)D.autoScaleCubemaps&&!f?(m=j,s=l,t=c.image[l],z=Ub,t.width<=z&&t.height<=z||(y=Math.max(t.width,t.height),v=Math.floor(t.width*z/y),z=Math.floor(t.height*z/y),y=document.createElement("canvas"),y.width=v,y.height=z,y.getContext("2d").drawImage(t,0,0,t.width,t.height,0,0,v,z),t=y),m[s]=t):j[l]=c.image[l];
l=j[0];m=0===(l.width&l.width-1)&&0===(l.height&l.height-1);s=w(c.format);t=w(c.type);N(k.TEXTURE_CUBE_MAP,c,m);for(l=0;6>l;l++)if(f){z=j[l].mipmaps;y=0;for(A=z.length;y<A;y++)v=z[y],k.compressedTexImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X+l,y,s,v.width,v.height,0,v.data)}else k.texImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X+l,0,s,s,t,j[l]);c.generateMipmaps&&m&&k.generateMipmap(k.TEXTURE_CUBE_MAP);c.needsUpdate=!1;if(c.onUpdate)c.onUpdate()}else k.activeTexture(k.TEXTURE0+f),k.bindTexture(k.TEXTURE_CUBE_MAP,
c.image.__webglTextureCube)}else s instanceof THREE.WebGLRenderTargetCube?(c=s,k.activeTexture(k.TEXTURE0+j),k.bindTexture(k.TEXTURE_CUBE_MAP,c.__webglTexture)):D.setTexture(s,j)}else if("tv"===l){void 0===c._array&&(c._array=[]);l=0;for(m=c.value.length;l<m;l++)c._array[l]=H();k.uniform1iv(f,c._array);l=0;for(m=c.value.length;l<m;l++)s=c.value[l],j=c._array[l],s&&D.setTexture(s,j)}if((d instanceof THREE.ShaderMaterial||d instanceof THREE.MeshPhongMaterial||d.envMap)&&null!==g.cameraPosition)Ga.getPositionFromMatrix(a.matrixWorld),
k.uniform3f(g.cameraPosition,Ga.x,Ga.y,Ga.z);(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.ShaderMaterial||d.skinning)&&null!==g.viewMatrix&&k.uniformMatrix4fv(g.viewMatrix,!1,a.matrixWorldInverse.elements)}k.uniformMatrix4fv(g.modelViewMatrix,!1,e._modelViewMatrix.elements);g.normalMatrix&&k.uniformMatrix3fv(g.normalMatrix,!1,e._normalMatrix.elements);null!==g.modelMatrix&&k.uniformMatrix4fv(g.modelMatrix,!1,e.matrixWorld.elements);return h}function H(){var a=
fa;a>=ib&&console.warn("WebGLRenderer: trying to use "+a+" texture units while this GPU supports only "+ib);fa+=1;return a}function I(a,b,c,d){a[b]=c.r*c.r*d;a[b+1]=c.g*c.g*d;a[b+2]=c.b*c.b*d}function F(a,b,c,d){a[b]=c.r*d;a[b+1]=c.g*d;a[b+2]=c.b*d}function A(a){a!==ka&&(k.lineWidth(a),ka=a)}function K(a,b,c){ia!==a&&(a?k.enable(k.POLYGON_OFFSET_FILL):k.disable(k.POLYGON_OFFSET_FILL),ia=a);if(a&&(ha!==b||ra!==c))k.polygonOffset(b,c),ha=b,ra=c}function B(a){for(var a=a.split("\n"),b=0,c=a.length;b<
c;b++)a[b]=b+1+": "+a[b];return a.join("\n")}function J(a,b){var c;"fragment"===a?c=k.createShader(k.FRAGMENT_SHADER):"vertex"===a&&(c=k.createShader(k.VERTEX_SHADER));k.shaderSource(c,b);k.compileShader(c);return!k.getShaderParameter(c,k.COMPILE_STATUS)?(console.error(k.getShaderInfoLog(c)),console.error(B(b)),null):c}function N(a,b,c){c?(k.texParameteri(a,k.TEXTURE_WRAP_S,w(b.wrapS)),k.texParameteri(a,k.TEXTURE_WRAP_T,w(b.wrapT)),k.texParameteri(a,k.TEXTURE_MAG_FILTER,w(b.magFilter)),k.texParameteri(a,
k.TEXTURE_MIN_FILTER,w(b.minFilter))):(k.texParameteri(a,k.TEXTURE_WRAP_S,k.CLAMP_TO_EDGE),k.texParameteri(a,k.TEXTURE_WRAP_T,k.CLAMP_TO_EDGE),k.texParameteri(a,k.TEXTURE_MAG_FILTER,M(b.magFilter)),k.texParameteri(a,k.TEXTURE_MIN_FILTER,M(b.minFilter)));if(fb&&b.type!==THREE.FloatType&&(1<b.anisotropy||b.__oldAnisotropy))k.texParameterf(a,fb.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,Xa)),b.__oldAnisotropy=b.anisotropy}function y(a,b){k.bindRenderbuffer(k.RENDERBUFFER,a);b.depthBuffer&&!b.stencilBuffer?
(k.renderbufferStorage(k.RENDERBUFFER,k.DEPTH_COMPONENT16,b.width,b.height),k.framebufferRenderbuffer(k.FRAMEBUFFER,k.DEPTH_ATTACHMENT,k.RENDERBUFFER,a)):b.depthBuffer&&b.stencilBuffer?(k.renderbufferStorage(k.RENDERBUFFER,k.DEPTH_STENCIL,b.width,b.height),k.framebufferRenderbuffer(k.FRAMEBUFFER,k.DEPTH_STENCIL_ATTACHMENT,k.RENDERBUFFER,a)):k.renderbufferStorage(k.RENDERBUFFER,k.RGBA4,b.width,b.height)}function M(a){return a===THREE.NearestFilter||a===THREE.NearestMipMapNearestFilter||a===THREE.NearestMipMapLinearFilter?
k.NEAREST:k.LINEAR}function w(a){if(a===THREE.RepeatWrapping)return k.REPEAT;if(a===THREE.ClampToEdgeWrapping)return k.CLAMP_TO_EDGE;if(a===THREE.MirroredRepeatWrapping)return k.MIRRORED_REPEAT;if(a===THREE.NearestFilter)return k.NEAREST;if(a===THREE.NearestMipMapNearestFilter)return k.NEAREST_MIPMAP_NEAREST;if(a===THREE.NearestMipMapLinearFilter)return k.NEAREST_MIPMAP_LINEAR;if(a===THREE.LinearFilter)return k.LINEAR;if(a===THREE.LinearMipMapNearestFilter)return k.LINEAR_MIPMAP_NEAREST;if(a===THREE.LinearMipMapLinearFilter)return k.LINEAR_MIPMAP_LINEAR;
if(a===THREE.UnsignedByteType)return k.UNSIGNED_BYTE;if(a===THREE.UnsignedShort4444Type)return k.UNSIGNED_SHORT_4_4_4_4;if(a===THREE.UnsignedShort5551Type)return k.UNSIGNED_SHORT_5_5_5_1;if(a===THREE.UnsignedShort565Type)return k.UNSIGNED_SHORT_5_6_5;if(a===THREE.ByteType)return k.BYTE;if(a===THREE.ShortType)return k.SHORT;if(a===THREE.UnsignedShortType)return k.UNSIGNED_SHORT;if(a===THREE.IntType)return k.INT;if(a===THREE.UnsignedIntType)return k.UNSIGNED_INT;if(a===THREE.FloatType)return k.FLOAT;
if(a===THREE.AlphaFormat)return k.ALPHA;if(a===THREE.RGBFormat)return k.RGB;if(a===THREE.RGBAFormat)return k.RGBA;if(a===THREE.LuminanceFormat)return k.LUMINANCE;if(a===THREE.LuminanceAlphaFormat)return k.LUMINANCE_ALPHA;if(a===THREE.AddEquation)return k.FUNC_ADD;if(a===THREE.SubtractEquation)return k.FUNC_SUBTRACT;if(a===THREE.ReverseSubtractEquation)return k.FUNC_REVERSE_SUBTRACT;if(a===THREE.ZeroFactor)return k.ZERO;if(a===THREE.OneFactor)return k.ONE;if(a===THREE.SrcColorFactor)return k.SRC_COLOR;
if(a===THREE.OneMinusSrcColorFactor)return k.ONE_MINUS_SRC_COLOR;if(a===THREE.SrcAlphaFactor)return k.SRC_ALPHA;if(a===THREE.OneMinusSrcAlphaFactor)return k.ONE_MINUS_SRC_ALPHA;if(a===THREE.DstAlphaFactor)return k.DST_ALPHA;if(a===THREE.OneMinusDstAlphaFactor)return k.ONE_MINUS_DST_ALPHA;if(a===THREE.DstColorFactor)return k.DST_COLOR;if(a===THREE.OneMinusDstColorFactor)return k.ONE_MINUS_DST_COLOR;if(a===THREE.SrcAlphaSaturateFactor)return k.SRC_ALPHA_SATURATE;if(void 0!==na){if(a===THREE.RGB_S3TC_DXT1_Format)return na.COMPRESSED_RGB_S3TC_DXT1_EXT;
if(a===THREE.RGBA_S3TC_DXT1_Format)return na.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===THREE.RGBA_S3TC_DXT3_Format)return na.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===THREE.RGBA_S3TC_DXT5_Format)return na.COMPRESSED_RGBA_S3TC_DXT5_EXT}return 0}console.log("THREE.WebGLRenderer",THREE.REVISION);var a=a||{},Z=void 0!==a.canvas?a.canvas:document.createElement("canvas"),L=void 0!==a.precision?a.precision:"highp",oa=void 0!==a.alpha?a.alpha:!0,Pa=void 0!==a.premultipliedAlpha?a.premultipliedAlpha:!0,Va=void 0!==
a.antialias?a.antialias:!1,O=void 0!==a.stencil?a.stencil:!0,qa=void 0!==a.preserveDrawingBuffer?a.preserveDrawingBuffer:!1,Fa=new THREE.Color(0),wa=0;void 0!==a.clearColor&&(console.warn("DEPRECATED: clearColor in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."),Fa.setHex(a.clearColor));void 0!==a.clearAlpha&&(console.warn("DEPRECATED: clearAlpha in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."),wa=a.clearAlpha);this.domElement=
Z;this.context=null;this.devicePixelRatio=void 0!==a.devicePixelRatio?a.devicePixelRatio:void 0!==window.devicePixelRatio?window.devicePixelRatio:1;this.autoUpdateObjects=this.sortObjects=this.autoClearStencil=this.autoClearDepth=this.autoClearColor=this.autoClear=!0;this.shadowMapEnabled=this.physicallyBasedShading=this.gammaOutput=this.gammaInput=!1;this.shadowMapAutoUpdate=!0;this.shadowMapType=THREE.PCFShadowMap;this.shadowMapCullFace=THREE.CullFaceFront;this.shadowMapCascade=this.shadowMapDebug=
!1;this.maxMorphTargets=8;this.maxMorphNormals=4;this.autoScaleCubemaps=!0;this.renderPluginsPre=[];this.renderPluginsPost=[];this.info={memory:{programs:0,geometries:0,textures:0},render:{calls:0,vertices:0,faces:0,points:0}};var D=this,V=[],ea=0,pa=null,Ua=null,pb=-1,ub=null,ya=null,Ha=0,fa=0,da=-1,T=-1,aa=-1,la=-1,Y=-1,ma=-1,xa=-1,bb=-1,ia=null,ha=null,ra=null,ka=null,ua=0,Ra=0,Qa=0,Ya=0,Xb=0,Jb=0,Ab={},Sa=new THREE.Frustum,xb=new THREE.Matrix4,lb=new THREE.Matrix4,Ga=new THREE.Vector3,Ca=new THREE.Vector3,
yb=!0,Ib={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},point:{length:0,colors:[],positions:[],distances:[]},spot:{length:0,colors:[],positions:[],distances:[],directions:[],anglesCos:[],exponents:[]},hemi:{length:0,skyColors:[],groundColors:[],positions:[]}},k,Rb,Yb,fb,na;try{if(!(k=Z.getContext("experimental-webgl",{alpha:oa,premultipliedAlpha:Pa,antialias:Va,stencil:O,preserveDrawingBuffer:qa})))throw"Error creating WebGL context.";}catch(va){console.error(va)}Rb=k.getExtension("OES_texture_float");
k.getExtension("OES_texture_float_linear");Yb=k.getExtension("OES_standard_derivatives");fb=k.getExtension("EXT_texture_filter_anisotropic")||k.getExtension("MOZ_EXT_texture_filter_anisotropic")||k.getExtension("WEBKIT_EXT_texture_filter_anisotropic");na=k.getExtension("WEBGL_compressed_texture_s3tc")||k.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||k.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");Rb||console.log("THREE.WebGLRenderer: Float textures not supported.");Yb||console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
fb||console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported.");na||console.log("THREE.WebGLRenderer: S3TC compressed textures not supported.");void 0===k.getShaderPrecisionFormat&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}});k.clearColor(0,0,0,1);k.clearDepth(1);k.clearStencil(0);k.enable(k.DEPTH_TEST);k.depthFunc(k.LEQUAL);k.frontFace(k.CCW);k.cullFace(k.BACK);k.enable(k.CULL_FACE);k.enable(k.BLEND);k.blendEquation(k.FUNC_ADD);k.blendFunc(k.SRC_ALPHA,
k.ONE_MINUS_SRC_ALPHA);k.clearColor(Fa.r,Fa.g,Fa.b,wa);this.context=k;var ib=k.getParameter(k.MAX_TEXTURE_IMAGE_UNITS),Tb=k.getParameter(k.MAX_VERTEX_TEXTURE_IMAGE_UNITS);k.getParameter(k.MAX_TEXTURE_SIZE);var Ub=k.getParameter(k.MAX_CUBE_MAP_TEXTURE_SIZE),Xa=fb?k.getParameter(fb.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0,Gb=0<Tb,Bb=Gb&&Rb;na&&k.getParameter(k.COMPRESSED_TEXTURE_FORMATS);var Kb=k.getShaderPrecisionFormat(k.VERTEX_SHADER,k.HIGH_FLOAT),Ka=k.getShaderPrecisionFormat(k.VERTEX_SHADER,k.MEDIUM_FLOAT);
k.getShaderPrecisionFormat(k.VERTEX_SHADER,k.LOW_FLOAT);var Sb=k.getShaderPrecisionFormat(k.FRAGMENT_SHADER,k.HIGH_FLOAT),Lb=k.getShaderPrecisionFormat(k.FRAGMENT_SHADER,k.MEDIUM_FLOAT);k.getShaderPrecisionFormat(k.FRAGMENT_SHADER,k.LOW_FLOAT);k.getShaderPrecisionFormat(k.VERTEX_SHADER,k.HIGH_INT);k.getShaderPrecisionFormat(k.VERTEX_SHADER,k.MEDIUM_INT);k.getShaderPrecisionFormat(k.VERTEX_SHADER,k.LOW_INT);k.getShaderPrecisionFormat(k.FRAGMENT_SHADER,k.HIGH_INT);k.getShaderPrecisionFormat(k.FRAGMENT_SHADER,
k.MEDIUM_INT);k.getShaderPrecisionFormat(k.FRAGMENT_SHADER,k.LOW_INT);var Hb=0<Kb.precision&&0<Sb.precision,kc=0<Ka.precision&&0<Lb.precision;"highp"===L&&!Hb&&(kc?(L="mediump",console.warn("WebGLRenderer: highp not supported, using mediump")):(L="lowp",console.warn("WebGLRenderer: highp and mediump not supported, using lowp")));"mediump"===L&&!kc&&(L="lowp",console.warn("WebGLRenderer: mediump not supported, using lowp"));this.getContext=function(){return k};this.supportsVertexTextures=function(){return Gb};
this.supportsFloatTextures=function(){return Rb};this.supportsStandardDerivatives=function(){return Yb};this.supportsCompressedTextureS3TC=function(){return na};this.getMaxAnisotropy=function(){return Xa};this.getPrecision=function(){return L};this.setSize=function(a,b,c){Z.width=a*this.devicePixelRatio;Z.height=b*this.devicePixelRatio;1!==this.devicePixelRatio&&!1!==c&&(Z.style.width=a+"px",Z.style.height=b+"px");this.setViewport(0,0,Z.width,Z.height)};this.setViewport=function(a,b,c,d){ua=void 0!==
a?a:0;Ra=void 0!==b?b:0;Qa=void 0!==c?c:Z.width;Ya=void 0!==d?d:Z.height;k.viewport(ua,Ra,Qa,Ya)};this.setScissor=function(a,b,c,d){k.scissor(a,b,c,d)};this.enableScissorTest=function(a){a?k.enable(k.SCISSOR_TEST):k.disable(k.SCISSOR_TEST)};this.setClearColor=function(a,b){Fa.set(a);wa=void 0!==b?b:1;k.clearColor(Fa.r,Fa.g,Fa.b,wa)};this.setClearColorHex=function(a,b){console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead.");this.setClearColor(a,b)};this.getClearColor=
function(){return Fa};this.getClearAlpha=function(){return wa};this.clear=function(a,b,c){var d=0;if(void 0===a||a)d|=k.COLOR_BUFFER_BIT;if(void 0===b||b)d|=k.DEPTH_BUFFER_BIT;if(void 0===c||c)d|=k.STENCIL_BUFFER_BIT;k.clear(d)};this.clearTarget=function(a,b,c,d){this.setRenderTarget(a);this.clear(b,c,d)};this.addPostPlugin=function(a){a.init(this);this.renderPluginsPost.push(a)};this.addPrePlugin=function(a){a.init(this);this.renderPluginsPre.push(a)};this.updateShadowMap=function(a,b){pa=null;pb=
ub=bb=xa=aa=-1;yb=!0;T=da=-1;this.shadowMapPlugin.update(a,b)};var lc=function(a){a=a.target;a.removeEventListener("dispose",lc);a.__webglInit=void 0;void 0!==a.__webglVertexBuffer&&k.deleteBuffer(a.__webglVertexBuffer);void 0!==a.__webglNormalBuffer&&k.deleteBuffer(a.__webglNormalBuffer);void 0!==a.__webglTangentBuffer&&k.deleteBuffer(a.__webglTangentBuffer);void 0!==a.__webglColorBuffer&&k.deleteBuffer(a.__webglColorBuffer);void 0!==a.__webglUVBuffer&&k.deleteBuffer(a.__webglUVBuffer);void 0!==
a.__webglUV2Buffer&&k.deleteBuffer(a.__webglUV2Buffer);void 0!==a.__webglSkinIndicesBuffer&&k.deleteBuffer(a.__webglSkinIndicesBuffer);void 0!==a.__webglSkinWeightsBuffer&&k.deleteBuffer(a.__webglSkinWeightsBuffer);void 0!==a.__webglFaceBuffer&&k.deleteBuffer(a.__webglFaceBuffer);void 0!==a.__webglLineBuffer&&k.deleteBuffer(a.__webglLineBuffer);void 0!==a.__webglLineDistanceBuffer&&k.deleteBuffer(a.__webglLineDistanceBuffer);if(void 0!==a.geometryGroups)for(var c in a.geometryGroups){var d=a.geometryGroups[c];
if(void 0!==d.numMorphTargets)for(var e=0,f=d.numMorphTargets;e<f;e++)k.deleteBuffer(d.__webglMorphTargetsBuffers[e]);if(void 0!==d.numMorphNormals){e=0;for(f=d.numMorphNormals;e<f;e++)k.deleteBuffer(d.__webglMorphNormalsBuffers[e])}b(d)}b(a);D.info.memory.geometries--},gc=function(a){a=a.target;a.removeEventListener("dispose",gc);a.image&&a.image.__webglTextureCube?k.deleteTexture(a.image.__webglTextureCube):a.__webglInit&&(a.__webglInit=!1,k.deleteTexture(a.__webglTexture));D.info.memory.textures--},
mc=function(a){a=a.target;a.removeEventListener("dispose",mc);if(a&&a.__webglTexture)if(k.deleteTexture(a.__webglTexture),a instanceof THREE.WebGLRenderTargetCube)for(var b=0;6>b;b++)k.deleteFramebuffer(a.__webglFramebuffer[b]),k.deleteRenderbuffer(a.__webglRenderbuffer[b]);else k.deleteFramebuffer(a.__webglFramebuffer),k.deleteRenderbuffer(a.__webglRenderbuffer);D.info.memory.textures--},uc=function(a){a=a.target;a.removeEventListener("dispose",uc);vc(a)},vc=function(a){var b=a.program;if(void 0!==
b){a.program=void 0;var c,d,e=!1,a=0;for(c=V.length;a<c;a++)if(d=V[a],d.program===b){d.usedTimes--;0===d.usedTimes&&(e=!0);break}if(!0===e){e=[];a=0;for(c=V.length;a<c;a++)d=V[a],d.program!==b&&e.push(d);V=e;k.deleteProgram(b);D.info.memory.programs--}}};this.renderBufferImmediate=function(a,b,c){a.hasPositions&&!a.__webglVertexBuffer&&(a.__webglVertexBuffer=k.createBuffer());a.hasNormals&&!a.__webglNormalBuffer&&(a.__webglNormalBuffer=k.createBuffer());a.hasUvs&&!a.__webglUvBuffer&&(a.__webglUvBuffer=
k.createBuffer());a.hasColors&&!a.__webglColorBuffer&&(a.__webglColorBuffer=k.createBuffer());a.hasPositions&&(k.bindBuffer(k.ARRAY_BUFFER,a.__webglVertexBuffer),k.bufferData(k.ARRAY_BUFFER,a.positionArray,k.DYNAMIC_DRAW),k.enableVertexAttribArray(b.attributes.position),k.vertexAttribPointer(b.attributes.position,3,k.FLOAT,!1,0,0));if(a.hasNormals){k.bindBuffer(k.ARRAY_BUFFER,a.__webglNormalBuffer);if(c.shading===THREE.FlatShading){var d,e,f,h,g,i,j,l,n,m,p,q=3*a.count;for(p=0;p<q;p+=9)m=a.normalArray,
d=m[p],e=m[p+1],f=m[p+2],h=m[p+3],i=m[p+4],l=m[p+5],g=m[p+6],j=m[p+7],n=m[p+8],d=(d+h+g)/3,e=(e+i+j)/3,f=(f+l+n)/3,m[p]=d,m[p+1]=e,m[p+2]=f,m[p+3]=d,m[p+4]=e,m[p+5]=f,m[p+6]=d,m[p+7]=e,m[p+8]=f}k.bufferData(k.ARRAY_BUFFER,a.normalArray,k.DYNAMIC_DRAW);k.enableVertexAttribArray(b.attributes.normal);k.vertexAttribPointer(b.attributes.normal,3,k.FLOAT,!1,0,0)}a.hasUvs&&c.map&&(k.bindBuffer(k.ARRAY_BUFFER,a.__webglUvBuffer),k.bufferData(k.ARRAY_BUFFER,a.uvArray,k.DYNAMIC_DRAW),k.enableVertexAttribArray(b.attributes.uv),
k.vertexAttribPointer(b.attributes.uv,2,k.FLOAT,!1,0,0));a.hasColors&&c.vertexColors!==THREE.NoColors&&(k.bindBuffer(k.ARRAY_BUFFER,a.__webglColorBuffer),k.bufferData(k.ARRAY_BUFFER,a.colorArray,k.DYNAMIC_DRAW),k.enableVertexAttribArray(b.attributes.color),k.vertexAttribPointer(b.attributes.color,3,k.FLOAT,!1,0,0));k.drawArrays(k.TRIANGLES,0,a.count);a.count=0};this.renderBufferDirect=function(a,b,c,d,e,f){if(!1!==d.visible){var h,j,l,n;h=C(a,b,c,d,f);b=h.attributes;a=e.attributes;c=!1;h=16777215*
e.id+2*h.id+(d.wireframe?1:0);h!==ub&&(ub=h,c=!0);c&&i();if(f instanceof THREE.Mesh)if(d=a.index){e=e.offsets;1<e.length&&(c=!0);for(var f=0,m=e.length;f<m;f++){var p=e[f].index;if(c){for(j in a)"index"!==j&&(l=b[j],h=a[j],n=h.itemSize,0<=l&&(k.bindBuffer(k.ARRAY_BUFFER,h.buffer),g(l),k.vertexAttribPointer(l,n,k.FLOAT,!1,0,4*p*n)));k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,d.buffer)}k.drawElements(k.TRIANGLES,e[f].count,k.UNSIGNED_SHORT,2*e[f].start);D.info.render.calls++;D.info.render.vertices+=e[f].count;
D.info.render.faces+=e[f].count/3}}else{if(c)for(j in a)"index"!==j&&(l=b[j],h=a[j],n=h.itemSize,0<=l&&(k.bindBuffer(k.ARRAY_BUFFER,h.buffer),g(l),k.vertexAttribPointer(l,n,k.FLOAT,!1,0,0)));a=e.attributes.position;k.drawArrays(k.TRIANGLES,0,a.numItems/3);D.info.render.calls++;D.info.render.vertices+=a.numItems/3;D.info.render.faces+=a.numItems/3/3}else if(f instanceof THREE.ParticleSystem){if(c){for(j in a)l=b[j],h=a[j],n=h.itemSize,0<=l&&(k.bindBuffer(k.ARRAY_BUFFER,h.buffer),g(l),k.vertexAttribPointer(l,
n,k.FLOAT,!1,0,0));a=a.position;k.drawArrays(k.POINTS,0,a.numItems/3);D.info.render.calls++;D.info.render.points+=a.numItems/3}}else if(f instanceof THREE.Line&&c){for(j in a)l=b[j],h=a[j],n=h.itemSize,0<=l&&(k.bindBuffer(k.ARRAY_BUFFER,h.buffer),g(l),k.vertexAttribPointer(l,n,k.FLOAT,!1,0,0));j=f.type===THREE.LineStrip?k.LINE_STRIP:k.LINES;A(d.linewidth);a=a.position;k.drawArrays(j,0,a.numItems/3);D.info.render.calls++;D.info.render.points+=a.numItems}}};this.renderBuffer=function(a,b,c,d,e,f){if(!1!==
d.visible){var h,j,c=C(a,b,c,d,f),a=c.attributes,b=!1,c=16777215*e.id+2*c.id+(d.wireframe?1:0);c!==ub&&(ub=c,b=!0);b&&i();if(!d.morphTargets&&0<=a.position)b&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglVertexBuffer),g(a.position),k.vertexAttribPointer(a.position,3,k.FLOAT,!1,0,0));else if(f.morphTargetBase){c=d.program.attributes;-1!==f.morphTargetBase&&0<=c.position?(k.bindBuffer(k.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[f.morphTargetBase]),g(c.position),k.vertexAttribPointer(c.position,3,k.FLOAT,!1,
0,0)):0<=c.position&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglVertexBuffer),g(c.position),k.vertexAttribPointer(c.position,3,k.FLOAT,!1,0,0));if(f.morphTargetForcedOrder.length){var n=0;j=f.morphTargetForcedOrder;for(h=f.morphTargetInfluences;n<d.numSupportedMorphTargets&&n<j.length;)0<=c["morphTarget"+n]&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglMorphTargetsBuffers[j[n]]),g(c["morphTarget"+n]),k.vertexAttribPointer(c["morphTarget"+n],3,k.FLOAT,!1,0,0)),0<=c["morphNormal"+n]&&d.morphNormals&&(k.bindBuffer(k.ARRAY_BUFFER,
e.__webglMorphNormalsBuffers[j[n]]),g(c["morphNormal"+n]),k.vertexAttribPointer(c["morphNormal"+n],3,k.FLOAT,!1,0,0)),f.__webglMorphTargetInfluences[n]=h[j[n]],n++}else{j=[];h=f.morphTargetInfluences;var m,p=h.length;for(m=0;m<p;m++)n=h[m],0<n&&j.push([n,m]);j.length>d.numSupportedMorphTargets?(j.sort(l),j.length=d.numSupportedMorphTargets):j.length>d.numSupportedMorphNormals?j.sort(l):0===j.length&&j.push([0,0]);for(n=0;n<d.numSupportedMorphTargets;)j[n]?(m=j[n][1],0<=c["morphTarget"+n]&&(k.bindBuffer(k.ARRAY_BUFFER,
e.__webglMorphTargetsBuffers[m]),g(c["morphTarget"+n]),k.vertexAttribPointer(c["morphTarget"+n],3,k.FLOAT,!1,0,0)),0<=c["morphNormal"+n]&&d.morphNormals&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglMorphNormalsBuffers[m]),g(c["morphNormal"+n]),k.vertexAttribPointer(c["morphNormal"+n],3,k.FLOAT,!1,0,0)),f.__webglMorphTargetInfluences[n]=h[m]):f.__webglMorphTargetInfluences[n]=0,n++}null!==d.program.uniforms.morphTargetInfluences&&k.uniform1fv(d.program.uniforms.morphTargetInfluences,f.__webglMorphTargetInfluences)}if(b){if(e.__webglCustomAttributesList){h=
0;for(j=e.__webglCustomAttributesList.length;h<j;h++)c=e.__webglCustomAttributesList[h],0<=a[c.buffer.belongsToAttribute]&&(k.bindBuffer(k.ARRAY_BUFFER,c.buffer),g(a[c.buffer.belongsToAttribute]),k.vertexAttribPointer(a[c.buffer.belongsToAttribute],c.size,k.FLOAT,!1,0,0))}0<=a.color&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglColorBuffer),g(a.color),k.vertexAttribPointer(a.color,3,k.FLOAT,!1,0,0));0<=a.normal&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglNormalBuffer),g(a.normal),k.vertexAttribPointer(a.normal,
3,k.FLOAT,!1,0,0));0<=a.tangent&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglTangentBuffer),g(a.tangent),k.vertexAttribPointer(a.tangent,4,k.FLOAT,!1,0,0));0<=a.uv&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglUVBuffer),g(a.uv),k.vertexAttribPointer(a.uv,2,k.FLOAT,!1,0,0));0<=a.uv2&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglUV2Buffer),g(a.uv2),k.vertexAttribPointer(a.uv2,2,k.FLOAT,!1,0,0));d.skinning&&(0<=a.skinIndex&&0<=a.skinWeight)&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglSkinIndicesBuffer),g(a.skinIndex),k.vertexAttribPointer(a.skinIndex,
4,k.FLOAT,!1,0,0),k.bindBuffer(k.ARRAY_BUFFER,e.__webglSkinWeightsBuffer),g(a.skinWeight),k.vertexAttribPointer(a.skinWeight,4,k.FLOAT,!1,0,0));0<=a.lineDistance&&(k.bindBuffer(k.ARRAY_BUFFER,e.__webglLineDistanceBuffer),g(a.lineDistance),k.vertexAttribPointer(a.lineDistance,1,k.FLOAT,!1,0,0))}f instanceof THREE.Mesh?(d.wireframe?(A(d.wireframeLinewidth),b&&k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,e.__webglLineBuffer),k.drawElements(k.LINES,e.__webglLineCount,k.UNSIGNED_SHORT,0)):(b&&k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,
e.__webglFaceBuffer),k.drawElements(k.TRIANGLES,e.__webglFaceCount,k.UNSIGNED_SHORT,0)),D.info.render.calls++,D.info.render.vertices+=e.__webglFaceCount,D.info.render.faces+=e.__webglFaceCount/3):f instanceof THREE.Line?(f=f.type===THREE.LineStrip?k.LINE_STRIP:k.LINES,A(d.linewidth),k.drawArrays(f,0,e.__webglLineCount),D.info.render.calls++):f instanceof THREE.ParticleSystem?(k.drawArrays(k.POINTS,0,e.__webglParticleCount),D.info.render.calls++,D.info.render.points+=e.__webglParticleCount):f instanceof
THREE.Ribbon&&(k.drawArrays(k.TRIANGLE_STRIP,0,e.__webglVertexCount),D.info.render.calls++)}};this.render=function(a,b,c,d){if(!1===b instanceof THREE.Camera)console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");else{var e,f,h,g,i=a.__lights,l=a.fog;pb=-1;yb=!0;!0===a.autoUpdate&&a.updateMatrixWorld();void 0===b.parent&&b.updateMatrixWorld();b.matrixWorldInverse.getInverse(b.matrixWorld);xb.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse);Sa.setFromMatrix(xb);
this.autoUpdateObjects&&this.initWebGLObjects(a);n(this.renderPluginsPre,a,b);D.info.render.calls=0;D.info.render.vertices=0;D.info.render.faces=0;D.info.render.points=0;this.setRenderTarget(c);(this.autoClear||d)&&this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil);g=a.__webglObjects;d=0;for(e=g.length;d<e;d++)if(f=g[d],h=f.object,f.id=d,f.render=!1,h.visible&&(!(h instanceof THREE.Mesh||h instanceof THREE.ParticleSystem)||!h.frustumCulled||Sa.intersectsObject(h))){var p=h;
p._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,p.matrixWorld);p._normalMatrix.getNormalMatrix(p._modelViewMatrix);var p=f,r=p.buffer,s=void 0,t=s=void 0,t=p.object.material;if(t instanceof THREE.MeshFaceMaterial)s=r.materialIndex,s=t.materials[s],s.transparent?(p.transparent=s,p.opaque=null):(p.opaque=s,p.transparent=null);else if(s=t)s.transparent?(p.transparent=s,p.opaque=null):(p.opaque=s,p.transparent=null);f.render=!0;!0===this.sortObjects&&(null!==h.renderDepth?f.z=h.renderDepth:(Ga.getPositionFromMatrix(h.matrixWorld),
Ga.applyProjection(xb),f.z=Ga.z))}this.sortObjects&&g.sort(j);g=a.__webglObjectsImmediate;d=0;for(e=g.length;d<e;d++)f=g[d],h=f.object,h.visible&&(h._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,h.matrixWorld),h._normalMatrix.getNormalMatrix(h._modelViewMatrix),h=f.object.material,h.transparent?(f.transparent=h,f.opaque=null):(f.opaque=h,f.transparent=null));a.overrideMaterial?(d=a.overrideMaterial,this.setBlending(d.blending,d.blendEquation,d.blendSrc,d.blendDst),this.setDepthTest(d.depthTest),
this.setDepthWrite(d.depthWrite),K(d.polygonOffset,d.polygonOffsetFactor,d.polygonOffsetUnits),m(a.__webglObjects,!1,"",b,i,l,!0,d),q(a.__webglObjectsImmediate,"",b,i,l,!1,d)):(d=null,this.setBlending(THREE.NoBlending),m(a.__webglObjects,!0,"opaque",b,i,l,!1,d),q(a.__webglObjectsImmediate,"opaque",b,i,l,!1,d),m(a.__webglObjects,!1,"transparent",b,i,l,!0,d),q(a.__webglObjectsImmediate,"transparent",b,i,l,!0,d));n(this.renderPluginsPost,a,b);c&&(c.generateMipmaps&&c.minFilter!==THREE.NearestFilter&&
c.minFilter!==THREE.LinearFilter)&&(c instanceof THREE.WebGLRenderTargetCube?(k.bindTexture(k.TEXTURE_CUBE_MAP,c.__webglTexture),k.generateMipmap(k.TEXTURE_CUBE_MAP),k.bindTexture(k.TEXTURE_CUBE_MAP,null)):(k.bindTexture(k.TEXTURE_2D,c.__webglTexture),k.generateMipmap(k.TEXTURE_2D),k.bindTexture(k.TEXTURE_2D,null)));this.setDepthTest(!0);this.setDepthWrite(!0)}};this.renderImmediateObject=function(a,b,c,d,e){var f=C(a,b,c,d,e);ub=-1;D.setMaterialFaces(d);e.immediateRenderCallback?e.immediateRenderCallback(f,
k,Sa):e.render(function(a){D.renderBufferImmediate(a,f,d)})};this.initWebGLObjects=function(a){a.__webglObjects||(a.__webglObjects=[],a.__webglObjectsImmediate=[],a.__webglSprites=[],a.__webglFlares=[]);for(;a.__objectsAdded.length;)t(a.__objectsAdded[0],a),a.__objectsAdded.splice(0,1);for(;a.__objectsRemoved.length;)v(a.__objectsRemoved[0],a),a.__objectsRemoved.splice(0,1);for(var b=0,c=a.__webglObjects.length;b<c;b++){var g=a.__webglObjects[b].object;void 0===g.__webglInit&&(void 0!==g.__webglActive&&
v(g,a),t(g,a));var i=g,j=i.geometry,n=void 0,m=void 0,p=void 0;if(j instanceof THREE.BufferGeometry){var q=k.DYNAMIC_DRAW,w=!j.dynamic,z=j.attributes,y=void 0,A=void 0;for(y in z)A=z[y],A.needsUpdate&&("index"===y?(k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,A.buffer),k.bufferData(k.ELEMENT_ARRAY_BUFFER,A.array,q)):(k.bindBuffer(k.ARRAY_BUFFER,A.buffer),k.bufferData(k.ARRAY_BUFFER,A.array,q)),A.needsUpdate=!1),w&&!A.dynamic&&(A.array=null)}else if(i instanceof THREE.Mesh){for(var B=0,G=j.geometryGroupsList.length;B<
G;B++)if(n=j.geometryGroupsList[B],p=e(i,n),j.buffersNeedUpdate&&d(n,i),m=p.attributes&&r(p),j.verticesNeedUpdate||j.morphTargetsNeedUpdate||j.elementsNeedUpdate||j.uvsNeedUpdate||j.normalsNeedUpdate||j.colorsNeedUpdate||j.tangentsNeedUpdate||m){var C=n,F=i,H=k.DYNAMIC_DRAW,I=!j.dynamic,J=p;if(C.__inittedArrays){var V=f(J),K=J.vertexColors?J.vertexColors:!1,L=h(J),M=V===THREE.SmoothShading,E=void 0,D=void 0,N=void 0,Q=void 0,O=void 0,ea=void 0,T=void 0,Y=void 0,pa=void 0,fa=void 0,aa=void 0,R=void 0,
S=void 0,P=void 0,ba=void 0,Z=void 0,da=void 0,ya=void 0,ma=void 0,Ha=void 0,ha=void 0,Ua=void 0,qa=void 0,la=void 0,ia=void 0,ka=void 0,ua=void 0,na=void 0,oa=void 0,ra=void 0,Ca=void 0,va=void 0,wa=void 0,xa=void 0,pb=void 0,za=void 0,ub=void 0,Fa=void 0,Pa=void 0,Ra=void 0,cb=void 0,bb=void 0,$a=void 0,ab=void 0,Va=void 0,Qa=void 0,Ta=0,Za=0,Xa=0,Ya=0,Ka=0,jb=0,Da=0,ob=0,Wa=0,X=0,ga=0,x=0,Aa=void 0,db=C.__vertexArray,fb=C.__uvArray,ib=C.__uv2Array,Sa=C.__normalArray,La=C.__tangentArray,eb=C.__colorArray,
Ma=C.__skinIndexArray,Na=C.__skinWeightArray,yb=C.__morphTargetsArrays,Ab=C.__morphNormalsArrays,Bb=C.__webglCustomAttributesList,u=void 0,Mb=C.__faceArray,wb=C.__lineArray,qb=F.geometry,Gb=qb.elementsNeedUpdate,Hb=qb.uvsNeedUpdate,Rb=qb.normalsNeedUpdate,Sb=qb.tangentsNeedUpdate,Xb=qb.colorsNeedUpdate,Yb=qb.morphTargetsNeedUpdate,cc=qb.vertices,sa=C.faces3,ta=C.faces4,kb=qb.faces,Jb=qb.faceVertexUvs[0],Lb=qb.faceVertexUvs[1],dc=qb.skinIndices,$b=qb.skinWeights,ac=qb.morphTargets,Ib=qb.morphNormals;
if(qb.verticesNeedUpdate){E=0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],R=cc[Q.a],S=cc[Q.b],P=cc[Q.c],db[Za]=R.x,db[Za+1]=R.y,db[Za+2]=R.z,db[Za+3]=S.x,db[Za+4]=S.y,db[Za+5]=S.z,db[Za+6]=P.x,db[Za+7]=P.y,db[Za+8]=P.z,Za+=9;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],R=cc[Q.a],S=cc[Q.b],P=cc[Q.c],ba=cc[Q.d],db[Za]=R.x,db[Za+1]=R.y,db[Za+2]=R.z,db[Za+3]=S.x,db[Za+4]=S.y,db[Za+5]=S.z,db[Za+6]=P.x,db[Za+7]=P.y,db[Za+8]=P.z,db[Za+9]=ba.x,db[Za+10]=ba.y,db[Za+11]=ba.z,Za+=12;k.bindBuffer(k.ARRAY_BUFFER,C.__webglVertexBuffer);
k.bufferData(k.ARRAY_BUFFER,db,H)}if(Yb){cb=0;for(bb=ac.length;cb<bb;cb++){E=ga=0;for(D=sa.length;E<D;E++)Va=sa[E],Q=kb[Va],R=ac[cb].vertices[Q.a],S=ac[cb].vertices[Q.b],P=ac[cb].vertices[Q.c],$a=yb[cb],$a[ga]=R.x,$a[ga+1]=R.y,$a[ga+2]=R.z,$a[ga+3]=S.x,$a[ga+4]=S.y,$a[ga+5]=S.z,$a[ga+6]=P.x,$a[ga+7]=P.y,$a[ga+8]=P.z,J.morphNormals&&(M?(Qa=Ib[cb].vertexNormals[Va],Ha=Qa.a,ha=Qa.b,Ua=Qa.c):Ua=ha=Ha=Ib[cb].faceNormals[Va],ab=Ab[cb],ab[ga]=Ha.x,ab[ga+1]=Ha.y,ab[ga+2]=Ha.z,ab[ga+3]=ha.x,ab[ga+4]=ha.y,
ab[ga+5]=ha.z,ab[ga+6]=Ua.x,ab[ga+7]=Ua.y,ab[ga+8]=Ua.z),ga+=9;E=0;for(D=ta.length;E<D;E++)Va=ta[E],Q=kb[Va],R=ac[cb].vertices[Q.a],S=ac[cb].vertices[Q.b],P=ac[cb].vertices[Q.c],ba=ac[cb].vertices[Q.d],$a=yb[cb],$a[ga]=R.x,$a[ga+1]=R.y,$a[ga+2]=R.z,$a[ga+3]=S.x,$a[ga+4]=S.y,$a[ga+5]=S.z,$a[ga+6]=P.x,$a[ga+7]=P.y,$a[ga+8]=P.z,$a[ga+9]=ba.x,$a[ga+10]=ba.y,$a[ga+11]=ba.z,J.morphNormals&&(M?(Qa=Ib[cb].vertexNormals[Va],Ha=Qa.a,ha=Qa.b,Ua=Qa.c,qa=Qa.d):qa=Ua=ha=Ha=Ib[cb].faceNormals[Va],ab=Ab[cb],ab[ga]=
Ha.x,ab[ga+1]=Ha.y,ab[ga+2]=Ha.z,ab[ga+3]=ha.x,ab[ga+4]=ha.y,ab[ga+5]=ha.z,ab[ga+6]=Ua.x,ab[ga+7]=Ua.y,ab[ga+8]=Ua.z,ab[ga+9]=qa.x,ab[ga+10]=qa.y,ab[ga+11]=qa.z),ga+=12;k.bindBuffer(k.ARRAY_BUFFER,C.__webglMorphTargetsBuffers[cb]);k.bufferData(k.ARRAY_BUFFER,yb[cb],H);J.morphNormals&&(k.bindBuffer(k.ARRAY_BUFFER,C.__webglMorphNormalsBuffers[cb]),k.bufferData(k.ARRAY_BUFFER,Ab[cb],H))}}if($b.length){E=0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],na=$b[Q.a],oa=$b[Q.b],ra=$b[Q.c],Na[X]=na.x,Na[X+1]=na.y,Na[X+
2]=na.z,Na[X+3]=na.w,Na[X+4]=oa.x,Na[X+5]=oa.y,Na[X+6]=oa.z,Na[X+7]=oa.w,Na[X+8]=ra.x,Na[X+9]=ra.y,Na[X+10]=ra.z,Na[X+11]=ra.w,va=dc[Q.a],wa=dc[Q.b],xa=dc[Q.c],Ma[X]=va.x,Ma[X+1]=va.y,Ma[X+2]=va.z,Ma[X+3]=va.w,Ma[X+4]=wa.x,Ma[X+5]=wa.y,Ma[X+6]=wa.z,Ma[X+7]=wa.w,Ma[X+8]=xa.x,Ma[X+9]=xa.y,Ma[X+10]=xa.z,Ma[X+11]=xa.w,X+=12;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],na=$b[Q.a],oa=$b[Q.b],ra=$b[Q.c],Ca=$b[Q.d],Na[X]=na.x,Na[X+1]=na.y,Na[X+2]=na.z,Na[X+3]=na.w,Na[X+4]=oa.x,Na[X+5]=oa.y,Na[X+6]=oa.z,Na[X+7]=
oa.w,Na[X+8]=ra.x,Na[X+9]=ra.y,Na[X+10]=ra.z,Na[X+11]=ra.w,Na[X+12]=Ca.x,Na[X+13]=Ca.y,Na[X+14]=Ca.z,Na[X+15]=Ca.w,va=dc[Q.a],wa=dc[Q.b],xa=dc[Q.c],pb=dc[Q.d],Ma[X]=va.x,Ma[X+1]=va.y,Ma[X+2]=va.z,Ma[X+3]=va.w,Ma[X+4]=wa.x,Ma[X+5]=wa.y,Ma[X+6]=wa.z,Ma[X+7]=wa.w,Ma[X+8]=xa.x,Ma[X+9]=xa.y,Ma[X+10]=xa.z,Ma[X+11]=xa.w,Ma[X+12]=pb.x,Ma[X+13]=pb.y,Ma[X+14]=pb.z,Ma[X+15]=pb.w,X+=16;0<X&&(k.bindBuffer(k.ARRAY_BUFFER,C.__webglSkinIndicesBuffer),k.bufferData(k.ARRAY_BUFFER,Ma,H),k.bindBuffer(k.ARRAY_BUFFER,
C.__webglSkinWeightsBuffer),k.bufferData(k.ARRAY_BUFFER,Na,H))}if(Xb&&K){E=0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],T=Q.vertexColors,Y=Q.color,3===T.length&&K===THREE.VertexColors?(la=T[0],ia=T[1],ka=T[2]):ka=ia=la=Y,eb[Wa]=la.r,eb[Wa+1]=la.g,eb[Wa+2]=la.b,eb[Wa+3]=ia.r,eb[Wa+4]=ia.g,eb[Wa+5]=ia.b,eb[Wa+6]=ka.r,eb[Wa+7]=ka.g,eb[Wa+8]=ka.b,Wa+=9;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],T=Q.vertexColors,Y=Q.color,4===T.length&&K===THREE.VertexColors?(la=T[0],ia=T[1],ka=T[2],ua=T[3]):ua=ka=ia=la=Y,eb[Wa]=
la.r,eb[Wa+1]=la.g,eb[Wa+2]=la.b,eb[Wa+3]=ia.r,eb[Wa+4]=ia.g,eb[Wa+5]=ia.b,eb[Wa+6]=ka.r,eb[Wa+7]=ka.g,eb[Wa+8]=ka.b,eb[Wa+9]=ua.r,eb[Wa+10]=ua.g,eb[Wa+11]=ua.b,Wa+=12;0<Wa&&(k.bindBuffer(k.ARRAY_BUFFER,C.__webglColorBuffer),k.bufferData(k.ARRAY_BUFFER,eb,H))}if(Sb&&qb.hasTangents){E=0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],pa=Q.vertexTangents,Z=pa[0],da=pa[1],ya=pa[2],La[Da]=Z.x,La[Da+1]=Z.y,La[Da+2]=Z.z,La[Da+3]=Z.w,La[Da+4]=da.x,La[Da+5]=da.y,La[Da+6]=da.z,La[Da+7]=da.w,La[Da+8]=ya.x,La[Da+9]=ya.y,
La[Da+10]=ya.z,La[Da+11]=ya.w,Da+=12;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],pa=Q.vertexTangents,Z=pa[0],da=pa[1],ya=pa[2],ma=pa[3],La[Da]=Z.x,La[Da+1]=Z.y,La[Da+2]=Z.z,La[Da+3]=Z.w,La[Da+4]=da.x,La[Da+5]=da.y,La[Da+6]=da.z,La[Da+7]=da.w,La[Da+8]=ya.x,La[Da+9]=ya.y,La[Da+10]=ya.z,La[Da+11]=ya.w,La[Da+12]=ma.x,La[Da+13]=ma.y,La[Da+14]=ma.z,La[Da+15]=ma.w,Da+=16;k.bindBuffer(k.ARRAY_BUFFER,C.__webglTangentBuffer);k.bufferData(k.ARRAY_BUFFER,La,H)}if(Rb&&V){E=0;for(D=sa.length;E<D;E++)if(Q=kb[sa[E]],
O=Q.vertexNormals,ea=Q.normal,3===O.length&&M)for(za=0;3>za;za++)Fa=O[za],Sa[jb]=Fa.x,Sa[jb+1]=Fa.y,Sa[jb+2]=Fa.z,jb+=3;else for(za=0;3>za;za++)Sa[jb]=ea.x,Sa[jb+1]=ea.y,Sa[jb+2]=ea.z,jb+=3;E=0;for(D=ta.length;E<D;E++)if(Q=kb[ta[E]],O=Q.vertexNormals,ea=Q.normal,4===O.length&&M)for(za=0;4>za;za++)Fa=O[za],Sa[jb]=Fa.x,Sa[jb+1]=Fa.y,Sa[jb+2]=Fa.z,jb+=3;else for(za=0;4>za;za++)Sa[jb]=ea.x,Sa[jb+1]=ea.y,Sa[jb+2]=ea.z,jb+=3;k.bindBuffer(k.ARRAY_BUFFER,C.__webglNormalBuffer);k.bufferData(k.ARRAY_BUFFER,
Sa,H)}if(Hb&&Jb&&L){E=0;for(D=sa.length;E<D;E++)if(N=sa[E],fa=Jb[N],void 0!==fa)for(za=0;3>za;za++)Pa=fa[za],fb[Xa]=Pa.x,fb[Xa+1]=Pa.y,Xa+=2;E=0;for(D=ta.length;E<D;E++)if(N=ta[E],fa=Jb[N],void 0!==fa)for(za=0;4>za;za++)Pa=fa[za],fb[Xa]=Pa.x,fb[Xa+1]=Pa.y,Xa+=2;0<Xa&&(k.bindBuffer(k.ARRAY_BUFFER,C.__webglUVBuffer),k.bufferData(k.ARRAY_BUFFER,fb,H))}if(Hb&&Lb&&L){E=0;for(D=sa.length;E<D;E++)if(N=sa[E],aa=Lb[N],void 0!==aa)for(za=0;3>za;za++)Ra=aa[za],ib[Ya]=Ra.x,ib[Ya+1]=Ra.y,Ya+=2;E=0;for(D=ta.length;E<
D;E++)if(N=ta[E],aa=Lb[N],void 0!==aa)for(za=0;4>za;za++)Ra=aa[za],ib[Ya]=Ra.x,ib[Ya+1]=Ra.y,Ya+=2;0<Ya&&(k.bindBuffer(k.ARRAY_BUFFER,C.__webglUV2Buffer),k.bufferData(k.ARRAY_BUFFER,ib,H))}if(Gb){E=0;for(D=sa.length;E<D;E++)Mb[Ka]=Ta,Mb[Ka+1]=Ta+1,Mb[Ka+2]=Ta+2,Ka+=3,wb[ob]=Ta,wb[ob+1]=Ta+1,wb[ob+2]=Ta,wb[ob+3]=Ta+2,wb[ob+4]=Ta+1,wb[ob+5]=Ta+2,ob+=6,Ta+=3;E=0;for(D=ta.length;E<D;E++)Mb[Ka]=Ta,Mb[Ka+1]=Ta+1,Mb[Ka+2]=Ta+3,Mb[Ka+3]=Ta+1,Mb[Ka+4]=Ta+2,Mb[Ka+5]=Ta+3,Ka+=6,wb[ob]=Ta,wb[ob+1]=Ta+1,wb[ob+
2]=Ta,wb[ob+3]=Ta+3,wb[ob+4]=Ta+1,wb[ob+5]=Ta+2,wb[ob+6]=Ta+2,wb[ob+7]=Ta+3,ob+=8,Ta+=4;k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,C.__webglFaceBuffer);k.bufferData(k.ELEMENT_ARRAY_BUFFER,Mb,H);k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,C.__webglLineBuffer);k.bufferData(k.ELEMENT_ARRAY_BUFFER,wb,H)}if(Bb){za=0;for(ub=Bb.length;za<ub;za++)if(u=Bb[za],u.__original.needsUpdate){x=0;if(1===u.size)if(void 0===u.boundTo||"vertices"===u.boundTo){E=0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],u.array[x]=u.value[Q.a],u.array[x+
1]=u.value[Q.b],u.array[x+2]=u.value[Q.c],x+=3;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],u.array[x]=u.value[Q.a],u.array[x+1]=u.value[Q.b],u.array[x+2]=u.value[Q.c],u.array[x+3]=u.value[Q.d],x+=4}else{if("faces"===u.boundTo){E=0;for(D=sa.length;E<D;E++)Aa=u.value[sa[E]],u.array[x]=Aa,u.array[x+1]=Aa,u.array[x+2]=Aa,x+=3;E=0;for(D=ta.length;E<D;E++)Aa=u.value[ta[E]],u.array[x]=Aa,u.array[x+1]=Aa,u.array[x+2]=Aa,u.array[x+3]=Aa,x+=4}}else if(2===u.size)if(void 0===u.boundTo||"vertices"===u.boundTo){E=
0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],R=u.value[Q.a],S=u.value[Q.b],P=u.value[Q.c],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=S.x,u.array[x+3]=S.y,u.array[x+4]=P.x,u.array[x+5]=P.y,x+=6;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],R=u.value[Q.a],S=u.value[Q.b],P=u.value[Q.c],ba=u.value[Q.d],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=S.x,u.array[x+3]=S.y,u.array[x+4]=P.x,u.array[x+5]=P.y,u.array[x+6]=ba.x,u.array[x+7]=ba.y,x+=8}else{if("faces"===u.boundTo){E=0;for(D=sa.length;E<D;E++)P=S=R=Aa=u.value[sa[E]],
u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=S.x,u.array[x+3]=S.y,u.array[x+4]=P.x,u.array[x+5]=P.y,x+=6;E=0;for(D=ta.length;E<D;E++)ba=P=S=R=Aa=u.value[ta[E]],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=S.x,u.array[x+3]=S.y,u.array[x+4]=P.x,u.array[x+5]=P.y,u.array[x+6]=ba.x,u.array[x+7]=ba.y,x+=8}}else if(3===u.size){var W;W="c"===u.type?["r","g","b"]:["x","y","z"];if(void 0===u.boundTo||"vertices"===u.boundTo){E=0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],R=u.value[Q.a],S=u.value[Q.b],P=u.value[Q.c],
u.array[x]=R[W[0]],u.array[x+1]=R[W[1]],u.array[x+2]=R[W[2]],u.array[x+3]=S[W[0]],u.array[x+4]=S[W[1]],u.array[x+5]=S[W[2]],u.array[x+6]=P[W[0]],u.array[x+7]=P[W[1]],u.array[x+8]=P[W[2]],x+=9;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],R=u.value[Q.a],S=u.value[Q.b],P=u.value[Q.c],ba=u.value[Q.d],u.array[x]=R[W[0]],u.array[x+1]=R[W[1]],u.array[x+2]=R[W[2]],u.array[x+3]=S[W[0]],u.array[x+4]=S[W[1]],u.array[x+5]=S[W[2]],u.array[x+6]=P[W[0]],u.array[x+7]=P[W[1]],u.array[x+8]=P[W[2]],u.array[x+9]=ba[W[0]],
u.array[x+10]=ba[W[1]],u.array[x+11]=ba[W[2]],x+=12}else if("faces"===u.boundTo){E=0;for(D=sa.length;E<D;E++)P=S=R=Aa=u.value[sa[E]],u.array[x]=R[W[0]],u.array[x+1]=R[W[1]],u.array[x+2]=R[W[2]],u.array[x+3]=S[W[0]],u.array[x+4]=S[W[1]],u.array[x+5]=S[W[2]],u.array[x+6]=P[W[0]],u.array[x+7]=P[W[1]],u.array[x+8]=P[W[2]],x+=9;E=0;for(D=ta.length;E<D;E++)ba=P=S=R=Aa=u.value[ta[E]],u.array[x]=R[W[0]],u.array[x+1]=R[W[1]],u.array[x+2]=R[W[2]],u.array[x+3]=S[W[0]],u.array[x+4]=S[W[1]],u.array[x+5]=S[W[2]],
u.array[x+6]=P[W[0]],u.array[x+7]=P[W[1]],u.array[x+8]=P[W[2]],u.array[x+9]=ba[W[0]],u.array[x+10]=ba[W[1]],u.array[x+11]=ba[W[2]],x+=12}else if("faceVertices"===u.boundTo){E=0;for(D=sa.length;E<D;E++)Aa=u.value[sa[E]],R=Aa[0],S=Aa[1],P=Aa[2],u.array[x]=R[W[0]],u.array[x+1]=R[W[1]],u.array[x+2]=R[W[2]],u.array[x+3]=S[W[0]],u.array[x+4]=S[W[1]],u.array[x+5]=S[W[2]],u.array[x+6]=P[W[0]],u.array[x+7]=P[W[1]],u.array[x+8]=P[W[2]],x+=9;E=0;for(D=ta.length;E<D;E++)Aa=u.value[ta[E]],R=Aa[0],S=Aa[1],P=Aa[2],
ba=Aa[3],u.array[x]=R[W[0]],u.array[x+1]=R[W[1]],u.array[x+2]=R[W[2]],u.array[x+3]=S[W[0]],u.array[x+4]=S[W[1]],u.array[x+5]=S[W[2]],u.array[x+6]=P[W[0]],u.array[x+7]=P[W[1]],u.array[x+8]=P[W[2]],u.array[x+9]=ba[W[0]],u.array[x+10]=ba[W[1]],u.array[x+11]=ba[W[2]],x+=12}}else if(4===u.size)if(void 0===u.boundTo||"vertices"===u.boundTo){E=0;for(D=sa.length;E<D;E++)Q=kb[sa[E]],R=u.value[Q.a],S=u.value[Q.b],P=u.value[Q.c],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=R.z,u.array[x+3]=R.w,u.array[x+4]=
S.x,u.array[x+5]=S.y,u.array[x+6]=S.z,u.array[x+7]=S.w,u.array[x+8]=P.x,u.array[x+9]=P.y,u.array[x+10]=P.z,u.array[x+11]=P.w,x+=12;E=0;for(D=ta.length;E<D;E++)Q=kb[ta[E]],R=u.value[Q.a],S=u.value[Q.b],P=u.value[Q.c],ba=u.value[Q.d],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=R.z,u.array[x+3]=R.w,u.array[x+4]=S.x,u.array[x+5]=S.y,u.array[x+6]=S.z,u.array[x+7]=S.w,u.array[x+8]=P.x,u.array[x+9]=P.y,u.array[x+10]=P.z,u.array[x+11]=P.w,u.array[x+12]=ba.x,u.array[x+13]=ba.y,u.array[x+14]=ba.z,u.array[x+
15]=ba.w,x+=16}else if("faces"===u.boundTo){E=0;for(D=sa.length;E<D;E++)P=S=R=Aa=u.value[sa[E]],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=R.z,u.array[x+3]=R.w,u.array[x+4]=S.x,u.array[x+5]=S.y,u.array[x+6]=S.z,u.array[x+7]=S.w,u.array[x+8]=P.x,u.array[x+9]=P.y,u.array[x+10]=P.z,u.array[x+11]=P.w,x+=12;E=0;for(D=ta.length;E<D;E++)ba=P=S=R=Aa=u.value[ta[E]],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=R.z,u.array[x+3]=R.w,u.array[x+4]=S.x,u.array[x+5]=S.y,u.array[x+6]=S.z,u.array[x+7]=S.w,u.array[x+
8]=P.x,u.array[x+9]=P.y,u.array[x+10]=P.z,u.array[x+11]=P.w,u.array[x+12]=ba.x,u.array[x+13]=ba.y,u.array[x+14]=ba.z,u.array[x+15]=ba.w,x+=16}else if("faceVertices"===u.boundTo){E=0;for(D=sa.length;E<D;E++)Aa=u.value[sa[E]],R=Aa[0],S=Aa[1],P=Aa[2],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=R.z,u.array[x+3]=R.w,u.array[x+4]=S.x,u.array[x+5]=S.y,u.array[x+6]=S.z,u.array[x+7]=S.w,u.array[x+8]=P.x,u.array[x+9]=P.y,u.array[x+10]=P.z,u.array[x+11]=P.w,x+=12;E=0;for(D=ta.length;E<D;E++)Aa=u.value[ta[E]],
R=Aa[0],S=Aa[1],P=Aa[2],ba=Aa[3],u.array[x]=R.x,u.array[x+1]=R.y,u.array[x+2]=R.z,u.array[x+3]=R.w,u.array[x+4]=S.x,u.array[x+5]=S.y,u.array[x+6]=S.z,u.array[x+7]=S.w,u.array[x+8]=P.x,u.array[x+9]=P.y,u.array[x+10]=P.z,u.array[x+11]=P.w,u.array[x+12]=ba.x,u.array[x+13]=ba.y,u.array[x+14]=ba.z,u.array[x+15]=ba.w,x+=16}k.bindBuffer(k.ARRAY_BUFFER,u.buffer);k.bufferData(k.ARRAY_BUFFER,u.array,H)}}I&&(delete C.__inittedArrays,delete C.__colorArray,delete C.__normalArray,delete C.__tangentArray,delete C.__uvArray,
delete C.__uv2Array,delete C.__faceArray,delete C.__vertexArray,delete C.__lineArray,delete C.__skinIndexArray,delete C.__skinWeightArray)}}j.verticesNeedUpdate=!1;j.morphTargetsNeedUpdate=!1;j.elementsNeedUpdate=!1;j.uvsNeedUpdate=!1;j.normalsNeedUpdate=!1;j.colorsNeedUpdate=!1;j.tangentsNeedUpdate=!1;j.buffersNeedUpdate=!1;p.attributes&&s(p)}else if(i instanceof THREE.Ribbon){p=e(i,j);m=p.attributes&&r(p);if(j.verticesNeedUpdate||j.colorsNeedUpdate||j.normalsNeedUpdate||m){var Cb=j,Kb=k.DYNAMIC_DRAW,
nc=void 0,oc=void 0,pc=void 0,Tb=void 0,Ba=void 0,Ub=void 0,xc=void 0,yc=void 0,gc=void 0,gb=void 0,hc=void 0,Ia=void 0,rb=void 0,kc=Cb.vertices,lc=Cb.colors,mc=Cb.normals,uc=kc.length,vc=lc.length,Yc=mc.length,zc=Cb.__vertexArray,Ac=Cb.__colorArray,Bc=Cb.__normalArray,Zc=Cb.colorsNeedUpdate,$c=Cb.normalsNeedUpdate,Lc=Cb.__webglCustomAttributesList;if(Cb.verticesNeedUpdate){for(nc=0;nc<uc;nc++)Tb=kc[nc],Ba=3*nc,zc[Ba]=Tb.x,zc[Ba+1]=Tb.y,zc[Ba+2]=Tb.z;k.bindBuffer(k.ARRAY_BUFFER,Cb.__webglVertexBuffer);
k.bufferData(k.ARRAY_BUFFER,zc,Kb)}if(Zc){for(oc=0;oc<vc;oc++)Ub=lc[oc],Ba=3*oc,Ac[Ba]=Ub.r,Ac[Ba+1]=Ub.g,Ac[Ba+2]=Ub.b;k.bindBuffer(k.ARRAY_BUFFER,Cb.__webglColorBuffer);k.bufferData(k.ARRAY_BUFFER,Ac,Kb)}if($c){for(pc=0;pc<Yc;pc++)xc=mc[pc],Ba=3*pc,Bc[Ba]=xc.x,Bc[Ba+1]=xc.y,Bc[Ba+2]=xc.z;k.bindBuffer(k.ARRAY_BUFFER,Cb.__webglNormalBuffer);k.bufferData(k.ARRAY_BUFFER,Bc,Kb)}if(Lc){yc=0;for(gc=Lc.length;yc<gc;yc++)if(Ia=Lc[yc],Ia.needsUpdate&&(void 0===Ia.boundTo||"vertices"===Ia.boundTo)){Ba=0;hc=
Ia.value.length;if(1===Ia.size)for(gb=0;gb<hc;gb++)Ia.array[gb]=Ia.value[gb];else if(2===Ia.size)for(gb=0;gb<hc;gb++)rb=Ia.value[gb],Ia.array[Ba]=rb.x,Ia.array[Ba+1]=rb.y,Ba+=2;else if(3===Ia.size)if("c"===Ia.type)for(gb=0;gb<hc;gb++)rb=Ia.value[gb],Ia.array[Ba]=rb.r,Ia.array[Ba+1]=rb.g,Ia.array[Ba+2]=rb.b,Ba+=3;else for(gb=0;gb<hc;gb++)rb=Ia.value[gb],Ia.array[Ba]=rb.x,Ia.array[Ba+1]=rb.y,Ia.array[Ba+2]=rb.z,Ba+=3;else if(4===Ia.size)for(gb=0;gb<hc;gb++)rb=Ia.value[gb],Ia.array[Ba]=rb.x,Ia.array[Ba+
1]=rb.y,Ia.array[Ba+2]=rb.z,Ia.array[Ba+3]=rb.w,Ba+=4;k.bindBuffer(k.ARRAY_BUFFER,Ia.buffer);k.bufferData(k.ARRAY_BUFFER,Ia.array,Kb)}}}j.verticesNeedUpdate=!1;j.colorsNeedUpdate=!1;j.normalsNeedUpdate=!1;p.attributes&&s(p)}else if(i instanceof THREE.Line){p=e(i,j);m=p.attributes&&r(p);if(j.verticesNeedUpdate||j.colorsNeedUpdate||j.lineDistancesNeedUpdate||m){var Db=j,Cc=k.DYNAMIC_DRAW,qc=void 0,rc=void 0,sc=void 0,Dc=void 0,Oa=void 0,Ec=void 0,Qc=Db.vertices,Rc=Db.colors,Sc=Db.lineDistances,ad=Qc.length,
bd=Rc.length,cd=Sc.length,Fc=Db.__vertexArray,Gc=Db.__colorArray,Tc=Db.__lineDistanceArray,dd=Db.colorsNeedUpdate,ed=Db.lineDistancesNeedUpdate,Mc=Db.__webglCustomAttributesList,Hc=void 0,Uc=void 0,hb=void 0,ic=void 0,sb=void 0,Ja=void 0;if(Db.verticesNeedUpdate){for(qc=0;qc<ad;qc++)Dc=Qc[qc],Oa=3*qc,Fc[Oa]=Dc.x,Fc[Oa+1]=Dc.y,Fc[Oa+2]=Dc.z;k.bindBuffer(k.ARRAY_BUFFER,Db.__webglVertexBuffer);k.bufferData(k.ARRAY_BUFFER,Fc,Cc)}if(dd){for(rc=0;rc<bd;rc++)Ec=Rc[rc],Oa=3*rc,Gc[Oa]=Ec.r,Gc[Oa+1]=Ec.g,Gc[Oa+
2]=Ec.b;k.bindBuffer(k.ARRAY_BUFFER,Db.__webglColorBuffer);k.bufferData(k.ARRAY_BUFFER,Gc,Cc)}if(ed){for(sc=0;sc<cd;sc++)Tc[sc]=Sc[sc];k.bindBuffer(k.ARRAY_BUFFER,Db.__webglLineDistanceBuffer);k.bufferData(k.ARRAY_BUFFER,Tc,Cc)}if(Mc){Hc=0;for(Uc=Mc.length;Hc<Uc;Hc++)if(Ja=Mc[Hc],Ja.needsUpdate&&(void 0===Ja.boundTo||"vertices"===Ja.boundTo)){Oa=0;ic=Ja.value.length;if(1===Ja.size)for(hb=0;hb<ic;hb++)Ja.array[hb]=Ja.value[hb];else if(2===Ja.size)for(hb=0;hb<ic;hb++)sb=Ja.value[hb],Ja.array[Oa]=sb.x,
Ja.array[Oa+1]=sb.y,Oa+=2;else if(3===Ja.size)if("c"===Ja.type)for(hb=0;hb<ic;hb++)sb=Ja.value[hb],Ja.array[Oa]=sb.r,Ja.array[Oa+1]=sb.g,Ja.array[Oa+2]=sb.b,Oa+=3;else for(hb=0;hb<ic;hb++)sb=Ja.value[hb],Ja.array[Oa]=sb.x,Ja.array[Oa+1]=sb.y,Ja.array[Oa+2]=sb.z,Oa+=3;else if(4===Ja.size)for(hb=0;hb<ic;hb++)sb=Ja.value[hb],Ja.array[Oa]=sb.x,Ja.array[Oa+1]=sb.y,Ja.array[Oa+2]=sb.z,Ja.array[Oa+3]=sb.w,Oa+=4;k.bindBuffer(k.ARRAY_BUFFER,Ja.buffer);k.bufferData(k.ARRAY_BUFFER,Ja.array,Cc)}}}j.verticesNeedUpdate=
!1;j.colorsNeedUpdate=!1;j.lineDistancesNeedUpdate=!1;p.attributes&&s(p)}else if(i instanceof THREE.ParticleSystem){p=e(i,j);m=p.attributes&&r(p);if(j.verticesNeedUpdate||j.colorsNeedUpdate||i.sortParticles||m){var Nb=j,Nc=k.DYNAMIC_DRAW,tc=i,tb=void 0,Ob=void 0,Pb=void 0,ca=void 0,Qb=void 0,bc=void 0,Ic=Nb.vertices,Oc=Ic.length,Pc=Nb.colors,Vc=Pc.length,ec=Nb.__vertexArray,fc=Nb.__colorArray,Vb=Nb.__sortArray,Wc=Nb.verticesNeedUpdate,Xc=Nb.colorsNeedUpdate,Wb=Nb.__webglCustomAttributesList,Eb=void 0,
jc=void 0,ja=void 0,Fb=void 0,Ea=void 0,$=void 0;if(tc.sortParticles){lb.copy(xb);lb.multiply(tc.matrixWorld);for(tb=0;tb<Oc;tb++)Pb=Ic[tb],Ga.copy(Pb),Ga.applyProjection(lb),Vb[tb]=[Ga.z,tb];Vb.sort(l);for(tb=0;tb<Oc;tb++)Pb=Ic[Vb[tb][1]],ca=3*tb,ec[ca]=Pb.x,ec[ca+1]=Pb.y,ec[ca+2]=Pb.z;for(Ob=0;Ob<Vc;Ob++)ca=3*Ob,bc=Pc[Vb[Ob][1]],fc[ca]=bc.r,fc[ca+1]=bc.g,fc[ca+2]=bc.b;if(Wb){Eb=0;for(jc=Wb.length;Eb<jc;Eb++)if($=Wb[Eb],void 0===$.boundTo||"vertices"===$.boundTo)if(ca=0,Fb=$.value.length,1===$.size)for(ja=
0;ja<Fb;ja++)Qb=Vb[ja][1],$.array[ja]=$.value[Qb];else if(2===$.size)for(ja=0;ja<Fb;ja++)Qb=Vb[ja][1],Ea=$.value[Qb],$.array[ca]=Ea.x,$.array[ca+1]=Ea.y,ca+=2;else if(3===$.size)if("c"===$.type)for(ja=0;ja<Fb;ja++)Qb=Vb[ja][1],Ea=$.value[Qb],$.array[ca]=Ea.r,$.array[ca+1]=Ea.g,$.array[ca+2]=Ea.b,ca+=3;else for(ja=0;ja<Fb;ja++)Qb=Vb[ja][1],Ea=$.value[Qb],$.array[ca]=Ea.x,$.array[ca+1]=Ea.y,$.array[ca+2]=Ea.z,ca+=3;else if(4===$.size)for(ja=0;ja<Fb;ja++)Qb=Vb[ja][1],Ea=$.value[Qb],$.array[ca]=Ea.x,
$.array[ca+1]=Ea.y,$.array[ca+2]=Ea.z,$.array[ca+3]=Ea.w,ca+=4}}else{if(Wc)for(tb=0;tb<Oc;tb++)Pb=Ic[tb],ca=3*tb,ec[ca]=Pb.x,ec[ca+1]=Pb.y,ec[ca+2]=Pb.z;if(Xc)for(Ob=0;Ob<Vc;Ob++)bc=Pc[Ob],ca=3*Ob,fc[ca]=bc.r,fc[ca+1]=bc.g,fc[ca+2]=bc.b;if(Wb){Eb=0;for(jc=Wb.length;Eb<jc;Eb++)if($=Wb[Eb],$.needsUpdate&&(void 0===$.boundTo||"vertices"===$.boundTo))if(Fb=$.value.length,ca=0,1===$.size)for(ja=0;ja<Fb;ja++)$.array[ja]=$.value[ja];else if(2===$.size)for(ja=0;ja<Fb;ja++)Ea=$.value[ja],$.array[ca]=Ea.x,
$.array[ca+1]=Ea.y,ca+=2;else if(3===$.size)if("c"===$.type)for(ja=0;ja<Fb;ja++)Ea=$.value[ja],$.array[ca]=Ea.r,$.array[ca+1]=Ea.g,$.array[ca+2]=Ea.b,ca+=3;else for(ja=0;ja<Fb;ja++)Ea=$.value[ja],$.array[ca]=Ea.x,$.array[ca+1]=Ea.y,$.array[ca+2]=Ea.z,ca+=3;else if(4===$.size)for(ja=0;ja<Fb;ja++)Ea=$.value[ja],$.array[ca]=Ea.x,$.array[ca+1]=Ea.y,$.array[ca+2]=Ea.z,$.array[ca+3]=Ea.w,ca+=4}}if(Wc||tc.sortParticles)k.bindBuffer(k.ARRAY_BUFFER,Nb.__webglVertexBuffer),k.bufferData(k.ARRAY_BUFFER,ec,Nc);
if(Xc||tc.sortParticles)k.bindBuffer(k.ARRAY_BUFFER,Nb.__webglColorBuffer),k.bufferData(k.ARRAY_BUFFER,fc,Nc);if(Wb){Eb=0;for(jc=Wb.length;Eb<jc;Eb++)if($=Wb[Eb],$.needsUpdate||tc.sortParticles)k.bindBuffer(k.ARRAY_BUFFER,$.buffer),k.bufferData(k.ARRAY_BUFFER,$.array,Nc)}}j.verticesNeedUpdate=!1;j.colorsNeedUpdate=!1;p.attributes&&s(p)}}};this.initMaterial=function(a,b,c,d){var e,f,h,g;a.addEventListener("dispose",uc);var i,j,l,n,m;a instanceof THREE.MeshDepthMaterial?m="depth":a instanceof THREE.MeshNormalMaterial?
m="normal":a instanceof THREE.MeshBasicMaterial?m="basic":a instanceof THREE.MeshLambertMaterial?m="lambert":a instanceof THREE.MeshPhongMaterial?m="phong":a instanceof THREE.LineBasicMaterial?m="basic":a instanceof THREE.LineDashedMaterial?m="dashed":a instanceof THREE.ParticleBasicMaterial&&(m="particle_basic");if(m){var p=THREE.ShaderLib[m];a.uniforms=THREE.UniformsUtils.clone(p.uniforms);a.vertexShader=p.vertexShader;a.fragmentShader=p.fragmentShader}var q=e=0,r=0;f=p=0;for(var s=b.length;f<s;f++)h=
b[f],h.onlyShadow||(h instanceof THREE.DirectionalLight&&e++,h instanceof THREE.PointLight&&q++,h instanceof THREE.SpotLight&&r++,h instanceof THREE.HemisphereLight&&p++);f=q;h=r;g=p;r=p=0;for(q=b.length;r<q;r++)s=b[r],s.castShadow&&(s instanceof THREE.SpotLight&&p++,s instanceof THREE.DirectionalLight&&!s.shadowCascade&&p++);n=p;Bb&&d&&d.useVertexTexture?l=1024:(b=k.getParameter(k.MAX_VERTEX_UNIFORM_VECTORS),b=Math.floor((b-20)/4),void 0!==d&&d instanceof THREE.SkinnedMesh&&(b=Math.min(d.bones.length,
b),b<d.bones.length&&console.warn("WebGLRenderer: too many bones - "+d.bones.length+", this GPU supports just "+b+" (try OpenGL instead of ANGLE)")),l=b);a:{var r=a.fragmentShader,q=a.vertexShader,p=a.uniforms,b=a.attributes,s=a.defines,c={map:!!a.map,envMap:!!a.envMap,lightMap:!!a.lightMap,bumpMap:!!a.bumpMap,normalMap:!!a.normalMap,specularMap:!!a.specularMap,vertexColors:a.vertexColors,fog:c,useFog:a.fog,fogExp:c instanceof THREE.FogExp2,sizeAttenuation:a.sizeAttenuation,skinning:a.skinning,maxBones:l,
useVertexTexture:Bb&&d&&d.useVertexTexture,boneTextureWidth:d&&d.boneTextureWidth,boneTextureHeight:d&&d.boneTextureHeight,morphTargets:a.morphTargets,morphNormals:a.morphNormals,maxMorphTargets:this.maxMorphTargets,maxMorphNormals:this.maxMorphNormals,maxDirLights:e,maxPointLights:f,maxSpotLights:h,maxHemiLights:g,maxShadows:n,shadowMapEnabled:this.shadowMapEnabled&&d.receiveShadow,shadowMapType:this.shadowMapType,shadowMapDebug:this.shadowMapDebug,shadowMapCascade:this.shadowMapCascade,alphaTest:a.alphaTest,
metal:a.metal,perPixel:a.perPixel,wrapAround:a.wrapAround,doubleSided:a.side===THREE.DoubleSide,flipSided:a.side===THREE.BackSide},t,v,w,d=[];m?d.push(m):(d.push(r),d.push(q));for(v in s)d.push(v),d.push(s[v]);for(t in c)d.push(t),d.push(c[t]);m=d.join();t=0;for(v=V.length;t<v;t++)if(d=V[t],d.code===m){d.usedTimes++;j=d.program;break a}t="SHADOWMAP_TYPE_BASIC";c.shadowMapType===THREE.PCFShadowMap?t="SHADOWMAP_TYPE_PCF":c.shadowMapType===THREE.PCFSoftShadowMap&&(t="SHADOWMAP_TYPE_PCF_SOFT");v=[];for(w in s)d=
s[w],!1!==d&&(d="#define "+w+" "+d,v.push(d));d=v.join("\n");w=k.createProgram();v=["precision "+L+" float;",d,Gb?"#define VERTEX_TEXTURES":"",D.gammaInput?"#define GAMMA_INPUT":"",D.gammaOutput?"#define GAMMA_OUTPUT":"",D.physicallyBasedShading?"#define PHYSICALLY_BASED_SHADING":"","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_SPOT_LIGHTS "+c.maxSpotLights,"#define MAX_HEMI_LIGHTS "+c.maxHemiLights,"#define MAX_SHADOWS "+c.maxShadows,"#define MAX_BONES "+
c.maxBones,c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?"#define USE_LIGHTMAP":"",c.bumpMap?"#define USE_BUMPMAP":"",c.normalMap?"#define USE_NORMALMAP":"",c.specularMap?"#define USE_SPECULARMAP":"",c.vertexColors?"#define USE_COLOR":"",c.skinning?"#define USE_SKINNING":"",c.useVertexTexture?"#define BONE_TEXTURE":"",c.boneTextureWidth?"#define N_BONE_PIXEL_X "+c.boneTextureWidth.toFixed(1):"",c.boneTextureHeight?"#define N_BONE_PIXEL_Y "+c.boneTextureHeight.toFixed(1):"",
c.morphTargets?"#define USE_MORPHTARGETS":"",c.morphNormals?"#define USE_MORPHNORMALS":"",c.perPixel?"#define PHONG_PER_PIXEL":"",c.wrapAround?"#define WRAP_AROUND":"",c.doubleSided?"#define DOUBLE_SIDED":"",c.flipSided?"#define FLIP_SIDED":"",c.shadowMapEnabled?"#define USE_SHADOWMAP":"",c.shadowMapEnabled?"#define "+t:"",c.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",c.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",c.sizeAttenuation?"#define USE_SIZEATTENUATION":"","uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
t=["precision "+L+" float;",c.bumpMap||c.normalMap?"#extension GL_OES_standard_derivatives : enable":"",d,"#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_SPOT_LIGHTS "+c.maxSpotLights,"#define MAX_HEMI_LIGHTS "+c.maxHemiLights,"#define MAX_SHADOWS "+c.maxShadows,c.alphaTest?"#define ALPHATEST "+c.alphaTest:"",D.gammaInput?"#define GAMMA_INPUT":"",D.gammaOutput?"#define GAMMA_OUTPUT":"",D.physicallyBasedShading?"#define PHYSICALLY_BASED_SHADING":"",
c.useFog&&c.fog?"#define USE_FOG":"",c.useFog&&c.fogExp?"#define FOG_EXP2":"",c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?"#define USE_LIGHTMAP":"",c.bumpMap?"#define USE_BUMPMAP":"",c.normalMap?"#define USE_NORMALMAP":"",c.specularMap?"#define USE_SPECULARMAP":"",c.vertexColors?"#define USE_COLOR":"",c.metal?"#define METAL":"",c.perPixel?"#define PHONG_PER_PIXEL":"",c.wrapAround?"#define WRAP_AROUND":"",c.doubleSided?"#define DOUBLE_SIDED":"",c.flipSided?"#define FLIP_SIDED":
"",c.shadowMapEnabled?"#define USE_SHADOWMAP":"",c.shadowMapEnabled?"#define "+t:"",c.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",c.shadowMapCascade?"#define SHADOWMAP_CASCADE":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");v=J("vertex",v+q);t=J("fragment",t+r);k.attachShader(w,v);k.attachShader(w,t);k.linkProgram(w);k.getProgramParameter(w,k.LINK_STATUS)||console.error("Could not initialise shader\nVALIDATE_STATUS: "+k.getProgramParameter(w,k.VALIDATE_STATUS)+", gl error ["+
k.getError()+"]");k.deleteShader(t);k.deleteShader(v);w.uniforms={};w.attributes={};var z;t="viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" ");c.useVertexTexture?t.push("boneTexture"):t.push("boneGlobalMatrices");for(z in p)t.push(z);z=t;t=0;for(v=z.length;t<v;t++)p=z[t],w.uniforms[p]=k.getUniformLocation(w,p);t="position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" ");for(z=0;z<c.maxMorphTargets;z++)t.push("morphTarget"+
z);for(z=0;z<c.maxMorphNormals;z++)t.push("morphNormal"+z);for(j in b)t.push(j);j=t;z=0;for(b=j.length;z<b;z++)t=j[z],w.attributes[t]=k.getAttribLocation(w,t);w.id=ea++;V.push({program:w,code:m,usedTimes:1});D.info.memory.programs=V.length;j=w}a.program=j;z=a.program.attributes;if(a.morphTargets){a.numSupportedMorphTargets=0;b="morphTarget";for(j=0;j<this.maxMorphTargets;j++)w=b+j,0<=z[w]&&a.numSupportedMorphTargets++}if(a.morphNormals){a.numSupportedMorphNormals=0;b="morphNormal";for(j=0;j<this.maxMorphNormals;j++)w=
b+j,0<=z[w]&&a.numSupportedMorphNormals++}a.uniformsList=[];for(i in a.uniforms)a.uniformsList.push([a.uniforms[i],i])};this.setFaceCulling=function(a,b){a===THREE.CullFaceNone?k.disable(k.CULL_FACE):(b===THREE.FrontFaceDirectionCW?k.frontFace(k.CW):k.frontFace(k.CCW),a===THREE.CullFaceBack?k.cullFace(k.BACK):a===THREE.CullFaceFront?k.cullFace(k.FRONT):k.cullFace(k.FRONT_AND_BACK),k.enable(k.CULL_FACE))};this.setMaterialFaces=function(a){var b=a.side===THREE.DoubleSide,a=a.side===THREE.BackSide;da!==
b&&(b?k.disable(k.CULL_FACE):k.enable(k.CULL_FACE),da=b);T!==a&&(a?k.frontFace(k.CW):k.frontFace(k.CCW),T=a)};this.setDepthTest=function(a){xa!==a&&(a?k.enable(k.DEPTH_TEST):k.disable(k.DEPTH_TEST),xa=a)};this.setDepthWrite=function(a){bb!==a&&(k.depthMask(a),bb=a)};this.setBlending=function(a,b,c,d){a!==aa&&(a===THREE.NoBlending?k.disable(k.BLEND):a===THREE.AdditiveBlending?(k.enable(k.BLEND),k.blendEquation(k.FUNC_ADD),k.blendFunc(k.SRC_ALPHA,k.ONE)):a===THREE.SubtractiveBlending?(k.enable(k.BLEND),
k.blendEquation(k.FUNC_ADD),k.blendFunc(k.ZERO,k.ONE_MINUS_SRC_COLOR)):a===THREE.MultiplyBlending?(k.enable(k.BLEND),k.blendEquation(k.FUNC_ADD),k.blendFunc(k.ZERO,k.SRC_COLOR)):a===THREE.CustomBlending?k.enable(k.BLEND):(k.enable(k.BLEND),k.blendEquationSeparate(k.FUNC_ADD,k.FUNC_ADD),k.blendFuncSeparate(k.SRC_ALPHA,k.ONE_MINUS_SRC_ALPHA,k.ONE,k.ONE_MINUS_SRC_ALPHA)),aa=a);if(a===THREE.CustomBlending){if(b!==la&&(k.blendEquation(w(b)),la=b),c!==Y||d!==ma)k.blendFunc(w(c),w(d)),Y=c,ma=d}else ma=Y=
la=null};this.setTexture=function(a,b){if(a.needsUpdate){a.__webglInit||(a.__webglInit=!0,a.addEventListener("dispose",gc),a.__webglTexture=k.createTexture(),D.info.memory.textures++);k.activeTexture(k.TEXTURE0+b);k.bindTexture(k.TEXTURE_2D,a.__webglTexture);k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,a.flipY);k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha);k.pixelStorei(k.UNPACK_ALIGNMENT,a.unpackAlignment);var c=a.image,d=0===(c.width&c.width-1)&&0===(c.height&c.height-1),e=w(a.format),
f=w(a.type);N(k.TEXTURE_2D,a,d);var h=a.mipmaps;if(a instanceof THREE.DataTexture)if(0<h.length&&d){for(var g=0,i=h.length;g<i;g++)c=h[g],k.texImage2D(k.TEXTURE_2D,g,e,c.width,c.height,0,e,f,c.data);a.generateMipmaps=!1}else k.texImage2D(k.TEXTURE_2D,0,e,c.width,c.height,0,e,f,c.data);else if(a instanceof THREE.CompressedTexture){g=0;for(i=h.length;g<i;g++)c=h[g],k.compressedTexImage2D(k.TEXTURE_2D,g,e,c.width,c.height,0,c.data)}else if(0<h.length&&d){g=0;for(i=h.length;g<i;g++)c=h[g],k.texImage2D(k.TEXTURE_2D,
g,e,e,f,c);a.generateMipmaps=!1}else k.texImage2D(k.TEXTURE_2D,0,e,e,f,a.image);a.generateMipmaps&&d&&k.generateMipmap(k.TEXTURE_2D);a.needsUpdate=!1;if(a.onUpdate)a.onUpdate()}else k.activeTexture(k.TEXTURE0+b),k.bindTexture(k.TEXTURE_2D,a.__webglTexture)};this.setRenderTarget=function(a){var b=a instanceof THREE.WebGLRenderTargetCube;if(a&&!a.__webglFramebuffer){void 0===a.depthBuffer&&(a.depthBuffer=!0);void 0===a.stencilBuffer&&(a.stencilBuffer=!0);a.addEventListener("dispose",mc);a.__webglTexture=
k.createTexture();D.info.memory.textures++;var c=0===(a.width&a.width-1)&&0===(a.height&a.height-1),d=w(a.format),e=w(a.type);if(b){a.__webglFramebuffer=[];a.__webglRenderbuffer=[];k.bindTexture(k.TEXTURE_CUBE_MAP,a.__webglTexture);N(k.TEXTURE_CUBE_MAP,a,c);for(var f=0;6>f;f++){a.__webglFramebuffer[f]=k.createFramebuffer();a.__webglRenderbuffer[f]=k.createRenderbuffer();k.texImage2D(k.TEXTURE_CUBE_MAP_POSITIVE_X+f,0,d,a.width,a.height,0,d,e,null);var h=a,g=k.TEXTURE_CUBE_MAP_POSITIVE_X+f;k.bindFramebuffer(k.FRAMEBUFFER,
a.__webglFramebuffer[f]);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,g,h.__webglTexture,0);y(a.__webglRenderbuffer[f],a)}c&&k.generateMipmap(k.TEXTURE_CUBE_MAP)}else a.__webglFramebuffer=k.createFramebuffer(),a.__webglRenderbuffer=a.shareDepthFrom?a.shareDepthFrom.__webglRenderbuffer:k.createRenderbuffer(),k.bindTexture(k.TEXTURE_2D,a.__webglTexture),N(k.TEXTURE_2D,a,c),k.texImage2D(k.TEXTURE_2D,0,d,a.width,a.height,0,d,e,null),d=k.TEXTURE_2D,k.bindFramebuffer(k.FRAMEBUFFER,a.__webglFramebuffer),
k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,d,a.__webglTexture,0),a.shareDepthFrom?a.depthBuffer&&!a.stencilBuffer?k.framebufferRenderbuffer(k.FRAMEBUFFER,k.DEPTH_ATTACHMENT,k.RENDERBUFFER,a.__webglRenderbuffer):a.depthBuffer&&a.stencilBuffer&&k.framebufferRenderbuffer(k.FRAMEBUFFER,k.DEPTH_STENCIL_ATTACHMENT,k.RENDERBUFFER,a.__webglRenderbuffer):y(a.__webglRenderbuffer,a),c&&k.generateMipmap(k.TEXTURE_2D);b?k.bindTexture(k.TEXTURE_CUBE_MAP,null):k.bindTexture(k.TEXTURE_2D,null);k.bindRenderbuffer(k.RENDERBUFFER,
null);k.bindFramebuffer(k.FRAMEBUFFER,null)}a?(b=b?a.__webglFramebuffer[a.activeCubeFace]:a.__webglFramebuffer,c=a.width,a=a.height,e=d=0):(b=null,c=Qa,a=Ya,d=ua,e=Ra);b!==Ua&&(k.bindFramebuffer(k.FRAMEBUFFER,b),k.viewport(d,e,c,a),Ua=b);Xb=c;Jb=a};this.shadowMapPlugin=new THREE.ShadowMapPlugin;this.addPrePlugin(this.shadowMapPlugin);this.addPostPlugin(new THREE.SpritePlugin);this.addPostPlugin(new THREE.LensFlarePlugin)};THREE.WebGLRenderTarget=function(a,b,c){this.width=a;this.height=b;c=c||{};this.wrapS=void 0!==c.wrapS?c.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=void 0!==c.wrapT?c.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=void 0!==c.magFilter?c.magFilter:THREE.LinearFilter;this.minFilter=void 0!==c.minFilter?c.minFilter:THREE.LinearMipMapLinearFilter;this.anisotropy=void 0!==c.anisotropy?c.anisotropy:1;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.format=void 0!==c.format?c.format:
THREE.RGBAFormat;this.type=void 0!==c.type?c.type:THREE.UnsignedByteType;this.depthBuffer=void 0!==c.depthBuffer?c.depthBuffer:!0;this.stencilBuffer=void 0!==c.stencilBuffer?c.stencilBuffer:!0;this.generateMipmaps=!0;this.shareDepthFrom=null};
THREE.WebGLRenderTarget.prototype={constructor:THREE.WebGLRenderTarget,addEventListener:THREE.EventDispatcher.prototype.addEventListener,hasEventListener:THREE.EventDispatcher.prototype.hasEventListener,removeEventListener:THREE.EventDispatcher.prototype.removeEventListener,dispatchEvent:THREE.EventDispatcher.prototype.dispatchEvent,clone:function(){var a=new THREE.WebGLRenderTarget(this.width,this.height);a.wrapS=this.wrapS;a.wrapT=this.wrapT;a.magFilter=this.magFilter;a.minFilter=this.minFilter;
a.anisotropy=this.anisotropy;a.offset.copy(this.offset);a.repeat.copy(this.repeat);a.format=this.format;a.type=this.type;a.depthBuffer=this.depthBuffer;a.stencilBuffer=this.stencilBuffer;a.generateMipmaps=this.generateMipmaps;a.shareDepthFrom=this.shareDepthFrom;return a},dispose:function(){this.dispatchEvent({type:"dispose"})}};THREE.WebGLRenderTargetCube=function(a,b,c){THREE.WebGLRenderTarget.call(this,a,b,c);this.activeCubeFace=0};THREE.WebGLRenderTargetCube.prototype=Object.create(THREE.WebGLRenderTarget.prototype);THREE.RenderableVertex=function(){this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=!0};THREE.RenderableVertex.prototype.copy=function(a){this.positionWorld.copy(a.positionWorld);this.positionScreen.copy(a.positionScreen)};THREE.RenderableFace3=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.centroidModel=new THREE.Vector3;this.normalModel=new THREE.Vector3;this.normalModelView=new THREE.Vector3;this.vertexNormalsLength=0;this.vertexNormalsModel=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.vertexNormalsModelView=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.material=this.color=null;this.uvs=[[]];this.z=null};THREE.RenderableFace4=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.v4=new THREE.RenderableVertex;this.centroidModel=new THREE.Vector3;this.normalModel=new THREE.Vector3;this.normalModelView=new THREE.Vector3;this.vertexNormalsLength=0;this.vertexNormalsModel=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.vertexNormalsModelView=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];
this.material=this.color=null;this.uvs=[[]];this.z=null};THREE.RenderableObject=function(){this.z=this.object=null};THREE.RenderableParticle=function(){this.rotation=this.z=this.y=this.x=this.object=null;this.scale=new THREE.Vector2;this.material=null};THREE.RenderableLine=function(){this.z=null;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.vertexColors=[new THREE.Color,new THREE.Color];this.material=null};THREE.GeometryUtils={merge:function(a,b,c){var d,e,f=a.vertices.length,h=b instanceof THREE.Mesh?b.geometry:b,g=a.vertices,i=h.vertices,j=a.faces,l=h.faces,a=a.faceVertexUvs[0],h=h.faceVertexUvs[0];void 0===c&&(c=0);b instanceof THREE.Mesh&&(b.matrixAutoUpdate&&b.updateMatrix(),d=b.matrix,e=(new THREE.Matrix3).getNormalMatrix(d));for(var b=0,n=i.length;b<n;b++){var m=i[b].clone();d&&m.applyMatrix4(d);g.push(m)}b=0;for(n=l.length;b<n;b++){var m=l[b],q,t,p=m.vertexNormals,r=m.vertexColors;m instanceof
THREE.Face3?q=new THREE.Face3(m.a+f,m.b+f,m.c+f):m instanceof THREE.Face4&&(q=new THREE.Face4(m.a+f,m.b+f,m.c+f,m.d+f));q.normal.copy(m.normal);e&&q.normal.applyMatrix3(e).normalize();g=0;for(i=p.length;g<i;g++)t=p[g].clone(),e&&t.applyMatrix3(e).normalize(),q.vertexNormals.push(t);q.color.copy(m.color);g=0;for(i=r.length;g<i;g++)t=r[g],q.vertexColors.push(t.clone());q.materialIndex=m.materialIndex+c;q.centroid.copy(m.centroid);d&&q.centroid.applyMatrix4(d);j.push(q)}b=0;for(n=h.length;b<n;b++){c=
h[b];d=[];g=0;for(i=c.length;g<i;g++)d.push(new THREE.Vector2(c[g].x,c[g].y));a.push(d)}},removeMaterials:function(a,b){for(var c={},d=0,e=b.length;d<e;d++)c[b[d]]=!0;for(var f,h=[],d=0,e=a.faces.length;d<e;d++)f=a.faces[d],f.materialIndex in c||h.push(f);a.faces=h},randomPointInTriangle:function(a,b,c){var d,e,f,h=new THREE.Vector3,g=THREE.GeometryUtils.__v1;d=THREE.GeometryUtils.random();e=THREE.GeometryUtils.random();1<d+e&&(d=1-d,e=1-e);f=1-d-e;h.copy(a);h.multiplyScalar(d);g.copy(b);g.multiplyScalar(e);
h.add(g);g.copy(c);g.multiplyScalar(f);h.add(g);return h},randomPointInFace:function(a,b,c){var d,e,f;if(a instanceof THREE.Face3)return d=b.vertices[a.a],e=b.vertices[a.b],f=b.vertices[a.c],THREE.GeometryUtils.randomPointInTriangle(d,e,f);if(a instanceof THREE.Face4){d=b.vertices[a.a];e=b.vertices[a.b];f=b.vertices[a.c];var b=b.vertices[a.d],h;c?a._area1&&a._area2?(c=a._area1,h=a._area2):(c=THREE.GeometryUtils.triangleArea(d,e,b),h=THREE.GeometryUtils.triangleArea(e,f,b),a._area1=c,a._area2=h):(c=
THREE.GeometryUtils.triangleArea(d,e,b),h=THREE.GeometryUtils.triangleArea(e,f,b));return THREE.GeometryUtils.random()*(c+h)<c?THREE.GeometryUtils.randomPointInTriangle(d,e,b):THREE.GeometryUtils.randomPointInTriangle(e,f,b)}},randomPointsInGeometry:function(a,b){function c(a){function b(c,d){if(d<c)return c;var e=c+Math.floor((d-c)/2);return j[e]>a?b(c,e-1):j[e]<a?b(e+1,d):e}return b(0,j.length-1)}var d,e,f=a.faces,h=a.vertices,g=f.length,i=0,j=[],l,n,m,q;for(e=0;e<g;e++)d=f[e],d instanceof THREE.Face3?
(l=h[d.a],n=h[d.b],m=h[d.c],d._area=THREE.GeometryUtils.triangleArea(l,n,m)):d instanceof THREE.Face4&&(l=h[d.a],n=h[d.b],m=h[d.c],q=h[d.d],d._area1=THREE.GeometryUtils.triangleArea(l,n,q),d._area2=THREE.GeometryUtils.triangleArea(n,m,q),d._area=d._area1+d._area2),i+=d._area,j[e]=i;d=[];for(e=0;e<b;e++)h=THREE.GeometryUtils.random()*i,h=c(h),d[e]=THREE.GeometryUtils.randomPointInFace(f[h],a,!0);return d},triangleArea:function(a,b,c){var d=THREE.GeometryUtils.__v1,e=THREE.GeometryUtils.__v2;d.subVectors(b,
a);e.subVectors(c,a);d.cross(e);return 0.5*d.length()},center:function(a){a.computeBoundingBox();var b=a.boundingBox,c=new THREE.Vector3;c.addVectors(b.min,b.max);c.multiplyScalar(-0.5);a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x,c.y,c.z));a.computeBoundingBox();return c},normalizeUVs:function(a){for(var a=a.faceVertexUvs[0],b=0,c=a.length;b<c;b++)for(var d=a[b],e=0,f=d.length;e<f;e++)1!==d[e].x&&(d[e].x-=Math.floor(d[e].x)),1!==d[e].y&&(d[e].y-=Math.floor(d[e].y))},triangulateQuads:function(a){var b,
c,d,e,f=[],h=[],g=[];b=0;for(c=a.faceUvs.length;b<c;b++)h[b]=[];b=0;for(c=a.faceVertexUvs.length;b<c;b++)g[b]=[];b=0;for(c=a.faces.length;b<c;b++)if(d=a.faces[b],d instanceof THREE.Face4){e=d.a;var i=d.b,j=d.c,l=d.d,n=new THREE.Face3,m=new THREE.Face3;n.color.copy(d.color);m.color.copy(d.color);n.materialIndex=d.materialIndex;m.materialIndex=d.materialIndex;n.a=e;n.b=i;n.c=l;m.a=i;m.b=j;m.c=l;4===d.vertexColors.length&&(n.vertexColors[0]=d.vertexColors[0].clone(),n.vertexColors[1]=d.vertexColors[1].clone(),
n.vertexColors[2]=d.vertexColors[3].clone(),m.vertexColors[0]=d.vertexColors[1].clone(),m.vertexColors[1]=d.vertexColors[2].clone(),m.vertexColors[2]=d.vertexColors[3].clone());f.push(n,m);d=0;for(e=a.faceVertexUvs.length;d<e;d++)a.faceVertexUvs[d].length&&(n=a.faceVertexUvs[d][b],i=n[1],j=n[2],l=n[3],n=[n[0].clone(),i.clone(),l.clone()],i=[i.clone(),j.clone(),l.clone()],g[d].push(n,i));d=0;for(e=a.faceUvs.length;d<e;d++)a.faceUvs[d].length&&(i=a.faceUvs[d][b],h[d].push(i,i))}else{f.push(d);d=0;for(e=
a.faceUvs.length;d<e;d++)h[d].push(a.faceUvs[d][b]);d=0;for(e=a.faceVertexUvs.length;d<e;d++)g[d].push(a.faceVertexUvs[d][b])}a.faces=f;a.faceUvs=h;a.faceVertexUvs=g;a.computeCentroids();a.computeFaceNormals();a.computeVertexNormals();a.hasTangents&&a.computeTangents()},setMaterialIndex:function(a,b,c,d){a=a.faces;d=d||a.length-1;for(c=c||0;c<=d;c++)a[c].materialIndex=b}};THREE.GeometryUtils.random=THREE.Math.random16;THREE.GeometryUtils.__v1=new THREE.Vector3;THREE.GeometryUtils.__v2=new THREE.Vector3;THREE.ImageUtils={crossOrigin:"anonymous",loadTexture:function(a,b,c){var d=new Image,e=new THREE.Texture(d,b),b=new THREE.ImageLoader;b.crossOrigin=this.crossOrigin;b.load(a,function(a){e.image=a;e.needsUpdate=!0;c&&c(e)});e.sourceFile=a;return e},loadCompressedTexture:function(a,b,c,d){var e=new THREE.CompressedTexture;e.mapping=b;var f=new XMLHttpRequest;f.onload=function(){var a=THREE.ImageUtils.parseDDS(f.response,!0);e.format=a.format;e.mipmaps=a.mipmaps;e.image.width=a.width;e.image.height=
a.height;e.generateMipmaps=!1;e.needsUpdate=!0;c&&c(e)};f.onerror=d;f.open("GET",a,!0);f.responseType="arraybuffer";f.send(null);return e},loadTextureCube:function(a,b,c,d){var e=[];e.loadCount=0;var f=new THREE.Texture;f.image=e;void 0!==b&&(f.mapping=b);f.flipY=!1;for(var b=0,h=a.length;b<h;++b){var g=new Image;e[b]=g;g.onload=function(){e.loadCount+=1;6===e.loadCount&&(f.needsUpdate=!0,c&&c(f))};g.onerror=d;g.crossOrigin=this.crossOrigin;g.src=a[b]}return f},loadCompressedTextureCube:function(a,
b,c,d){var e=[];e.loadCount=0;var f=new THREE.CompressedTexture;f.image=e;void 0!==b&&(f.mapping=b);f.flipY=!1;f.generateMipmaps=!1;b=function(a,b){return function(){var d=THREE.ImageUtils.parseDDS(a.response,!0);b.format=d.format;b.mipmaps=d.mipmaps;b.width=d.width;b.height=d.height;e.loadCount+=1;6===e.loadCount&&(f.format=d.format,f.needsUpdate=!0,c&&c(f))}};if(a instanceof Array)for(var h=0,g=a.length;h<g;++h){var i={};e[h]=i;var j=new XMLHttpRequest;j.onload=b(j,i);j.onerror=d;i=a[h];j.open("GET",
i,!0);j.responseType="arraybuffer";j.send(null)}else j=new XMLHttpRequest,j.onload=function(){var a=THREE.ImageUtils.parseDDS(j.response,!0);if(a.isCubemap){for(var b=a.mipmaps.length/a.mipmapCount,d=0;d<b;d++){e[d]={mipmaps:[]};for(var h=0;h<a.mipmapCount;h++)e[d].mipmaps.push(a.mipmaps[d*a.mipmapCount+h]),e[d].format=a.format,e[d].width=a.width,e[d].height=a.height}f.format=a.format;f.needsUpdate=!0;c&&c(f)}},j.onerror=d,j.open("GET",a,!0),j.responseType="arraybuffer",j.send(null);return f},parseDDS:function(a,
b){function c(a){return a.charCodeAt(0)+(a.charCodeAt(1)<<8)+(a.charCodeAt(2)<<16)+(a.charCodeAt(3)<<24)}var d={mipmaps:[],width:0,height:0,format:null,mipmapCount:1},e=c("DXT1"),f=c("DXT3"),h=c("DXT5"),g=new Int32Array(a,0,31);if(542327876!==g[0])return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"),d;if(!g[20]&4)return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"),d;var i=g[21];switch(i){case e:e=8;d.format=THREE.RGB_S3TC_DXT1_Format;
break;case f:e=16;d.format=THREE.RGBA_S3TC_DXT3_Format;break;case h:e=16;d.format=THREE.RGBA_S3TC_DXT5_Format;break;default:return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ",String.fromCharCode(i&255,i>>8&255,i>>16&255,i>>24&255)),d}d.mipmapCount=1;g[2]&131072&&!1!==b&&(d.mipmapCount=Math.max(1,g[7]));d.isCubemap=g[28]&512?!0:!1;d.width=g[4];d.height=g[3];for(var g=g[1]+4,f=d.width,h=d.height,i=d.isCubemap?6:1,j=0;j<i;j++){for(var l=0;l<d.mipmapCount;l++){var n=Math.max(4,f)/
4*Math.max(4,h)/4*e,m={data:new Uint8Array(a,g,n),width:f,height:h};d.mipmaps.push(m);g+=n;f=Math.max(0.5*f,1);h=Math.max(0.5*h,1)}f=d.width;h=d.height}return d},getNormalMap:function(a,b){var c=function(a){var b=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);return[a[0]/b,a[1]/b,a[2]/b]},b=b|1,d=a.width,e=a.height,f=document.createElement("canvas");f.width=d;f.height=e;var h=f.getContext("2d");h.drawImage(a,0,0);for(var g=h.getImageData(0,0,d,e).data,i=h.createImageData(d,e),j=i.data,l=0;l<d;l++)for(var n=
0;n<e;n++){var m=0>n-1?0:n-1,q=n+1>e-1?e-1:n+1,t=0>l-1?0:l-1,p=l+1>d-1?d-1:l+1,r=[],s=[0,0,g[4*(n*d+l)]/255*b];r.push([-1,0,g[4*(n*d+t)]/255*b]);r.push([-1,-1,g[4*(m*d+t)]/255*b]);r.push([0,-1,g[4*(m*d+l)]/255*b]);r.push([1,-1,g[4*(m*d+p)]/255*b]);r.push([1,0,g[4*(n*d+p)]/255*b]);r.push([1,1,g[4*(q*d+p)]/255*b]);r.push([0,1,g[4*(q*d+l)]/255*b]);r.push([-1,1,g[4*(q*d+t)]/255*b]);m=[];t=r.length;for(q=0;q<t;q++){var p=r[q],v=r[(q+1)%t],p=[p[0]-s[0],p[1]-s[1],p[2]-s[2]],v=[v[0]-s[0],v[1]-s[1],v[2]-s[2]];
m.push(c([p[1]*v[2]-p[2]*v[1],p[2]*v[0]-p[0]*v[2],p[0]*v[1]-p[1]*v[0]]))}r=[0,0,0];for(q=0;q<m.length;q++)r[0]+=m[q][0],r[1]+=m[q][1],r[2]+=m[q][2];r[0]/=m.length;r[1]/=m.length;r[2]/=m.length;s=4*(n*d+l);j[s]=255*((r[0]+1)/2)|0;j[s+1]=255*((r[1]+1)/2)|0;j[s+2]=255*r[2]|0;j[s+3]=255}h.putImageData(i,0,0);return f},generateDataTexture:function(a,b,c){for(var d=a*b,e=new Uint8Array(3*d),f=Math.floor(255*c.r),h=Math.floor(255*c.g),c=Math.floor(255*c.b),g=0;g<d;g++)e[3*g]=f,e[3*g+1]=h,e[3*g+2]=c;a=new THREE.DataTexture(e,
a,b,THREE.RGBFormat);a.needsUpdate=!0;return a}};THREE.SceneUtils={createMultiMaterialObject:function(a,b){for(var c=new THREE.Object3D,d=0,e=b.length;d<e;d++)c.add(new THREE.Mesh(a,b[d]));return c},detach:function(a,b,c){a.applyMatrix(b.matrixWorld);b.remove(a);c.add(a)},attach:function(a,b,c){var d=new THREE.Matrix4;d.getInverse(c.matrixWorld);a.applyMatrix(d);b.remove(a);c.add(a)}};THREE.FontUtils={faces:{},face:"helvetiker",weight:"normal",style:"normal",size:150,divisions:10,getFace:function(){return this.faces[this.face][this.weight][this.style]},loadFace:function(a){var b=a.familyName.toLowerCase();this.faces[b]=this.faces[b]||{};this.faces[b][a.cssFontWeight]=this.faces[b][a.cssFontWeight]||{};this.faces[b][a.cssFontWeight][a.cssFontStyle]=a;return this.faces[b][a.cssFontWeight][a.cssFontStyle]=a},drawText:function(a){for(var b=this.getFace(),c=this.size/b.resolution,d=
0,e=String(a).split(""),f=e.length,h=[],a=0;a<f;a++){var g=new THREE.Path,g=this.extractGlyphPoints(e[a],b,c,d,g),d=d+g.offset;h.push(g.path)}return{paths:h,offset:d/2}},extractGlyphPoints:function(a,b,c,d,e){var f=[],h,g,i,j,l,n,m,q,t,p,r,s=b.glyphs[a]||b.glyphs["?"];if(s){if(s.o){b=s._cachedOutline||(s._cachedOutline=s.o.split(" "));j=b.length;for(a=0;a<j;)switch(i=b[a++],i){case "m":i=b[a++]*c+d;l=b[a++]*c;e.moveTo(i,l);break;case "l":i=b[a++]*c+d;l=b[a++]*c;e.lineTo(i,l);break;case "q":i=b[a++]*
c+d;l=b[a++]*c;q=b[a++]*c+d;t=b[a++]*c;e.quadraticCurveTo(q,t,i,l);if(h=f[f.length-1]){n=h.x;m=h.y;h=1;for(g=this.divisions;h<=g;h++){var v=h/g;THREE.Shape.Utils.b2(v,n,q,i);THREE.Shape.Utils.b2(v,m,t,l)}}break;case "b":if(i=b[a++]*c+d,l=b[a++]*c,q=b[a++]*c+d,t=b[a++]*-c,p=b[a++]*c+d,r=b[a++]*-c,e.bezierCurveTo(i,l,q,t,p,r),h=f[f.length-1]){n=h.x;m=h.y;h=1;for(g=this.divisions;h<=g;h++)v=h/g,THREE.Shape.Utils.b3(v,n,q,p,i),THREE.Shape.Utils.b3(v,m,t,r,l)}}}return{offset:s.ha*c,path:e}}}};
THREE.FontUtils.generateShapes=function(a,b){var b=b||{},c=void 0!==b.curveSegments?b.curveSegments:4,d=void 0!==b.font?b.font:"helvetiker",e=void 0!==b.weight?b.weight:"normal",f=void 0!==b.style?b.style:"normal";THREE.FontUtils.size=void 0!==b.size?b.size:100;THREE.FontUtils.divisions=c;THREE.FontUtils.face=d;THREE.FontUtils.weight=e;THREE.FontUtils.style=f;c=THREE.FontUtils.drawText(a).paths;d=[];e=0;for(f=c.length;e<f;e++)Array.prototype.push.apply(d,c[e].toShapes());return d};
(function(a){var b=function(a){for(var b=a.length,e=0,f=b-1,h=0;h<b;f=h++)e+=a[f].x*a[h].y-a[h].x*a[f].y;return 0.5*e};a.Triangulate=function(a,d){var e=a.length;if(3>e)return null;var f=[],h=[],g=[],i,j,l;if(0<b(a))for(j=0;j<e;j++)h[j]=j;else for(j=0;j<e;j++)h[j]=e-1-j;var n=2*e;for(j=e-1;2<e;){if(0>=n--){console.log("Warning, unable to triangulate polygon!");break}i=j;e<=i&&(i=0);j=i+1;e<=j&&(j=0);l=j+1;e<=l&&(l=0);var m;a:{var q=m=void 0,t=void 0,p=void 0,r=void 0,s=void 0,v=void 0,z=void 0,G=
void 0,q=a[h[i]].x,t=a[h[i]].y,p=a[h[j]].x,r=a[h[j]].y,s=a[h[l]].x,v=a[h[l]].y;if(1E-10>(p-q)*(v-t)-(r-t)*(s-q))m=!1;else{var C=void 0,H=void 0,I=void 0,F=void 0,A=void 0,K=void 0,B=void 0,J=void 0,N=void 0,y=void 0,N=J=B=G=z=void 0,C=s-p,H=v-r,I=q-s,F=t-v,A=p-q,K=r-t;for(m=0;m<e;m++)if(!(m===i||m===j||m===l))if(z=a[h[m]].x,G=a[h[m]].y,B=z-q,J=G-t,N=z-p,y=G-r,z-=s,G-=v,N=C*y-H*N,B=A*J-K*B,J=I*G-F*z,0<=N&&0<=J&&0<=B){m=!1;break a}m=!0}}if(m){f.push([a[h[i]],a[h[j]],a[h[l]]]);g.push([h[i],h[j],h[l]]);
i=j;for(l=j+1;l<e;i++,l++)h[i]=h[l];e--;n=2*e}}return d?g:f};a.Triangulate.area=b;return a})(THREE.FontUtils);self._typeface_js={faces:THREE.FontUtils.faces,loadFace:THREE.FontUtils.loadFace};THREE.typeface_js=self._typeface_js;THREE.Curve=function(){};THREE.Curve.prototype.getPoint=function(){console.log("Warning, getPoint() not implemented!");return null};THREE.Curve.prototype.getPointAt=function(a){a=this.getUtoTmapping(a);return this.getPoint(a)};THREE.Curve.prototype.getPoints=function(a){a||(a=5);var b,c=[];for(b=0;b<=a;b++)c.push(this.getPoint(b/a));return c};THREE.Curve.prototype.getSpacedPoints=function(a){a||(a=5);var b,c=[];for(b=0;b<=a;b++)c.push(this.getPointAt(b/a));return c};
THREE.Curve.prototype.getLength=function(){var a=this.getLengths();return a[a.length-1]};THREE.Curve.prototype.getLengths=function(a){a||(a=this.__arcLengthDivisions?this.__arcLengthDivisions:200);if(this.cacheArcLengths&&this.cacheArcLengths.length==a+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;var b=[],c,d=this.getPoint(0),e,f=0;b.push(0);for(e=1;e<=a;e++)c=this.getPoint(e/a),f+=c.distanceTo(d),b.push(f),d=c;return this.cacheArcLengths=b};
THREE.Curve.prototype.updateArcLengths=function(){this.needsUpdate=!0;this.getLengths()};THREE.Curve.prototype.getUtoTmapping=function(a,b){var c=this.getLengths(),d=0,e=c.length,f;f=b?b:a*c[e-1];for(var h=0,g=e-1,i;h<=g;)if(d=Math.floor(h+(g-h)/2),i=c[d]-f,0>i)h=d+1;else if(0<i)g=d-1;else{g=d;break}d=g;if(c[d]==f)return d/(e-1);h=c[d];return c=(d+(f-h)/(c[d+1]-h))/(e-1)};THREE.Curve.prototype.getTangent=function(a){var b=a-1E-4,a=a+1E-4;0>b&&(b=0);1<a&&(a=1);b=this.getPoint(b);return this.getPoint(a).clone().sub(b).normalize()};
THREE.Curve.prototype.getTangentAt=function(a){a=this.getUtoTmapping(a);return this.getTangent(a)};
THREE.Curve.Utils={tangentQuadraticBezier:function(a,b,c,d){return 2*(1-a)*(c-b)+2*a*(d-c)},tangentCubicBezier:function(a,b,c,d,e){return-3*b*(1-a)*(1-a)+3*c*(1-a)*(1-a)-6*a*c*(1-a)+6*a*d*(1-a)-3*a*a*d+3*a*a*e},tangentSpline:function(a){return 6*a*a-6*a+(3*a*a-4*a+1)+(-6*a*a+6*a)+(3*a*a-2*a)},interpolate:function(a,b,c,d,e){var a=0.5*(c-a),d=0.5*(d-b),f=e*e;return(2*b-2*c+a+d)*e*f+(-3*b+3*c-2*a-d)*f+a*e+b}};
THREE.Curve.create=function(a,b){a.prototype=Object.create(THREE.Curve.prototype);a.prototype.getPoint=b;return a};THREE.CurvePath=function(){this.curves=[];this.bends=[];this.autoClose=!1};THREE.CurvePath.prototype=Object.create(THREE.Curve.prototype);THREE.CurvePath.prototype.add=function(a){this.curves.push(a)};THREE.CurvePath.prototype.checkConnection=function(){};THREE.CurvePath.prototype.closePath=function(){var a=this.curves[0].getPoint(0),b=this.curves[this.curves.length-1].getPoint(1);a.equals(b)||this.curves.push(new THREE.LineCurve(b,a))};
THREE.CurvePath.prototype.getPoint=function(a){for(var b=a*this.getLength(),c=this.getCurveLengths(),a=0;a<c.length;){if(c[a]>=b)return b=c[a]-b,a=this.curves[a],b=1-b/a.getLength(),a.getPointAt(b);a++}return null};THREE.CurvePath.prototype.getLength=function(){var a=this.getCurveLengths();return a[a.length-1]};
THREE.CurvePath.prototype.getCurveLengths=function(){if(this.cacheLengths&&this.cacheLengths.length==this.curves.length)return this.cacheLengths;var a=[],b=0,c,d=this.curves.length;for(c=0;c<d;c++)b+=this.curves[c].getLength(),a.push(b);return this.cacheLengths=a};
THREE.CurvePath.prototype.getBoundingBox=function(){var a=this.getPoints(),b,c,d,e,f,h;b=c=Number.NEGATIVE_INFINITY;e=f=Number.POSITIVE_INFINITY;var g,i,j,l,n=a[0]instanceof THREE.Vector3;l=n?new THREE.Vector3:new THREE.Vector2;i=0;for(j=a.length;i<j;i++)g=a[i],g.x>b?b=g.x:g.x<e&&(e=g.x),g.y>c?c=g.y:g.y<f&&(f=g.y),n&&(g.z>d?d=g.z:g.z<h&&(h=g.z)),l.add(g);a={minX:e,minY:f,maxX:b,maxY:c,centroid:l.divideScalar(j)};n&&(a.maxZ=d,a.minZ=h);return a};
THREE.CurvePath.prototype.createPointsGeometry=function(a){a=this.getPoints(a,!0);return this.createGeometry(a)};THREE.CurvePath.prototype.createSpacedPointsGeometry=function(a){a=this.getSpacedPoints(a,!0);return this.createGeometry(a)};THREE.CurvePath.prototype.createGeometry=function(a){for(var b=new THREE.Geometry,c=0;c<a.length;c++)b.vertices.push(new THREE.Vector3(a[c].x,a[c].y,a[c].z||0));return b};THREE.CurvePath.prototype.addWrapPath=function(a){this.bends.push(a)};
THREE.CurvePath.prototype.getTransformedPoints=function(a,b){var c=this.getPoints(a),d,e;b||(b=this.bends);d=0;for(e=b.length;d<e;d++)c=this.getWrapPoints(c,b[d]);return c};THREE.CurvePath.prototype.getTransformedSpacedPoints=function(a,b){var c=this.getSpacedPoints(a),d,e;b||(b=this.bends);d=0;for(e=b.length;d<e;d++)c=this.getWrapPoints(c,b[d]);return c};
THREE.CurvePath.prototype.getWrapPoints=function(a,b){var c=this.getBoundingBox(),d,e,f,h,g,i;d=0;for(e=a.length;d<e;d++)f=a[d],h=f.x,g=f.y,i=h/c.maxX,i=b.getUtoTmapping(i,h),h=b.getPoint(i),g=b.getNormalVector(i).multiplyScalar(g),f.x=h.x+g.x,f.y=h.y+g.y;return a};THREE.Gyroscope=function(){THREE.Object3D.call(this)};THREE.Gyroscope.prototype=Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld=function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)this.parent?(this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorld.decompose(this.translationWorld,this.rotationWorld,this.scaleWorld),this.matrix.decompose(this.translationObject,this.rotationObject,this.scaleObject),this.matrixWorld.makeFromPositionQuaternionScale(this.translationWorld,this.rotationObject,this.scaleWorld)):this.matrixWorld.copy(this.matrix),
this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)};THREE.Gyroscope.prototype.translationWorld=new THREE.Vector3;THREE.Gyroscope.prototype.translationObject=new THREE.Vector3;THREE.Gyroscope.prototype.rotationWorld=new THREE.Quaternion;THREE.Gyroscope.prototype.rotationObject=new THREE.Quaternion;THREE.Gyroscope.prototype.scaleWorld=new THREE.Vector3;THREE.Gyroscope.prototype.scaleObject=new THREE.Vector3;THREE.Path=function(a){THREE.CurvePath.call(this);this.actions=[];a&&this.fromPoints(a)};THREE.Path.prototype=Object.create(THREE.CurvePath.prototype);THREE.PathActions={MOVE_TO:"moveTo",LINE_TO:"lineTo",QUADRATIC_CURVE_TO:"quadraticCurveTo",BEZIER_CURVE_TO:"bezierCurveTo",CSPLINE_THRU:"splineThru",ARC:"arc",ELLIPSE:"ellipse"};THREE.Path.prototype.fromPoints=function(a){this.moveTo(a[0].x,a[0].y);for(var b=1,c=a.length;b<c;b++)this.lineTo(a[b].x,a[b].y)};
THREE.Path.prototype.moveTo=function(a,b){var c=Array.prototype.slice.call(arguments);this.actions.push({action:THREE.PathActions.MOVE_TO,args:c})};THREE.Path.prototype.lineTo=function(a,b){var c=Array.prototype.slice.call(arguments),d=this.actions[this.actions.length-1].args,d=new THREE.LineCurve(new THREE.Vector2(d[d.length-2],d[d.length-1]),new THREE.Vector2(a,b));this.curves.push(d);this.actions.push({action:THREE.PathActions.LINE_TO,args:c})};
THREE.Path.prototype.quadraticCurveTo=function(a,b,c,d){var e=Array.prototype.slice.call(arguments),f=this.actions[this.actions.length-1].args,f=new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length-2],f[f.length-1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d));this.curves.push(f);this.actions.push({action:THREE.PathActions.QUADRATIC_CURVE_TO,args:e})};
THREE.Path.prototype.bezierCurveTo=function(a,b,c,d,e,f){var h=Array.prototype.slice.call(arguments),g=this.actions[this.actions.length-1].args,g=new THREE.CubicBezierCurve(new THREE.Vector2(g[g.length-2],g[g.length-1]),new THREE.Vector2(a,b),new THREE.Vector2(c,d),new THREE.Vector2(e,f));this.curves.push(g);this.actions.push({action:THREE.PathActions.BEZIER_CURVE_TO,args:h})};
THREE.Path.prototype.splineThru=function(a){var b=Array.prototype.slice.call(arguments),c=this.actions[this.actions.length-1].args,c=[new THREE.Vector2(c[c.length-2],c[c.length-1])];Array.prototype.push.apply(c,a);c=new THREE.SplineCurve(c);this.curves.push(c);this.actions.push({action:THREE.PathActions.CSPLINE_THRU,args:b})};THREE.Path.prototype.arc=function(a,b,c,d,e,f){var h=this.actions[this.actions.length-1].args;this.absarc(a+h[h.length-2],b+h[h.length-1],c,d,e,f)};
THREE.Path.prototype.absarc=function(a,b,c,d,e,f){this.absellipse(a,b,c,c,d,e,f)};THREE.Path.prototype.ellipse=function(a,b,c,d,e,f,h){var g=this.actions[this.actions.length-1].args;this.absellipse(a+g[g.length-2],b+g[g.length-1],c,d,e,f,h)};THREE.Path.prototype.absellipse=function(a,b,c,d,e,f,h){var g=Array.prototype.slice.call(arguments),i=new THREE.EllipseCurve(a,b,c,d,e,f,h);this.curves.push(i);i=i.getPoint(h?1:0);g.push(i.x);g.push(i.y);this.actions.push({action:THREE.PathActions.ELLIPSE,args:g})};
THREE.Path.prototype.getSpacedPoints=function(a){a||(a=40);for(var b=[],c=0;c<a;c++)b.push(this.getPoint(c/a));return b};
THREE.Path.prototype.getPoints=function(a,b){if(this.useSpacedPoints)return console.log("tata"),this.getSpacedPoints(a,b);var a=a||12,c=[],d,e,f,h,g,i,j,l,n,m,q,t,p;d=0;for(e=this.actions.length;d<e;d++)switch(f=this.actions[d],h=f.action,f=f.args,h){case THREE.PathActions.MOVE_TO:c.push(new THREE.Vector2(f[0],f[1]));break;case THREE.PathActions.LINE_TO:c.push(new THREE.Vector2(f[0],f[1]));break;case THREE.PathActions.QUADRATIC_CURVE_TO:g=f[2];i=f[3];n=f[0];m=f[1];0<c.length?(h=c[c.length-1],q=h.x,
t=h.y):(h=this.actions[d-1].args,q=h[h.length-2],t=h[h.length-1]);for(f=1;f<=a;f++)p=f/a,h=THREE.Shape.Utils.b2(p,q,n,g),p=THREE.Shape.Utils.b2(p,t,m,i),c.push(new THREE.Vector2(h,p));break;case THREE.PathActions.BEZIER_CURVE_TO:g=f[4];i=f[5];n=f[0];m=f[1];j=f[2];l=f[3];0<c.length?(h=c[c.length-1],q=h.x,t=h.y):(h=this.actions[d-1].args,q=h[h.length-2],t=h[h.length-1]);for(f=1;f<=a;f++)p=f/a,h=THREE.Shape.Utils.b3(p,q,n,j,g),p=THREE.Shape.Utils.b3(p,t,m,l,i),c.push(new THREE.Vector2(h,p));break;case THREE.PathActions.CSPLINE_THRU:h=
this.actions[d-1].args;p=[new THREE.Vector2(h[h.length-2],h[h.length-1])];h=a*f[0].length;p=p.concat(f[0]);p=new THREE.SplineCurve(p);for(f=1;f<=h;f++)c.push(p.getPointAt(f/h));break;case THREE.PathActions.ARC:g=f[0];i=f[1];m=f[2];j=f[3];h=f[4];n=!!f[5];q=h-j;t=2*a;for(f=1;f<=t;f++)p=f/t,n||(p=1-p),p=j+p*q,h=g+m*Math.cos(p),p=i+m*Math.sin(p),c.push(new THREE.Vector2(h,p));break;case THREE.PathActions.ELLIPSE:g=f[0];i=f[1];m=f[2];l=f[3];j=f[4];h=f[5];n=!!f[6];q=h-j;t=2*a;for(f=1;f<=t;f++)p=f/t,n||
(p=1-p),p=j+p*q,h=g+m*Math.cos(p),p=i+l*Math.sin(p),c.push(new THREE.Vector2(h,p))}d=c[c.length-1];1E-10>Math.abs(d.x-c[0].x)&&1E-10>Math.abs(d.y-c[0].y)&&c.splice(c.length-1,1);b&&c.push(c[0]);return c};
THREE.Path.prototype.toShapes=function(a){var b,c,d,e,f=[],h=new THREE.Path;b=0;for(c=this.actions.length;b<c;b++)d=this.actions[b],e=d.args,d=d.action,d==THREE.PathActions.MOVE_TO&&0!=h.actions.length&&(f.push(h),h=new THREE.Path),h[d].apply(h,e);0!=h.actions.length&&f.push(h);if(0==f.length)return[];var g;e=[];if(1==f.length)return d=f[0],g=new THREE.Shape,g.actions=d.actions,g.curves=d.curves,e.push(g),e;b=!THREE.Shape.Utils.isClockWise(f[0].getPoints());if(a?!b:b){g=new THREE.Shape;b=0;for(c=
f.length;b<c;b++)d=f[b],h=THREE.Shape.Utils.isClockWise(d.getPoints()),(h=a?!h:h)?(g.actions=d.actions,g.curves=d.curves,e.push(g),g=new THREE.Shape):g.holes.push(d)}else{g=void 0;b=0;for(c=f.length;b<c;b++)d=f[b],h=THREE.Shape.Utils.isClockWise(d.getPoints()),(h=a?!h:h)?(g&&e.push(g),g=new THREE.Shape,g.actions=d.actions,g.curves=d.curves):g.holes.push(d);e.push(g)}return e};THREE.Shape=function(){THREE.Path.apply(this,arguments);this.holes=[]};THREE.Shape.prototype=Object.create(THREE.Path.prototype);THREE.Shape.prototype.extrude=function(a){return new THREE.ExtrudeGeometry(this,a)};THREE.Shape.prototype.makeGeometry=function(a){return new THREE.ShapeGeometry(this,a)};THREE.Shape.prototype.getPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;b<c;b++)d[b]=this.holes[b].getTransformedPoints(a,this.bends);return d};
THREE.Shape.prototype.getSpacedPointsHoles=function(a){var b,c=this.holes.length,d=[];for(b=0;b<c;b++)d[b]=this.holes[b].getTransformedSpacedPoints(a,this.bends);return d};THREE.Shape.prototype.extractAllPoints=function(a){return{shape:this.getTransformedPoints(a),holes:this.getPointsHoles(a)}};THREE.Shape.prototype.extractPoints=function(a){return this.useSpacedPoints?this.extractAllSpacedPoints(a):this.extractAllPoints(a)};
THREE.Shape.prototype.extractAllSpacedPoints=function(a){return{shape:this.getTransformedSpacedPoints(a),holes:this.getSpacedPointsHoles(a)}};
THREE.Shape.Utils={removeHoles:function(a,b){var c=a.concat(),d=c.concat(),e,f,h,g,i,j,l,n,m,q,t=[];for(i=0;i<b.length;i++){j=b[i];Array.prototype.push.apply(d,j);f=Number.POSITIVE_INFINITY;for(e=0;e<j.length;e++){m=j[e];q=[];for(n=0;n<c.length;n++)l=c[n],l=m.distanceToSquared(l),q.push(l),l<f&&(f=l,h=e,g=n)}e=0<=g-1?g-1:c.length-1;f=0<=h-1?h-1:j.length-1;var p=[j[h],c[g],c[e]];n=THREE.FontUtils.Triangulate.area(p);var r=[j[h],j[f],c[g]];m=THREE.FontUtils.Triangulate.area(r);q=g;l=h;g+=1;h+=-1;0>
g&&(g+=c.length);g%=c.length;0>h&&(h+=j.length);h%=j.length;e=0<=g-1?g-1:c.length-1;f=0<=h-1?h-1:j.length-1;p=[j[h],c[g],c[e]];p=THREE.FontUtils.Triangulate.area(p);r=[j[h],j[f],c[g]];r=THREE.FontUtils.Triangulate.area(r);n+m>p+r&&(g=q,h=l,0>g&&(g+=c.length),g%=c.length,0>h&&(h+=j.length),h%=j.length,e=0<=g-1?g-1:c.length-1,f=0<=h-1?h-1:j.length-1);n=c.slice(0,g);m=c.slice(g);q=j.slice(h);l=j.slice(0,h);f=[j[h],j[f],c[g]];t.push([j[h],c[g],c[e]]);t.push(f);c=n.concat(q).concat(l).concat(m)}return{shape:c,
isolatedPts:t,allpoints:d}},triangulateShape:function(a,b){var c=THREE.Shape.Utils.removeHoles(a,b),d=c.allpoints,e=c.isolatedPts,c=THREE.FontUtils.Triangulate(c.shape,!1),f,h,g,i,j={};f=0;for(h=d.length;f<h;f++)i=d[f].x+":"+d[f].y,void 0!==j[i]&&console.log("Duplicate point",i),j[i]=f;f=0;for(h=c.length;f<h;f++){g=c[f];for(d=0;3>d;d++)i=g[d].x+":"+g[d].y,i=j[i],void 0!==i&&(g[d]=i)}f=0;for(h=e.length;f<h;f++){g=e[f];for(d=0;3>d;d++)i=g[d].x+":"+g[d].y,i=j[i],void 0!==i&&(g[d]=i)}return c.concat(e)},
isClockWise:function(a){return 0>THREE.FontUtils.Triangulate.area(a)},b2p0:function(a,b){var c=1-a;return c*c*b},b2p1:function(a,b){return 2*(1-a)*a*b},b2p2:function(a,b){return a*a*b},b2:function(a,b,c,d){return this.b2p0(a,b)+this.b2p1(a,c)+this.b2p2(a,d)},b3p0:function(a,b){var c=1-a;return c*c*c*b},b3p1:function(a,b){var c=1-a;return 3*c*c*a*b},b3p2:function(a,b){return 3*(1-a)*a*a*b},b3p3:function(a,b){return a*a*a*b},b3:function(a,b,c,d,e){return this.b3p0(a,b)+this.b3p1(a,c)+this.b3p2(a,d)+
this.b3p3(a,e)}};THREE.LineCurve=function(a,b){this.v1=a;this.v2=b};THREE.LineCurve.prototype=Object.create(THREE.Curve.prototype);THREE.LineCurve.prototype.getPoint=function(a){var b=this.v2.clone().sub(this.v1);b.multiplyScalar(a).add(this.v1);return b};THREE.LineCurve.prototype.getPointAt=function(a){return this.getPoint(a)};THREE.LineCurve.prototype.getTangent=function(){return this.v2.clone().sub(this.v1).normalize()};THREE.QuadraticBezierCurve=function(a,b,c){this.v0=a;this.v1=b;this.v2=c};THREE.QuadraticBezierCurve.prototype=Object.create(THREE.Curve.prototype);THREE.QuadraticBezierCurve.prototype.getPoint=function(a){var b;b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x);a=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y);return new THREE.Vector2(b,a)};
THREE.QuadraticBezierCurve.prototype.getTangent=function(a){var b;b=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.x,this.v1.x,this.v2.x);a=THREE.Curve.Utils.tangentQuadraticBezier(a,this.v0.y,this.v1.y,this.v2.y);b=new THREE.Vector2(b,a);b.normalize();return b};THREE.CubicBezierCurve=function(a,b,c,d){this.v0=a;this.v1=b;this.v2=c;this.v3=d};THREE.CubicBezierCurve.prototype=Object.create(THREE.Curve.prototype);THREE.CubicBezierCurve.prototype.getPoint=function(a){var b;b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);a=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);return new THREE.Vector2(b,a)};
THREE.CubicBezierCurve.prototype.getTangent=function(a){var b;b=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);a=THREE.Curve.Utils.tangentCubicBezier(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);b=new THREE.Vector2(b,a);b.normalize();return b};THREE.SplineCurve=function(a){this.points=void 0==a?[]:a};THREE.SplineCurve.prototype=Object.create(THREE.Curve.prototype);THREE.SplineCurve.prototype.getPoint=function(a){var b=new THREE.Vector2,c=[],d=this.points,e;e=(d.length-1)*a;a=Math.floor(e);e-=a;c[0]=0==a?a:a-1;c[1]=a;c[2]=a>d.length-2?d.length-1:a+1;c[3]=a>d.length-3?d.length-1:a+2;b.x=THREE.Curve.Utils.interpolate(d[c[0]].x,d[c[1]].x,d[c[2]].x,d[c[3]].x,e);b.y=THREE.Curve.Utils.interpolate(d[c[0]].y,d[c[1]].y,d[c[2]].y,d[c[3]].y,e);return b};THREE.EllipseCurve=function(a,b,c,d,e,f,h){this.aX=a;this.aY=b;this.xRadius=c;this.yRadius=d;this.aStartAngle=e;this.aEndAngle=f;this.aClockwise=h};THREE.EllipseCurve.prototype=Object.create(THREE.Curve.prototype);THREE.EllipseCurve.prototype.getPoint=function(a){var b=this.aEndAngle-this.aStartAngle;this.aClockwise||(a=1-a);b=this.aStartAngle+a*b;a=this.aX+this.xRadius*Math.cos(b);b=this.aY+this.yRadius*Math.sin(b);return new THREE.Vector2(a,b)};THREE.ArcCurve=function(a,b,c,d,e,f){THREE.EllipseCurve.call(this,a,b,c,c,d,e,f)};THREE.ArcCurve.prototype=Object.create(THREE.EllipseCurve.prototype);THREE.LineCurve3=THREE.Curve.create(function(a,b){this.v1=a;this.v2=b},function(a){var b=new THREE.Vector3;b.subVectors(this.v2,this.v1);b.multiplyScalar(a);b.add(this.v1);return b});THREE.QuadraticBezierCurve3=THREE.Curve.create(function(a,b,c){this.v0=a;this.v1=b;this.v2=c},function(a){var b,c;b=THREE.Shape.Utils.b2(a,this.v0.x,this.v1.x,this.v2.x);c=THREE.Shape.Utils.b2(a,this.v0.y,this.v1.y,this.v2.y);a=THREE.Shape.Utils.b2(a,this.v0.z,this.v1.z,this.v2.z);return new THREE.Vector3(b,c,a)});THREE.CubicBezierCurve3=THREE.Curve.create(function(a,b,c,d){this.v0=a;this.v1=b;this.v2=c;this.v3=d},function(a){var b,c;b=THREE.Shape.Utils.b3(a,this.v0.x,this.v1.x,this.v2.x,this.v3.x);c=THREE.Shape.Utils.b3(a,this.v0.y,this.v1.y,this.v2.y,this.v3.y);a=THREE.Shape.Utils.b3(a,this.v0.z,this.v1.z,this.v2.z,this.v3.z);return new THREE.Vector3(b,c,a)});THREE.SplineCurve3=THREE.Curve.create(function(a){this.points=void 0==a?[]:a},function(a){var b=new THREE.Vector3,c=[],d=this.points,e,a=(d.length-1)*a;e=Math.floor(a);a-=e;c[0]=0==e?e:e-1;c[1]=e;c[2]=e>d.length-2?d.length-1:e+1;c[3]=e>d.length-3?d.length-1:e+2;e=d[c[0]];var f=d[c[1]],h=d[c[2]],c=d[c[3]];b.x=THREE.Curve.Utils.interpolate(e.x,f.x,h.x,c.x,a);b.y=THREE.Curve.Utils.interpolate(e.y,f.y,h.y,c.y,a);b.z=THREE.Curve.Utils.interpolate(e.z,f.z,h.z,c.z,a);return b});THREE.ClosedSplineCurve3=THREE.Curve.create(function(a){this.points=void 0==a?[]:a},function(a){var b=new THREE.Vector3,c=[],d=this.points,e;e=(d.length-0)*a;a=Math.floor(e);e-=a;a+=0<a?0:(Math.floor(Math.abs(a)/d.length)+1)*d.length;c[0]=(a-1)%d.length;c[1]=a%d.length;c[2]=(a+1)%d.length;c[3]=(a+2)%d.length;b.x=THREE.Curve.Utils.interpolate(d[c[0]].x,d[c[1]].x,d[c[2]].x,d[c[3]].x,e);b.y=THREE.Curve.Utils.interpolate(d[c[0]].y,d[c[1]].y,d[c[2]].y,d[c[3]].y,e);b.z=THREE.Curve.Utils.interpolate(d[c[0]].z,
d[c[1]].z,d[c[2]].z,d[c[3]].z,e);return b});THREE.AnimationHandler=function(){var a=[],b={},c={update:function(b){for(var c=0;c<a.length;c++)a[c].update(b)},addToUpdate:function(b){-1===a.indexOf(b)&&a.push(b)},removeFromUpdate:function(b){b=a.indexOf(b);-1!==b&&a.splice(b,1)},add:function(a){void 0!==b[a.name]&&console.log("THREE.AnimationHandler.add: Warning! "+a.name+" already exists in library. Overwriting.");b[a.name]=a;if(!0!==a.initialized){for(var c=0;c<a.hierarchy.length;c++){for(var d=0;d<a.hierarchy[c].keys.length;d++)if(0>a.hierarchy[c].keys[d].time&&
(a.hierarchy[c].keys[d].time=0),void 0!==a.hierarchy[c].keys[d].rot&&!(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)){var g=a.hierarchy[c].keys[d].rot;a.hierarchy[c].keys[d].rot=new THREE.Quaternion(g[0],g[1],g[2],g[3])}if(a.hierarchy[c].keys.length&&void 0!==a.hierarchy[c].keys[0].morphTargets){g={};for(d=0;d<a.hierarchy[c].keys.length;d++)for(var i=0;i<a.hierarchy[c].keys[d].morphTargets.length;i++){var j=a.hierarchy[c].keys[d].morphTargets[i];g[j]=-1}a.hierarchy[c].usedMorphTargets=g;
for(d=0;d<a.hierarchy[c].keys.length;d++){var l={};for(j in g){for(i=0;i<a.hierarchy[c].keys[d].morphTargets.length;i++)if(a.hierarchy[c].keys[d].morphTargets[i]===j){l[j]=a.hierarchy[c].keys[d].morphTargetsInfluences[i];break}i===a.hierarchy[c].keys[d].morphTargets.length&&(l[j]=0)}a.hierarchy[c].keys[d].morphTargetsInfluences=l}}for(d=1;d<a.hierarchy[c].keys.length;d++)a.hierarchy[c].keys[d].time===a.hierarchy[c].keys[d-1].time&&(a.hierarchy[c].keys.splice(d,1),d--);for(d=0;d<a.hierarchy[c].keys.length;d++)a.hierarchy[c].keys[d].index=
d}d=parseInt(a.length*a.fps,10);a.JIT={};a.JIT.hierarchy=[];for(c=0;c<a.hierarchy.length;c++)a.JIT.hierarchy.push(Array(d));a.initialized=!0}},get:function(a){if("string"===typeof a){if(b[a])return b[a];console.log("THREE.AnimationHandler.get: Couldn't find animation "+a);return null}},parse:function(a){var b=[];if(a instanceof THREE.SkinnedMesh)for(var c=0;c<a.bones.length;c++)b.push(a.bones[c]);else d(a,b);return b}},d=function(a,b){b.push(a);for(var c=0;c<a.children.length;c++)d(a.children[c],
b)};c.LINEAR=0;c.CATMULLROM=1;c.CATMULLROM_FORWARD=2;return c}();THREE.Animation=function(a,b,c){this.root=a;this.data=THREE.AnimationHandler.get(b);this.hierarchy=THREE.AnimationHandler.parse(a);this.currentTime=0;this.timeScale=1;this.isPlaying=!1;this.loop=this.isPaused=!0;this.interpolationType=void 0!==c?c:THREE.AnimationHandler.LINEAR;this.points=[];this.target=new THREE.Vector3};
THREE.Animation.prototype.play=function(a,b){if(!1===this.isPlaying){this.isPlaying=!0;this.loop=void 0!==a?a:!0;this.currentTime=void 0!==b?b:0;var c,d=this.hierarchy.length,e;for(c=0;c<d;c++){e=this.hierarchy[c];this.interpolationType!==THREE.AnimationHandler.CATMULLROM_FORWARD&&(e.useQuaternion=!0);e.matrixAutoUpdate=!0;void 0===e.animationCache&&(e.animationCache={},e.animationCache.prevKey={pos:0,rot:0,scl:0},e.animationCache.nextKey={pos:0,rot:0,scl:0},e.animationCache.originalMatrix=e instanceof
THREE.Bone?e.skinMatrix:e.matrix);var f=e.animationCache.prevKey;e=e.animationCache.nextKey;f.pos=this.data.hierarchy[c].keys[0];f.rot=this.data.hierarchy[c].keys[0];f.scl=this.data.hierarchy[c].keys[0];e.pos=this.getNextKeyWith("pos",c,1);e.rot=this.getNextKeyWith("rot",c,1);e.scl=this.getNextKeyWith("scl",c,1)}this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};
THREE.Animation.prototype.pause=function(){!0===this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};THREE.Animation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this)};
THREE.Animation.prototype.update=function(a){if(!1!==this.isPlaying){var b=["pos","rot","scl"],c,d,e,f,h,g,i,j,l;l=this.currentTime+=a*this.timeScale;j=this.currentTime%=this.data.length;parseInt(Math.min(j*this.data.fps,this.data.length*this.data.fps),10);for(var n=0,m=this.hierarchy.length;n<m;n++){a=this.hierarchy[n];i=a.animationCache;for(var q=0;3>q;q++){c=b[q];h=i.prevKey[c];g=i.nextKey[c];if(g.time<=l){if(j<l)if(this.loop){h=this.data.hierarchy[n].keys[0];for(g=this.getNextKeyWith(c,n,1);g.time<
j;)h=g,g=this.getNextKeyWith(c,n,g.index+1)}else{this.stop();return}else{do h=g,g=this.getNextKeyWith(c,n,g.index+1);while(g.time<j)}i.prevKey[c]=h;i.nextKey[c]=g}a.matrixAutoUpdate=!0;a.matrixWorldNeedsUpdate=!0;d=(j-h.time)/(g.time-h.time);e=h[c];f=g[c];if(0>d||1<d)console.log("THREE.Animation.update: Warning! Scale out of bounds:"+d+" on bone "+n),d=0>d?0:1;if("pos"===c)if(c=a.position,this.interpolationType===THREE.AnimationHandler.LINEAR)c.x=e[0]+(f[0]-e[0])*d,c.y=e[1]+(f[1]-e[1])*d,c.z=e[2]+
(f[2]-e[2])*d;else{if(this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD)this.points[0]=this.getPrevKeyWith("pos",n,h.index-1).pos,this.points[1]=e,this.points[2]=f,this.points[3]=this.getNextKeyWith("pos",n,g.index+1).pos,d=0.33*d+0.33,e=this.interpolateCatmullRom(this.points,d),c.x=e[0],c.y=e[1],c.z=e[2],this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD&&(d=this.interpolateCatmullRom(this.points,1.01*d),
this.target.set(d[0],d[1],d[2]),this.target.sub(c),this.target.y=0,this.target.normalize(),d=Math.atan2(this.target.x,this.target.z),a.rotation.set(0,d,0))}else"rot"===c?THREE.Quaternion.slerp(e,f,a.quaternion,d):"scl"===c&&(c=a.scale,c.x=e[0]+(f[0]-e[0])*d,c.y=e[1]+(f[1]-e[1])*d,c.z=e[2]+(f[2]-e[2])*d)}}}};
THREE.Animation.prototype.interpolateCatmullRom=function(a,b){var c=[],d=[],e,f,h,g,i,j;e=(a.length-1)*b;f=Math.floor(e);e-=f;c[0]=0===f?f:f-1;c[1]=f;c[2]=f>a.length-2?f:f+1;c[3]=f>a.length-3?f:f+2;f=a[c[0]];g=a[c[1]];i=a[c[2]];j=a[c[3]];c=e*e;h=e*c;d[0]=this.interpolate(f[0],g[0],i[0],j[0],e,c,h);d[1]=this.interpolate(f[1],g[1],i[1],j[1],e,c,h);d[2]=this.interpolate(f[2],g[2],i[2],j[2],e,c,h);return d};
THREE.Animation.prototype.interpolate=function(a,b,c,d,e,f,h){a=0.5*(c-a);d=0.5*(d-b);return(2*(b-c)+a+d)*h+(-3*(b-c)-2*a-d)*f+a*e+b};THREE.Animation.prototype.getNextKeyWith=function(a,b,c){for(var d=this.data.hierarchy[b].keys,c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?c<d.length-1?c:d.length-1:c%d.length;c<d.length;c++)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[0]};
THREE.Animation.prototype.getPrevKeyWith=function(a,b,c){for(var d=this.data.hierarchy[b].keys,c=this.interpolationType===THREE.AnimationHandler.CATMULLROM||this.interpolationType===THREE.AnimationHandler.CATMULLROM_FORWARD?0<c?c:0:0<=c?c:c+d.length;0<=c;c--)if(void 0!==d[c][a])return d[c];return this.data.hierarchy[b].keys[d.length-1]};THREE.KeyFrameAnimation=function(a,b,c){this.root=a;this.data=THREE.AnimationHandler.get(b);this.hierarchy=THREE.AnimationHandler.parse(a);this.currentTime=0;this.timeScale=0.001;this.isPlaying=!1;this.loop=this.isPaused=!0;this.JITCompile=void 0!==c?c:!0;a=0;for(b=this.hierarchy.length;a<b;a++){var c=this.data.hierarchy[a].sids,d=this.hierarchy[a];if(this.data.hierarchy[a].keys.length&&c){for(var e=0;e<c.length;e++){var f=c[e],h=this.getNextKeyWith(f,a,0);h&&h.apply(f)}d.matrixAutoUpdate=!1;this.data.hierarchy[a].node.updateMatrix();
d.matrixWorldNeedsUpdate=!0}}};
THREE.KeyFrameAnimation.prototype.play=function(a,b){if(!this.isPlaying){this.isPlaying=!0;this.loop=void 0!==a?a:!0;this.currentTime=void 0!==b?b:0;this.startTimeMs=b;this.startTime=1E7;this.endTime=-this.startTime;var c,d=this.hierarchy.length,e,f;for(c=0;c<d;c++)e=this.hierarchy[c],f=this.data.hierarchy[c],e.useQuaternion=!0,void 0===f.animationCache&&(f.animationCache={},f.animationCache.prevKey=null,f.animationCache.nextKey=null,f.animationCache.originalMatrix=e instanceof THREE.Bone?e.skinMatrix:
e.matrix),e=this.data.hierarchy[c].keys,e.length&&(f.animationCache.prevKey=e[0],f.animationCache.nextKey=e[1],this.startTime=Math.min(e[0].time,this.startTime),this.endTime=Math.max(e[e.length-1].time,this.endTime));this.update(0)}this.isPaused=!1;THREE.AnimationHandler.addToUpdate(this)};THREE.KeyFrameAnimation.prototype.pause=function(){this.isPaused?THREE.AnimationHandler.addToUpdate(this):THREE.AnimationHandler.removeFromUpdate(this);this.isPaused=!this.isPaused};
THREE.KeyFrameAnimation.prototype.stop=function(){this.isPaused=this.isPlaying=!1;THREE.AnimationHandler.removeFromUpdate(this);for(var a=0;a<this.data.hierarchy.length;a++){var b=this.hierarchy[a],c=this.data.hierarchy[a];if(void 0!==c.animationCache){var d=c.animationCache.originalMatrix;b instanceof THREE.Bone?(d.copy(b.skinMatrix),b.skinMatrix=d):(d.copy(b.matrix),b.matrix=d);delete c.animationCache}}};
THREE.KeyFrameAnimation.prototype.update=function(a){if(this.isPlaying){var b,c,d,e,f=this.data.JIT.hierarchy,h,g,i;g=this.currentTime+=a*this.timeScale;h=this.currentTime%=this.data.length;h<this.startTimeMs&&(h=this.currentTime=this.startTimeMs+h);e=parseInt(Math.min(h*this.data.fps,this.data.length*this.data.fps),10);if((i=h<g)&&!this.loop){for(var a=0,j=this.hierarchy.length;a<j;a++){var l=this.data.hierarchy[a].keys,f=this.data.hierarchy[a].sids;d=l.length-1;e=this.hierarchy[a];if(l.length){for(l=
0;l<f.length;l++)h=f[l],(g=this.getPrevKeyWith(h,a,d))&&g.apply(h);this.data.hierarchy[a].node.updateMatrix();e.matrixWorldNeedsUpdate=!0}}this.stop()}else if(!(h<this.startTime)){a=0;for(j=this.hierarchy.length;a<j;a++){d=this.hierarchy[a];b=this.data.hierarchy[a];var l=b.keys,n=b.animationCache;if(this.JITCompile&&void 0!==f[a][e])d instanceof THREE.Bone?(d.skinMatrix=f[a][e],d.matrixWorldNeedsUpdate=!1):(d.matrix=f[a][e],d.matrixWorldNeedsUpdate=!0);else if(l.length){this.JITCompile&&n&&(d instanceof
THREE.Bone?d.skinMatrix=n.originalMatrix:d.matrix=n.originalMatrix);b=n.prevKey;c=n.nextKey;if(b&&c){if(c.time<=g){if(i&&this.loop){b=l[0];for(c=l[1];c.time<h;)b=c,c=l[b.index+1]}else if(!i)for(var m=l.length-1;c.time<h&&c.index!==m;)b=c,c=l[b.index+1];n.prevKey=b;n.nextKey=c}c.time>=h?b.interpolate(c,h):b.interpolate(c,c.time)}this.data.hierarchy[a].node.updateMatrix();d.matrixWorldNeedsUpdate=!0}}if(this.JITCompile&&void 0===f[0][e]){this.hierarchy[0].updateMatrixWorld(!0);for(a=0;a<this.hierarchy.length;a++)f[a][e]=
this.hierarchy[a]instanceof THREE.Bone?this.hierarchy[a].skinMatrix.clone():this.hierarchy[a].matrix.clone()}}}};THREE.KeyFrameAnimation.prototype.getNextKeyWith=function(a,b,c){b=this.data.hierarchy[b].keys;for(c%=b.length;c<b.length;c++)if(b[c].hasTarget(a))return b[c];return b[0]};THREE.KeyFrameAnimation.prototype.getPrevKeyWith=function(a,b,c){b=this.data.hierarchy[b].keys;for(c=0<=c?c:c+b.length;0<=c;c--)if(b[c].hasTarget(a))return b[c];return b[b.length-1]};THREE.CubeCamera=function(a,b,c){THREE.Object3D.call(this);var d=new THREE.PerspectiveCamera(90,1,a,b);d.up.set(0,-1,0);d.lookAt(new THREE.Vector3(1,0,0));this.add(d);var e=new THREE.PerspectiveCamera(90,1,a,b);e.up.set(0,-1,0);e.lookAt(new THREE.Vector3(-1,0,0));this.add(e);var f=new THREE.PerspectiveCamera(90,1,a,b);f.up.set(0,0,1);f.lookAt(new THREE.Vector3(0,1,0));this.add(f);var h=new THREE.PerspectiveCamera(90,1,a,b);h.up.set(0,0,-1);h.lookAt(new THREE.Vector3(0,-1,0));this.add(h);var g=new THREE.PerspectiveCamera(90,
1,a,b);g.up.set(0,-1,0);g.lookAt(new THREE.Vector3(0,0,1));this.add(g);var i=new THREE.PerspectiveCamera(90,1,a,b);i.up.set(0,-1,0);i.lookAt(new THREE.Vector3(0,0,-1));this.add(i);this.renderTarget=new THREE.WebGLRenderTargetCube(c,c,{format:THREE.RGBFormat,magFilter:THREE.LinearFilter,minFilter:THREE.LinearFilter});this.updateCubeMap=function(a,b){var c=this.renderTarget,m=c.generateMipmaps;c.generateMipmaps=!1;c.activeCubeFace=0;a.render(b,d,c);c.activeCubeFace=1;a.render(b,e,c);c.activeCubeFace=
2;a.render(b,f,c);c.activeCubeFace=3;a.render(b,h,c);c.activeCubeFace=4;a.render(b,g,c);c.generateMipmaps=m;c.activeCubeFace=5;a.render(b,i,c)}};THREE.CubeCamera.prototype=Object.create(THREE.Object3D.prototype);THREE.CombinedCamera=function(a,b,c,d,e,f,h){THREE.Camera.call(this);this.fov=c;this.left=-a/2;this.right=a/2;this.top=b/2;this.bottom=-b/2;this.cameraO=new THREE.OrthographicCamera(a/-2,a/2,b/2,b/-2,f,h);this.cameraP=new THREE.PerspectiveCamera(c,a/b,d,e);this.zoom=1;this.toPerspective()};THREE.CombinedCamera.prototype=Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective=function(){this.near=this.cameraP.near;this.far=this.cameraP.far;this.cameraP.fov=this.fov/this.zoom;this.cameraP.updateProjectionMatrix();this.projectionMatrix=this.cameraP.projectionMatrix;this.inPerspectiveMode=!0;this.inOrthographicMode=!1};
THREE.CombinedCamera.prototype.toOrthographic=function(){var a=this.cameraP.aspect,b=(this.cameraP.near+this.cameraP.far)/2,b=Math.tan(this.fov/2)*b,a=2*b*a/2,b=b/this.zoom,a=a/this.zoom;this.cameraO.left=-a;this.cameraO.right=a;this.cameraO.top=b;this.cameraO.bottom=-b;this.cameraO.updateProjectionMatrix();this.near=this.cameraO.near;this.far=this.cameraO.far;this.projectionMatrix=this.cameraO.projectionMatrix;this.inPerspectiveMode=!1;this.inOrthographicMode=!0};
THREE.CombinedCamera.prototype.setSize=function(a,b){this.cameraP.aspect=a/b;this.left=-a/2;this.right=a/2;this.top=b/2;this.bottom=-b/2};THREE.CombinedCamera.prototype.setFov=function(a){this.fov=a;this.inPerspectiveMode?this.toPerspective():this.toOrthographic()};THREE.CombinedCamera.prototype.updateProjectionMatrix=function(){this.inPerspectiveMode?this.toPerspective():(this.toPerspective(),this.toOrthographic())};
THREE.CombinedCamera.prototype.setLens=function(a,b){void 0===b&&(b=24);var c=2*THREE.Math.radToDeg(Math.atan(b/(2*a)));this.setFov(c);return c};THREE.CombinedCamera.prototype.setZoom=function(a){this.zoom=a;this.inPerspectiveMode?this.toPerspective():this.toOrthographic()};THREE.CombinedCamera.prototype.toFrontView=function(){this.rotation.x=0;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};
THREE.CombinedCamera.prototype.toBackView=function(){this.rotation.x=0;this.rotation.y=Math.PI;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toLeftView=function(){this.rotation.x=0;this.rotation.y=-Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toRightView=function(){this.rotation.x=0;this.rotation.y=Math.PI/2;this.rotation.z=0;this.rotationAutoUpdate=!1};
THREE.CombinedCamera.prototype.toTopView=function(){this.rotation.x=-Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CombinedCamera.prototype.toBottomView=function(){this.rotation.x=Math.PI/2;this.rotation.y=0;this.rotation.z=0;this.rotationAutoUpdate=!1};THREE.CircleGeometry=function(a,b,c,d){THREE.Geometry.call(this);var a=a||50,c=void 0!==c?c:0,d=void 0!==d?d:2*Math.PI,b=void 0!==b?Math.max(3,b):8,e,f=[];e=new THREE.Vector3;var h=new THREE.Vector2(0.5,0.5);this.vertices.push(e);f.push(h);for(e=0;e<=b;e++){var g=new THREE.Vector3,i=c+e/b*d;g.x=a*Math.cos(i);g.y=a*Math.sin(i);this.vertices.push(g);f.push(new THREE.Vector2((g.x/a+1)/2,(g.y/a+1)/2))}c=new THREE.Vector3(0,0,1);for(e=1;e<=b;e++)this.faces.push(new THREE.Face3(e,e+1,0,[c,c,c])),this.faceVertexUvs[0].push([f[e],
f[e+1],h]);this.computeCentroids();this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,a)};THREE.CircleGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.CubeGeometry=function(a,b,c,d,e,f){function h(a,b,c,d,e,f,h,p){var r,s=g.widthSegments,v=g.heightSegments,z=e/2,G=f/2,C=g.vertices.length;if("x"===a&&"y"===b||"y"===a&&"x"===b)r="z";else if("x"===a&&"z"===b||"z"===a&&"x"===b)r="y",v=g.depthSegments;else if("z"===a&&"y"===b||"y"===a&&"z"===b)r="x",s=g.depthSegments;var H=s+1,I=v+1,F=e/s,A=f/v,K=new THREE.Vector3;K[r]=0<h?1:-1;for(e=0;e<I;e++)for(f=0;f<H;f++){var B=new THREE.Vector3;B[a]=(f*F-z)*c;B[b]=(e*A-G)*d;B[r]=h;g.vertices.push(B)}for(e=
0;e<v;e++)for(f=0;f<s;f++)a=new THREE.Face4(f+H*e+C,f+H*(e+1)+C,f+1+H*(e+1)+C,f+1+H*e+C),a.normal.copy(K),a.vertexNormals.push(K.clone(),K.clone(),K.clone(),K.clone()),a.materialIndex=p,g.faces.push(a),g.faceVertexUvs[0].push([new THREE.Vector2(f/s,1-e/v),new THREE.Vector2(f/s,1-(e+1)/v),new THREE.Vector2((f+1)/s,1-(e+1)/v),new THREE.Vector2((f+1)/s,1-e/v)])}THREE.Geometry.call(this);var g=this;this.width=a;this.height=b;this.depth=c;this.widthSegments=d||1;this.heightSegments=e||1;this.depthSegments=
f||1;a=this.width/2;b=this.height/2;c=this.depth/2;h("z","y",-1,-1,this.depth,this.height,a,0);h("z","y",1,-1,this.depth,this.height,-a,1);h("x","z",1,1,this.width,this.depth,b,2);h("x","z",1,-1,this.width,this.depth,-b,3);h("x","y",1,-1,this.width,this.height,c,4);h("x","y",-1,-1,this.width,this.height,-c,5);this.computeCentroids();this.mergeVertices()};THREE.CubeGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.CylinderGeometry=function(a,b,c,d,e,f){THREE.Geometry.call(this);this.radiusTop=a=void 0!==a?a:20;this.radiusBottom=b=void 0!==b?b:20;this.height=c=void 0!==c?c:100;this.radialSegments=d=d||8;this.heightSegments=e=e||1;this.openEnded=f=void 0!==f?f:!1;var h=c/2,g,i,j=[],l=[];for(i=0;i<=e;i++){var n=[],m=[],q=i/e,t=q*(b-a)+a;for(g=0;g<=d;g++){var p=g/d,r=new THREE.Vector3;r.x=t*Math.sin(2*p*Math.PI);r.y=-q*c+h;r.z=t*Math.cos(2*p*Math.PI);this.vertices.push(r);n.push(this.vertices.length-1);m.push(new THREE.Vector2(p,
1-q))}j.push(n);l.push(m)}c=(b-a)/c;for(g=0;g<d;g++){0!==a?(n=this.vertices[j[0][g]].clone(),m=this.vertices[j[0][g+1]].clone()):(n=this.vertices[j[1][g]].clone(),m=this.vertices[j[1][g+1]].clone());n.setY(Math.sqrt(n.x*n.x+n.z*n.z)*c).normalize();m.setY(Math.sqrt(m.x*m.x+m.z*m.z)*c).normalize();for(i=0;i<e;i++){var q=j[i][g],t=j[i+1][g],p=j[i+1][g+1],r=j[i][g+1],s=n.clone(),v=n.clone(),z=m.clone(),G=m.clone(),C=l[i][g].clone(),H=l[i+1][g].clone(),I=l[i+1][g+1].clone(),F=l[i][g+1].clone();this.faces.push(new THREE.Face4(q,
t,p,r,[s,v,z,G]));this.faceVertexUvs[0].push([C,H,I,F])}}if(!1===f&&0<a){this.vertices.push(new THREE.Vector3(0,h,0));for(g=0;g<d;g++)q=j[0][g],t=j[0][g+1],p=this.vertices.length-1,s=new THREE.Vector3(0,1,0),v=new THREE.Vector3(0,1,0),z=new THREE.Vector3(0,1,0),C=l[0][g].clone(),H=l[0][g+1].clone(),I=new THREE.Vector2(H.u,0),this.faces.push(new THREE.Face3(q,t,p,[s,v,z])),this.faceVertexUvs[0].push([C,H,I])}if(!1===f&&0<b){this.vertices.push(new THREE.Vector3(0,-h,0));for(g=0;g<d;g++)q=j[i][g+1],
t=j[i][g],p=this.vertices.length-1,s=new THREE.Vector3(0,-1,0),v=new THREE.Vector3(0,-1,0),z=new THREE.Vector3(0,-1,0),C=l[i][g+1].clone(),H=l[i][g].clone(),I=new THREE.Vector2(H.u,1),this.faces.push(new THREE.Face3(q,t,p,[s,v,z])),this.faceVertexUvs[0].push([C,H,I])}this.computeCentroids();this.computeFaceNormals()};THREE.CylinderGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ExtrudeGeometry=function(a,b){"undefined"!==typeof a&&(THREE.Geometry.call(this),a=a instanceof Array?a:[a],this.shapebb=a[a.length-1].getBoundingBox(),this.addShapeList(a,b),this.computeCentroids(),this.computeFaceNormals())};THREE.ExtrudeGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ExtrudeGeometry.prototype.addShapeList=function(a,b){for(var c=a.length,d=0;d<c;d++)this.addShape(a[d],b)};
THREE.ExtrudeGeometry.prototype.addShape=function(a,b){function c(a,b,c){b||console.log("die");return b.clone().multiplyScalar(c).add(a)}function d(a,b,c){var d=THREE.ExtrudeGeometry.__v1,e=THREE.ExtrudeGeometry.__v2,f=THREE.ExtrudeGeometry.__v3,g=THREE.ExtrudeGeometry.__v4,h=THREE.ExtrudeGeometry.__v5,i=THREE.ExtrudeGeometry.__v6;d.set(a.x-b.x,a.y-b.y);e.set(a.x-c.x,a.y-c.y);d=d.normalize();e=e.normalize();f.set(-d.y,d.x);g.set(e.y,-e.x);h.copy(a).add(f);i.copy(a).add(g);if(h.equals(i))return g.clone();
h.copy(b).add(f);i.copy(c).add(g);f=d.dot(g);g=i.sub(h).dot(g);0===f&&(console.log("Either infinite or no solutions!"),0===g?console.log("Its finite solutions."):console.log("Too bad, no solutions."));g/=f;return 0>g?(b=Math.atan2(b.y-a.y,b.x-a.x),a=Math.atan2(c.y-a.y,c.x-a.x),b>a&&(a+=2*Math.PI),c=(b+a)/2,a=-Math.cos(c),c=-Math.sin(c),new THREE.Vector2(a,c)):d.multiplyScalar(g).add(h).sub(a).clone()}function e(c,d){var e,f;for(O=c.length;0<=--O;){e=O;f=O-1;0>f&&(f=c.length-1);for(var g=0,h=q+2*l,
g=0;g<h;g++){var i=oa*g,j=oa*(g+1),n=d+e+i,i=d+f+i,m=d+f+j,j=d+e+j,p=c,r=g,s=h,t=e,w=f,n=n+J,i=i+J,m=m+J,j=j+J;B.faces.push(new THREE.Face4(n,i,m,j,null,null,v));n=z.generateSideWallUV(B,a,p,b,n,i,m,j,r,s,t,w);B.faceVertexUvs[0].push(n)}}}function f(a,b,c){B.vertices.push(new THREE.Vector3(a,b,c))}function h(c,d,e,f){c+=J;d+=J;e+=J;B.faces.push(new THREE.Face3(c,d,e,null,null,s));c=f?z.generateBottomUV(B,a,b,c,d,e):z.generateTopUV(B,a,b,c,d,e);B.faceVertexUvs[0].push(c)}var g=void 0!==b.amount?b.amount:
100,i=void 0!==b.bevelThickness?b.bevelThickness:6,j=void 0!==b.bevelSize?b.bevelSize:i-2,l=void 0!==b.bevelSegments?b.bevelSegments:3,n=void 0!==b.bevelEnabled?b.bevelEnabled:!0,m=void 0!==b.curveSegments?b.curveSegments:12,q=void 0!==b.steps?b.steps:1,t=b.extrudePath,p,r=!1,s=b.material,v=b.extrudeMaterial,z=void 0!==b.UVGenerator?b.UVGenerator:THREE.ExtrudeGeometry.WorldUVGenerator,G,C,H,I;t&&(p=t.getSpacedPoints(q),r=!0,n=!1,G=void 0!==b.frames?b.frames:new THREE.TubeGeometry.FrenetFrames(t,q,
!1),C=new THREE.Vector3,H=new THREE.Vector3,I=new THREE.Vector3);n||(j=i=l=0);var F,A,K,B=this,J=this.vertices.length,m=a.extractPoints(m),N=m.shape,m=m.holes;if(t=!THREE.Shape.Utils.isClockWise(N)){N=N.reverse();A=0;for(K=m.length;A<K;A++)F=m[A],THREE.Shape.Utils.isClockWise(F)&&(m[A]=F.reverse());t=!1}var y=THREE.Shape.Utils.triangulateShape(N,m),t=N;A=0;for(K=m.length;A<K;A++)F=m[A],N=N.concat(F);var M,w,Z,L,oa=N.length,Pa=y.length,Va=[],O=0,qa=t.length;M=qa-1;for(w=O+1;O<qa;O++,M++,w++)M===qa&&
(M=0),w===qa&&(w=0),Va[O]=d(t[O],t[M],t[w]);var Fa=[],wa,D=Va.concat();A=0;for(K=m.length;A<K;A++){F=m[A];wa=[];O=0;qa=F.length;M=qa-1;for(w=O+1;O<qa;O++,M++,w++)M===qa&&(M=0),w===qa&&(w=0),wa[O]=d(F[O],F[M],F[w]);Fa.push(wa);D=D.concat(wa)}for(M=0;M<l;M++){F=M/l;Z=i*(1-F);w=j*Math.sin(F*Math.PI/2);O=0;for(qa=t.length;O<qa;O++)L=c(t[O],Va[O],w),f(L.x,L.y,-Z);A=0;for(K=m.length;A<K;A++){F=m[A];wa=Fa[A];O=0;for(qa=F.length;O<qa;O++)L=c(F[O],wa[O],w),f(L.x,L.y,-Z)}}w=j;for(O=0;O<oa;O++)L=n?c(N[O],D[O],
w):N[O],r?(H.copy(G.normals[0]).multiplyScalar(L.x),C.copy(G.binormals[0]).multiplyScalar(L.y),I.copy(p[0]).add(H).add(C),f(I.x,I.y,I.z)):f(L.x,L.y,0);for(F=1;F<=q;F++)for(O=0;O<oa;O++)L=n?c(N[O],D[O],w):N[O],r?(H.copy(G.normals[F]).multiplyScalar(L.x),C.copy(G.binormals[F]).multiplyScalar(L.y),I.copy(p[F]).add(H).add(C),f(I.x,I.y,I.z)):f(L.x,L.y,g/q*F);for(M=l-1;0<=M;M--){F=M/l;Z=i*(1-F);w=j*Math.sin(F*Math.PI/2);O=0;for(qa=t.length;O<qa;O++)L=c(t[O],Va[O],w),f(L.x,L.y,g+Z);A=0;for(K=m.length;A<
K;A++){F=m[A];wa=Fa[A];O=0;for(qa=F.length;O<qa;O++)L=c(F[O],wa[O],w),r?f(L.x,L.y+p[q-1].y,p[q-1].x+Z):f(L.x,L.y,g+Z)}}if(n){i=0*oa;for(O=0;O<Pa;O++)g=y[O],h(g[2]+i,g[1]+i,g[0]+i,!0);i=oa*(q+2*l);for(O=0;O<Pa;O++)g=y[O],h(g[0]+i,g[1]+i,g[2]+i,!1)}else{for(O=0;O<Pa;O++)g=y[O],h(g[2],g[1],g[0],!0);for(O=0;O<Pa;O++)g=y[O],h(g[0]+oa*q,g[1]+oa*q,g[2]+oa*q,!1)}g=0;e(t,g);g+=t.length;A=0;for(K=m.length;A<K;A++)F=m[A],e(F,g),g+=F.length};
THREE.ExtrudeGeometry.WorldUVGenerator={generateTopUV:function(a,b,c,d,e,f){b=a.vertices[e].x;e=a.vertices[e].y;c=a.vertices[f].x;f=a.vertices[f].y;return[new THREE.Vector2(a.vertices[d].x,a.vertices[d].y),new THREE.Vector2(b,e),new THREE.Vector2(c,f)]},generateBottomUV:function(a,b,c,d,e,f){return this.generateTopUV(a,b,c,d,e,f)},generateSideWallUV:function(a,b,c,d,e,f,h,g){var b=a.vertices[e].x,c=a.vertices[e].y,e=a.vertices[e].z,d=a.vertices[f].x,i=a.vertices[f].y,f=a.vertices[f].z,j=a.vertices[h].x,
l=a.vertices[h].y,h=a.vertices[h].z,n=a.vertices[g].x,m=a.vertices[g].y,a=a.vertices[g].z;return 0.01>Math.abs(c-i)?[new THREE.Vector2(b,1-e),new THREE.Vector2(d,1-f),new THREE.Vector2(j,1-h),new THREE.Vector2(n,1-a)]:[new THREE.Vector2(c,1-e),new THREE.Vector2(i,1-f),new THREE.Vector2(l,1-h),new THREE.Vector2(m,1-a)]}};THREE.ExtrudeGeometry.__v1=new THREE.Vector2;THREE.ExtrudeGeometry.__v2=new THREE.Vector2;THREE.ExtrudeGeometry.__v3=new THREE.Vector2;THREE.ExtrudeGeometry.__v4=new THREE.Vector2;
THREE.ExtrudeGeometry.__v5=new THREE.Vector2;THREE.ExtrudeGeometry.__v6=new THREE.Vector2;THREE.ShapeGeometry=function(a,b){THREE.Geometry.call(this);!1===a instanceof Array&&(a=[a]);this.shapebb=a[a.length-1].getBoundingBox();this.addShapeList(a,b);this.computeCentroids();this.computeFaceNormals()};THREE.ShapeGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ShapeGeometry.prototype.addShapeList=function(a,b){for(var c=0,d=a.length;c<d;c++)this.addShape(a[c],b);return this};
THREE.ShapeGeometry.prototype.addShape=function(a,b){void 0===b&&(b={});var c=b.material,d=void 0===b.UVGenerator?THREE.ExtrudeGeometry.WorldUVGenerator:b.UVGenerator,e,f,h,g=this.vertices.length;e=a.extractPoints(void 0!==b.curveSegments?b.curveSegments:12);var i=e.shape,j=e.holes;if(!THREE.Shape.Utils.isClockWise(i)){i=i.reverse();e=0;for(f=j.length;e<f;e++)h=j[e],THREE.Shape.Utils.isClockWise(h)&&(j[e]=h.reverse())}var l=THREE.Shape.Utils.triangulateShape(i,j);e=0;for(f=j.length;e<f;e++)h=j[e],
i=i.concat(h);j=i.length;f=l.length;for(e=0;e<j;e++)h=i[e],this.vertices.push(new THREE.Vector3(h.x,h.y,0));for(e=0;e<f;e++)j=l[e],i=j[0]+g,h=j[1]+g,j=j[2]+g,this.faces.push(new THREE.Face3(i,h,j,null,null,c)),this.faceVertexUvs[0].push(d.generateBottomUV(this,a,b,i,h,j))};THREE.LatheGeometry=function(a,b,c,d){THREE.Geometry.call(this);for(var b=b||12,c=c||0,d=d||2*Math.PI,e=1/(a.length-1),f=1/b,h=0,g=b;h<=g;h++)for(var i=c+h*f*d,j=Math.cos(i),l=Math.sin(i),i=0,n=a.length;i<n;i++){var m=a[i],q=new THREE.Vector3;q.x=j*m.x-l*m.y;q.y=l*m.x+j*m.y;q.z=m.z;this.vertices.push(q)}c=a.length;h=0;for(g=b;h<g;h++){i=0;for(n=a.length-1;i<n;i++)d=b=i+c*h,l=b+c,j=b+1+c,this.faces.push(new THREE.Face4(d,l,j,b+1)),j=h*f,b=i*e,d=j+f,l=b+e,this.faceVertexUvs[0].push([new THREE.Vector2(j,
b),new THREE.Vector2(d,b),new THREE.Vector2(d,l),new THREE.Vector2(j,l)])}this.mergeVertices();this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.LatheGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.PlaneGeometry=function(a,b,c,d){THREE.Geometry.call(this);this.width=a;this.height=b;this.widthSegments=c||1;this.heightSegments=d||1;for(var c=a/2,e=b/2,d=this.widthSegments,f=this.heightSegments,h=d+1,g=f+1,i=this.width/d,j=this.height/f,l=new THREE.Vector3(0,0,1),a=0;a<g;a++)for(b=0;b<h;b++)this.vertices.push(new THREE.Vector3(b*i-c,-(a*j-e),0));for(a=0;a<f;a++)for(b=0;b<d;b++)c=new THREE.Face4(b+h*a,b+h*(a+1),b+1+h*(a+1),b+1+h*a),c.normal.copy(l),c.vertexNormals.push(l.clone(),l.clone(),
l.clone(),l.clone()),this.faces.push(c),this.faceVertexUvs[0].push([new THREE.Vector2(b/d,1-a/f),new THREE.Vector2(b/d,1-(a+1)/f),new THREE.Vector2((b+1)/d,1-(a+1)/f),new THREE.Vector2((b+1)/d,1-a/f)]);this.computeCentroids()};THREE.PlaneGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.RingGeometry=function(a,b,c,d,e,f){THREE.Geometry.call(this);for(var a=a||0,b=b||50,e=void 0!==e?e:0,f=void 0!==f?f:2*Math.PI,c=void 0!==c?Math.max(3,c):8,d=void 0!==d?Math.max(3,d):8,h=[],g=a,i=(b-a)/d,a=0;a<=d;a++){for(b=0;b<=c;b++){var j=new THREE.Vector3,l=e+b/c*f;j.x=g*Math.cos(l);j.y=g*Math.sin(l);this.vertices.push(j);h.push(new THREE.Vector2((j.x/g+1)/2,-(j.y/g+1)/2+1))}g+=i}e=new THREE.Vector3(0,0,1);for(a=0;a<d;a++){f=a*c;for(b=0;b<=c;b++){var l=b+f,i=l+a,j=l+c+a,n=l+c+1+a;this.faces.push(new THREE.Face3(i,
j,n,[e,e,e]));this.faceVertexUvs[0].push([h[i],h[j],h[n]]);i=l+a;j=l+c+1+a;n=l+1+a;this.faces.push(new THREE.Face3(i,j,n,[e,e,e]));this.faceVertexUvs[0].push([h[i],h[j],h[n]])}}this.computeCentroids();this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,g)};THREE.RingGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.SphereGeometry=function(a,b,c,d,e,f,h){THREE.Geometry.call(this);this.radius=a=a||50;this.widthSegments=b=Math.max(3,Math.floor(b)||8);this.heightSegments=c=Math.max(2,Math.floor(c)||6);this.phiStart=d=void 0!==d?d:0;this.phiLength=e=void 0!==e?e:2*Math.PI;this.thetaStart=f=void 0!==f?f:0;this.thetaLength=h=void 0!==h?h:Math.PI;var g,i,j=[],l=[];for(i=0;i<=c;i++){var n=[],m=[];for(g=0;g<=b;g++){var q=g/b,t=i/c,p=new THREE.Vector3;p.x=-a*Math.cos(d+q*e)*Math.sin(f+t*h);p.y=a*Math.cos(f+t*h);
p.z=a*Math.sin(d+q*e)*Math.sin(f+t*h);this.vertices.push(p);n.push(this.vertices.length-1);m.push(new THREE.Vector2(q,1-t))}j.push(n);l.push(m)}for(i=0;i<this.heightSegments;i++)for(g=0;g<this.widthSegments;g++){var b=j[i][g+1],c=j[i][g],d=j[i+1][g],e=j[i+1][g+1],f=this.vertices[b].clone().normalize(),h=this.vertices[c].clone().normalize(),n=this.vertices[d].clone().normalize(),m=this.vertices[e].clone().normalize(),q=l[i][g+1].clone(),t=l[i][g].clone(),p=l[i+1][g].clone(),r=l[i+1][g+1].clone();Math.abs(this.vertices[b].y)===
this.radius?(this.faces.push(new THREE.Face3(b,d,e,[f,n,m])),this.faceVertexUvs[0].push([q,p,r])):Math.abs(this.vertices[d].y)===this.radius?(this.faces.push(new THREE.Face3(b,c,d,[f,h,n])),this.faceVertexUvs[0].push([q,t,p])):(this.faces.push(new THREE.Face4(b,c,d,e,[f,h,n,m])),this.faceVertexUvs[0].push([q,t,p,r]))}this.computeCentroids();this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,a)};THREE.SphereGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TextGeometry=function(a,b){var b=b||{},c=THREE.FontUtils.generateShapes(a,b);b.amount=void 0!==b.height?b.height:50;void 0===b.bevelThickness&&(b.bevelThickness=10);void 0===b.bevelSize&&(b.bevelSize=8);void 0===b.bevelEnabled&&(b.bevelEnabled=!1);THREE.ExtrudeGeometry.call(this,c,b)};THREE.TextGeometry.prototype=Object.create(THREE.ExtrudeGeometry.prototype);THREE.TorusGeometry=function(a,b,c,d,e){THREE.Geometry.call(this);this.radius=a||100;this.tube=b||40;this.radialSegments=c||8;this.tubularSegments=d||6;this.arc=e||2*Math.PI;e=new THREE.Vector3;a=[];b=[];for(c=0;c<=this.radialSegments;c++)for(d=0;d<=this.tubularSegments;d++){var f=d/this.tubularSegments*this.arc,h=2*c/this.radialSegments*Math.PI;e.x=this.radius*Math.cos(f);e.y=this.radius*Math.sin(f);var g=new THREE.Vector3;g.x=(this.radius+this.tube*Math.cos(h))*Math.cos(f);g.y=(this.radius+this.tube*
Math.cos(h))*Math.sin(f);g.z=this.tube*Math.sin(h);this.vertices.push(g);a.push(new THREE.Vector2(d/this.tubularSegments,c/this.radialSegments));b.push(g.clone().sub(e).normalize())}for(c=1;c<=this.radialSegments;c++)for(d=1;d<=this.tubularSegments;d++){var e=(this.tubularSegments+1)*c+d-1,f=(this.tubularSegments+1)*(c-1)+d-1,h=(this.tubularSegments+1)*(c-1)+d,g=(this.tubularSegments+1)*c+d,i=new THREE.Face4(e,f,h,g,[b[e],b[f],b[h],b[g]]);i.normal.add(b[e]);i.normal.add(b[f]);i.normal.add(b[h]);i.normal.add(b[g]);
i.normal.normalize();this.faces.push(i);this.faceVertexUvs[0].push([a[e].clone(),a[f].clone(),a[h].clone(),a[g].clone()])}this.computeCentroids()};THREE.TorusGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TorusKnotGeometry=function(a,b,c,d,e,f,h){function g(a,b,c,d,e){var f=Math.cos(a),g=Math.sin(a),a=b/c*a,b=Math.cos(a),f=0.5*(d*(2+b))*f,g=0.5*d*(2+b)*g,d=0.5*e*d*Math.sin(a);return new THREE.Vector3(f,g,d)}THREE.Geometry.call(this);this.radius=a||100;this.tube=b||40;this.radialSegments=c||64;this.tubularSegments=d||8;this.p=e||2;this.q=f||3;this.heightScale=h||1;this.grid=Array(this.radialSegments);c=new THREE.Vector3;d=new THREE.Vector3;e=new THREE.Vector3;for(a=0;a<this.radialSegments;++a){this.grid[a]=
Array(this.tubularSegments);b=2*(a/this.radialSegments)*this.p*Math.PI;f=g(b,this.q,this.p,this.radius,this.heightScale);b=g(b+0.01,this.q,this.p,this.radius,this.heightScale);c.subVectors(b,f);d.addVectors(b,f);e.crossVectors(c,d);d.crossVectors(e,c);e.normalize();d.normalize();for(b=0;b<this.tubularSegments;++b){var i=2*(b/this.tubularSegments)*Math.PI,h=-this.tube*Math.cos(i),i=this.tube*Math.sin(i),j=new THREE.Vector3;j.x=f.x+h*d.x+i*e.x;j.y=f.y+h*d.y+i*e.y;j.z=f.z+h*d.z+i*e.z;this.grid[a][b]=
this.vertices.push(j)-1}}for(a=0;a<this.radialSegments;++a)for(b=0;b<this.tubularSegments;++b){var e=(a+1)%this.radialSegments,f=(b+1)%this.tubularSegments,c=this.grid[a][b],d=this.grid[e][b],e=this.grid[e][f],f=this.grid[a][f],h=new THREE.Vector2(a/this.radialSegments,b/this.tubularSegments),i=new THREE.Vector2((a+1)/this.radialSegments,b/this.tubularSegments),j=new THREE.Vector2((a+1)/this.radialSegments,(b+1)/this.tubularSegments),l=new THREE.Vector2(a/this.radialSegments,(b+1)/this.tubularSegments);
this.faces.push(new THREE.Face4(c,d,e,f));this.faceVertexUvs[0].push([h,i,j,l])}this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.TorusKnotGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TubeGeometry=function(a,b,c,d,e){THREE.Geometry.call(this);this.path=a;this.segments=b||64;this.radius=c||1;this.radialSegments=d||8;this.closed=e||!1;this.grid=[];var f,h,d=this.segments+1,g,i,j,e=new THREE.Vector3,l,n,b=new THREE.TubeGeometry.FrenetFrames(this.path,this.segments,this.closed);l=b.normals;n=b.binormals;this.tangents=b.tangents;this.normals=l;this.binormals=n;for(b=0;b<d;b++){this.grid[b]=[];c=b/(d-1);j=a.getPointAt(c);f=l[b];h=n[b];for(c=0;c<this.radialSegments;c++)g=2*(c/this.radialSegments)*
Math.PI,i=-this.radius*Math.cos(g),g=this.radius*Math.sin(g),e.copy(j),e.x+=i*f.x+g*h.x,e.y+=i*f.y+g*h.y,e.z+=i*f.z+g*h.z,this.grid[b][c]=this.vertices.push(new THREE.Vector3(e.x,e.y,e.z))-1}for(b=0;b<this.segments;b++)for(c=0;c<this.radialSegments;c++)e=this.closed?(b+1)%this.segments:b+1,l=(c+1)%this.radialSegments,a=this.grid[b][c],d=this.grid[e][c],e=this.grid[e][l],l=this.grid[b][l],n=new THREE.Vector2(b/this.segments,c/this.radialSegments),f=new THREE.Vector2((b+1)/this.segments,c/this.radialSegments),
h=new THREE.Vector2((b+1)/this.segments,(c+1)/this.radialSegments),i=new THREE.Vector2(b/this.segments,(c+1)/this.radialSegments),this.faces.push(new THREE.Face4(a,d,e,l)),this.faceVertexUvs[0].push([n,f,h,i]);this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.TubeGeometry.prototype=Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames=function(a,b,c){new THREE.Vector3;var d=new THREE.Vector3;new THREE.Vector3;var e=[],f=[],h=[],g=new THREE.Vector3,i=new THREE.Matrix4,b=b+1,j,l,n;this.tangents=e;this.normals=f;this.binormals=h;for(j=0;j<b;j++)l=j/(b-1),e[j]=a.getTangentAt(l),e[j].normalize();f[0]=new THREE.Vector3;h[0]=new THREE.Vector3;a=Number.MAX_VALUE;j=Math.abs(e[0].x);l=Math.abs(e[0].y);n=Math.abs(e[0].z);j<=a&&(a=j,d.set(1,0,0));l<=a&&(a=l,d.set(0,1,0));n<=a&&d.set(0,0,1);g.crossVectors(e[0],
d).normalize();f[0].crossVectors(e[0],g);h[0].crossVectors(e[0],f[0]);for(j=1;j<b;j++)f[j]=f[j-1].clone(),h[j]=h[j-1].clone(),g.crossVectors(e[j-1],e[j]),1E-4<g.length()&&(g.normalize(),d=Math.acos(THREE.Math.clamp(e[j-1].dot(e[j]),-1,1)),f[j].applyMatrix4(i.makeRotationAxis(g,d))),h[j].crossVectors(e[j],f[j]);if(c){d=Math.acos(THREE.Math.clamp(f[0].dot(f[b-1]),-1,1));d/=b-1;0<e[0].dot(g.crossVectors(f[0],f[b-1]))&&(d=-d);for(j=1;j<b;j++)f[j].applyMatrix4(i.makeRotationAxis(e[j],d*j)),h[j].crossVectors(e[j],
f[j])}};THREE.PolyhedronGeometry=function(a,b,c,d){function e(a){var b=a.normalize().clone();b.index=g.vertices.push(b)-1;var c=Math.atan2(a.z,-a.x)/2/Math.PI+0.5,a=Math.atan2(-a.y,Math.sqrt(a.x*a.x+a.z*a.z))/Math.PI+0.5;b.uv=new THREE.Vector2(c,1-a);return b}function f(a,b,c){var d=new THREE.Face3(a.index,b.index,c.index,[a.clone(),b.clone(),c.clone()]);d.centroid.add(a).add(b).add(c).divideScalar(3);g.faces.push(d);d=Math.atan2(d.centroid.z,-d.centroid.x);g.faceVertexUvs[0].push([h(a.uv,a,d),h(b.uv,b,d),
h(c.uv,c,d)])}function h(a,b,c){0>c&&1===a.x&&(a=new THREE.Vector2(a.x-1,a.y));0===b.x&&0===b.z&&(a=new THREE.Vector2(c/2/Math.PI+0.5,a.y));return a.clone()}THREE.Geometry.call(this);for(var c=c||1,d=d||0,g=this,i=0,j=a.length;i<j;i++)e(new THREE.Vector3(a[i][0],a[i][1],a[i][2]));for(var l=this.vertices,a=[],i=0,j=b.length;i<j;i++){var n=l[b[i][0]],m=l[b[i][1]],q=l[b[i][2]];a[i]=new THREE.Face3(n.index,m.index,q.index,[n.clone(),m.clone(),q.clone()])}i=0;for(j=a.length;i<j;i++){m=a[i];l=d;b=Math.pow(2,
l);Math.pow(4,l);for(var l=e(g.vertices[m.a]),n=e(g.vertices[m.b]),t=e(g.vertices[m.c]),m=[],q=0;q<=b;q++){m[q]=[];for(var p=e(l.clone().lerp(t,q/b)),r=e(n.clone().lerp(t,q/b)),s=b-q,v=0;v<=s;v++)m[q][v]=0==v&&q==b?p:e(p.clone().lerp(r,v/s))}for(q=0;q<b;q++)for(v=0;v<2*(b-q)-1;v++)l=Math.floor(v/2),0==v%2?f(m[q][l+1],m[q+1][l],m[q][l]):f(m[q][l+1],m[q+1][l+1],m[q+1][l])}i=0;for(j=this.faceVertexUvs[0].length;i<j;i++)d=this.faceVertexUvs[0][i],a=d[0].x,b=d[1].x,l=d[2].x,n=Math.max(a,Math.max(b,l)),
m=Math.min(a,Math.min(b,l)),0.9<n&&0.1>m&&(0.2>a&&(d[0].x+=1),0.2>b&&(d[1].x+=1),0.2>l&&(d[2].x+=1));i=0;for(j=this.vertices.length;i<j;i++)this.vertices[i].multiplyScalar(c);this.mergeVertices();this.computeCentroids();this.computeFaceNormals();this.boundingSphere=new THREE.Sphere(new THREE.Vector3,c)};THREE.PolyhedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.IcosahedronGeometry=function(a,b){this.radius=a;this.detail=b;var c=(1+Math.sqrt(5))/2;THREE.PolyhedronGeometry.call(this,[[-1,c,0],[1,c,0],[-1,-c,0],[1,-c,0],[0,-1,c],[0,1,c],[0,-1,-c],[0,1,-c],[c,0,-1],[c,0,1],[-c,0,-1],[-c,0,1]],[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]],a,b)};THREE.IcosahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.OctahedronGeometry=function(a,b){THREE.PolyhedronGeometry.call(this,[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],[[0,2,4],[0,4,3],[0,3,5],[0,5,2],[1,2,5],[1,5,3],[1,3,4],[1,4,2]],a,b)};THREE.OctahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.TetrahedronGeometry=function(a,b){THREE.PolyhedronGeometry.call(this,[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]],[[2,1,0],[0,3,2],[1,3,0],[2,3,1]],a,b)};THREE.TetrahedronGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ParametricGeometry=function(a,b,c,d){THREE.Geometry.call(this);var e=this.vertices,f=this.faces,h=this.faceVertexUvs[0],d=void 0===d?!1:d,g,i,j,l,n=b+1;for(g=0;g<=c;g++){l=g/c;for(i=0;i<=b;i++)j=i/b,j=a(j,l),e.push(j)}var m,q,t,p;for(g=0;g<c;g++)for(i=0;i<b;i++)a=g*n+i,e=g*n+i+1,l=(g+1)*n+i,j=(g+1)*n+i+1,m=new THREE.Vector2(i/b,g/c),q=new THREE.Vector2((i+1)/b,g/c),t=new THREE.Vector2(i/b,(g+1)/c),p=new THREE.Vector2((i+1)/b,(g+1)/c),d?(f.push(new THREE.Face3(a,e,l)),f.push(new THREE.Face3(e,
j,l)),h.push([m,q,t]),h.push([q,p,t])):(f.push(new THREE.Face4(a,e,j,l)),h.push([m,q,p,t]));this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.ParametricGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.ConvexGeometry=function(a){function b(a){var b=a.length();return new THREE.Vector2(a.x/b,a.y/b)}THREE.Geometry.call(this);for(var c=[[0,1,2],[0,2,1]],d=3;d<a.length;d++){var e=d,f=a[e].clone(),h=f.length();f.x+=h*2E-6*(Math.random()-0.5);f.y+=h*2E-6*(Math.random()-0.5);f.z+=h*2E-6*(Math.random()-0.5);for(var h=[],g=0;g<c.length;){var i=c[g],j=f,l=a[i[0]],n;n=l;var m=a[i[1]],q=a[i[2]],t=new THREE.Vector3,p=new THREE.Vector3;t.subVectors(q,m);p.subVectors(n,m);t.cross(p);t.normalize();n=t;l=n.dot(l);
if(n.dot(j)>=l){for(j=0;3>j;j++){l=[i[j],i[(j+1)%3]];n=!0;for(m=0;m<h.length;m++)if(h[m][0]===l[1]&&h[m][1]===l[0]){h[m]=h[h.length-1];h.pop();n=!1;break}n&&h.push(l)}c[g]=c[c.length-1];c.pop()}else g++}for(m=0;m<h.length;m++)c.push([h[m][0],h[m][1],e])}e=0;f=Array(a.length);for(d=0;d<c.length;d++){h=c[d];for(g=0;3>g;g++)void 0===f[h[g]]&&(f[h[g]]=e++,this.vertices.push(a[h[g]])),h[g]=f[h[g]]}for(d=0;d<c.length;d++)this.faces.push(new THREE.Face3(c[d][0],c[d][1],c[d][2]));for(d=0;d<this.faces.length;d++)h=
this.faces[d],this.faceVertexUvs[0].push([b(this.vertices[h.a]),b(this.vertices[h.b]),b(this.vertices[h.c])]);this.computeCentroids();this.computeFaceNormals();this.computeVertexNormals()};THREE.ConvexGeometry.prototype=Object.create(THREE.Geometry.prototype);THREE.AxisHelper=function(a){var a=a||1,b=new THREE.Geometry;b.vertices.push(new THREE.Vector3,new THREE.Vector3(a,0,0),new THREE.Vector3,new THREE.Vector3(0,a,0),new THREE.Vector3,new THREE.Vector3(0,0,a));b.colors.push(new THREE.Color(16711680),new THREE.Color(16755200),new THREE.Color(65280),new THREE.Color(11206400),new THREE.Color(255),new THREE.Color(43775));a=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});THREE.Line.call(this,b,a,THREE.LinePieces)};
THREE.AxisHelper.prototype=Object.create(THREE.Line.prototype);THREE.ArrowHelper=function(a,b,c,d){THREE.Object3D.call(this);void 0===d&&(d=16776960);void 0===c&&(c=1);this.position=b;this.useQuaternion=!0;b=new THREE.Geometry;b.vertices.push(new THREE.Vector3(0,0,0));b.vertices.push(new THREE.Vector3(0,1,0));this.line=new THREE.Line(b,new THREE.LineBasicMaterial({color:d}));this.line.matrixAutoUpdate=!1;this.add(this.line);b=new THREE.CylinderGeometry(0,0.05,0.25,5,1);b.applyMatrix((new THREE.Matrix4).makeTranslation(0,0.875,0));this.cone=new THREE.Mesh(b,new THREE.MeshBasicMaterial({color:d}));
this.cone.matrixAutoUpdate=!1;this.add(this.cone);this.setDirection(a);this.setLength(c)};THREE.ArrowHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.ArrowHelper.prototype.setDirection=function(){var a=new THREE.Vector3,b;return function(c){0.99999<c.y?this.quaternion.set(0,0,0,1):-0.99999>c.y?this.quaternion.set(1,0,0,0):(a.set(c.z,0,-c.x).normalize(),b=Math.acos(c.y),this.quaternion.setFromAxisAngle(a,b))}}();THREE.ArrowHelper.prototype.setLength=function(a){this.scale.set(a,a,a)};
THREE.ArrowHelper.prototype.setColor=function(a){this.line.material.color.setHex(a);this.cone.material.color.setHex(a)};THREE.BoxHelper=function(a){var b=[new THREE.Vector3(1,1,1),new THREE.Vector3(-1,1,1),new THREE.Vector3(-1,-1,1),new THREE.Vector3(1,-1,1),new THREE.Vector3(1,1,-1),new THREE.Vector3(-1,1,-1),new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,-1,-1)];this.vertices=b;var c=new THREE.Geometry;c.vertices.push(b[0],b[1],b[1],b[2],b[2],b[3],b[3],b[0],b[4],b[5],b[5],b[6],b[6],b[7],b[7],b[4],b[0],b[4],b[1],b[5],b[2],b[6],b[3],b[7]);THREE.Line.call(this,c,new THREE.LineBasicMaterial({color:16776960}),THREE.LinePieces);
void 0!==a&&this.update(a)};THREE.BoxHelper.prototype=Object.create(THREE.Line.prototype);
THREE.BoxHelper.prototype.update=function(a){var b=a.geometry;null===b.boundingBox&&b.computeBoundingBox();var c=b.boundingBox.min,b=b.boundingBox.max,d=this.vertices;d[0].set(b.x,b.y,b.z);d[1].set(c.x,b.y,b.z);d[2].set(c.x,c.y,b.z);d[3].set(b.x,c.y,b.z);d[4].set(b.x,b.y,c.z);d[5].set(c.x,b.y,c.z);d[6].set(c.x,c.y,c.z);d[7].set(b.x,c.y,c.z);this.geometry.computeBoundingSphere();this.geometry.verticesNeedUpdate=!0;this.matrixAutoUpdate=!1;this.matrixWorld=a.matrixWorld};THREE.BoundingBoxHelper=function(a,b){var c=b||8947848;this.object=a;this.box=new THREE.Box3;THREE.Mesh.call(this,new THREE.CubeGeometry(1,1,1),new THREE.MeshBasicMaterial({color:c,wireframe:!0}))};THREE.BoundingBoxHelper.prototype=Object.create(THREE.Mesh.prototype);THREE.BoundingBoxHelper.prototype.update=function(){this.box.setFromObject(this.object);this.box.size(this.scale);this.box.center(this.position)};THREE.CameraHelper=function(a){function b(a,b,d){c(a,d);c(b,d)}function c(a,b){d.vertices.push(new THREE.Vector3);d.colors.push(new THREE.Color(b));void 0===f[a]&&(f[a]=[]);f[a].push(d.vertices.length-1)}THREE.Line.call(this);var d=new THREE.Geometry,e=new THREE.LineBasicMaterial({color:16777215,vertexColors:THREE.FaceColors}),f={};b("n1","n2",16755200);b("n2","n4",16755200);b("n4","n3",16755200);b("n3","n1",16755200);b("f1","f2",16755200);b("f2","f4",16755200);b("f4","f3",16755200);b("f3","f1",16755200);
b("n1","f1",16755200);b("n2","f2",16755200);b("n3","f3",16755200);b("n4","f4",16755200);b("p","n1",16711680);b("p","n2",16711680);b("p","n3",16711680);b("p","n4",16711680);b("u1","u2",43775);b("u2","u3",43775);b("u3","u1",43775);b("c","t",16777215);b("p","c",3355443);b("cn1","cn2",3355443);b("cn3","cn4",3355443);b("cf1","cf2",3355443);b("cf3","cf4",3355443);THREE.Line.call(this,d,e,THREE.LinePieces);this.camera=a;this.matrixWorld=a.matrixWorld;this.matrixAutoUpdate=!1;this.pointMap=f;this.update()};
THREE.CameraHelper.prototype=Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update=function(){var a=new THREE.Vector3,b=new THREE.Camera,c=new THREE.Projector;return function(){function d(d,h,g,i){a.set(h,g,i);c.unprojectVector(a,b);d=e.pointMap[d];if(void 0!==d){h=0;for(g=d.length;h<g;h++)e.geometry.vertices[d[h]].copy(a)}}var e=this;b.projectionMatrix.copy(this.camera.projectionMatrix);d("c",0,0,-1);d("t",0,0,1);d("n1",-1,-1,-1);d("n2",1,-1,-1);d("n3",-1,1,-1);d("n4",1,1,-1);d("f1",-1,-1,1);d("f2",1,-1,1);d("f3",-1,1,1);d("f4",1,1,1);d("u1",
0.7,1.1,-1);d("u2",-0.7,1.1,-1);d("u3",0,2,-1);d("cf1",-1,0,1);d("cf2",1,0,1);d("cf3",0,-1,1);d("cf4",0,1,1);d("cn1",-1,0,-1);d("cn2",1,0,-1);d("cn3",0,-1,-1);d("cn4",0,1,-1);this.geometry.verticesNeedUpdate=!0}}();THREE.DirectionalLightHelper=function(a,b){THREE.Object3D.call(this);this.matrixAutoUpdate=!1;this.light=a;var c=new THREE.SphereGeometry(b,4,2),d=new THREE.MeshBasicMaterial({fog:!1,wireframe:!0});d.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.lightSphere=new THREE.Mesh(c,d);this.lightSphere.matrixWorld=this.light.matrixWorld;this.lightSphere.matrixAutoUpdate=!1;this.add(this.lightSphere);c=new THREE.Geometry;c.vertices.push(this.light.position);c.vertices.push(this.light.target.position);
c.computeLineDistances();d=new THREE.LineDashedMaterial({dashSize:4,gapSize:4,opacity:0.75,transparent:!0,fog:!1});d.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine=new THREE.Line(c,d);this.add(this.targetLine)};THREE.DirectionalLightHelper.prototype=Object.create(THREE.Object3D.prototype);
THREE.DirectionalLightHelper.prototype.update=function(){this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.targetLine.geometry.computeLineDistances();this.targetLine.geometry.verticesNeedUpdate=!0;this.targetLine.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)};THREE.FaceNormalsHelper=function(a,b,c,d){this.object=a;this.size=b||1;for(var a=c||16776960,d=d||1,b=new THREE.Geometry,c=0,e=this.object.geometry.faces.length;c<e;c++)b.vertices.push(new THREE.Vector3),b.vertices.push(new THREE.Vector3);THREE.Line.call(this,b,new THREE.LineBasicMaterial({color:a,linewidth:d}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.normalMatrix=new THREE.Matrix3;this.update()};THREE.FaceNormalsHelper.prototype=Object.create(THREE.Line.prototype);
THREE.FaceNormalsHelper.prototype.update=function(){var a=new THREE.Vector3;return function(){this.object.updateMatrixWorld(!0);this.normalMatrix.getNormalMatrix(this.object.matrixWorld);for(var b=this.geometry.vertices,c=this.object.geometry.faces,d=this.object.matrixWorld,e=0,f=c.length;e<f;e++){var h=c[e];a.copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size);var g=2*e;b[g].copy(h.centroid).applyMatrix4(d);b[g+1].addVectors(b[g],a)}this.geometry.verticesNeedUpdate=
!0;return this}}();THREE.GridHelper=function(a,b){var c=new THREE.Geometry,d=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});this.color1=new THREE.Color(4473924);this.color2=new THREE.Color(8947848);for(var e=-a;e<=a;e+=b){c.vertices.push(new THREE.Vector3(-a,0,e),new THREE.Vector3(a,0,e),new THREE.Vector3(e,0,-a),new THREE.Vector3(e,0,a));var f=0===e?this.color1:this.color2;c.colors.push(f,f,f,f)}THREE.Line.call(this,c,d,THREE.LinePieces)};THREE.GridHelper.prototype=Object.create(THREE.Line.prototype);
THREE.GridHelper.prototype.setColors=function(a,b){this.color1.set(a);this.color2.set(b);this.geometry.colorsNeedUpdate=!0};THREE.HemisphereLightHelper=function(a,b){THREE.Object3D.call(this);this.light=a;var c=new THREE.SphereGeometry(b,4,2);c.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2));for(var d=0;8>d;d++)c.faces[d].materialIndex=4>d?0:1;d=new THREE.MeshBasicMaterial({fog:!1,wireframe:!0});d.color.copy(a.color).multiplyScalar(a.intensity);var e=new THREE.MeshBasicMaterial({fog:!1,wireframe:!0});e.color.copy(a.groundColor).multiplyScalar(a.intensity);this.lightSphere=new THREE.Mesh(c,new THREE.MeshFaceMaterial([d,
e]));this.lightSphere.position=a.position;this.lightSphere.lookAt(new THREE.Vector3);this.add(this.lightSphere)};THREE.HemisphereLightHelper.prototype=Object.create(THREE.Object3D.prototype);THREE.HemisphereLightHelper.prototype.update=function(){this.lightSphere.lookAt(new THREE.Vector3);this.lightSphere.material.materials[0].color.copy(this.light.color).multiplyScalar(this.light.intensity);this.lightSphere.material.materials[1].color.copy(this.light.groundColor).multiplyScalar(this.light.intensity)};THREE.PointLightHelper=function(a,b){THREE.Object3D.call(this);this.matrixAutoUpdate=!1;this.light=a;var c=new THREE.SphereGeometry(b,4,2),d=new THREE.MeshBasicMaterial({fog:!1,wireframe:!0});d.color.copy(this.light.color).multiplyScalar(this.light.intensity);this.lightSphere=new THREE.Mesh(c,d);this.lightSphere.matrixWorld=this.light.matrixWorld;this.lightSphere.matrixAutoUpdate=!1;this.add(this.lightSphere)};THREE.PointLightHelper.prototype=Object.create(THREE.Object3D.prototype);
THREE.PointLightHelper.prototype.update=function(){this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)};THREE.SpotLightHelper=function(a){this.light=a;a=new THREE.CylinderGeometry(0,1,1,8,1,!0);a.applyMatrix((new THREE.Matrix4).makeTranslation(0,-0.5,0));a.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2));var b=new THREE.MeshBasicMaterial({wireframe:!0,opacity:0.3,transparent:!0});THREE.Mesh.call(this,a,b);this.update()};THREE.SpotLightHelper.prototype=Object.create(THREE.Mesh.prototype);
THREE.SpotLightHelper.prototype.update=function(){var a=new THREE.Vector3;return function(){var b=this.light.distance?this.light.distance:1E4,c=b*Math.tan(this.light.angle);this.scale.set(c,c,b);this.light.updateMatrixWorld(!0);this.position.getPositionFromMatrix(this.light.matrixWorld);this.light.target.updateMatrixWorld(!0);a.getPositionFromMatrix(this.light.target.matrixWorld);this.lookAt(a);this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)}}();THREE.VertexNormalsHelper=function(a,b,c,d){this.object=a;this.size=b||1;for(var b=c||16711680,d=d||1,c=new THREE.Geometry,a=a.geometry.faces,e=0,f=a.length;e<f;e++)for(var h=0,g=a[e].vertexNormals.length;h<g;h++)c.vertices.push(new THREE.Vector3),c.vertices.push(new THREE.Vector3);THREE.Line.call(this,c,new THREE.LineBasicMaterial({color:b,linewidth:d}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.normalMatrix=new THREE.Matrix3;this.update()};THREE.VertexNormalsHelper.prototype=Object.create(THREE.Line.prototype);
THREE.VertexNormalsHelper.prototype.update=function(){var a=new THREE.Vector3;return function(){var b=["a","b","c","d"];this.object.updateMatrixWorld(!0);this.normalMatrix.getNormalMatrix(this.object.matrixWorld);for(var c=this.geometry.vertices,d=this.object.geometry.vertices,e=this.object.geometry.faces,f=this.object.matrixWorld,h=0,g=0,i=e.length;g<i;g++)for(var j=e[g],l=0,n=j.vertexNormals.length;l<n;l++){var m=j.vertexNormals[l];c[h].copy(d[j[b[l]]]).applyMatrix4(f);a.copy(m).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size);
a.add(c[h]);h+=1;c[h].copy(a);h+=1}this.geometry.verticesNeedUpdate=!0;return this}}();THREE.VertexTangentsHelper=function(a,b,c,d){this.object=a;this.size=b||1;for(var b=c||255,d=d||1,c=new THREE.Geometry,a=a.geometry.faces,e=0,f=a.length;e<f;e++)for(var h=0,g=a[e].vertexTangents.length;h<g;h++)c.vertices.push(new THREE.Vector3),c.vertices.push(new THREE.Vector3);THREE.Line.call(this,c,new THREE.LineBasicMaterial({color:b,linewidth:d}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.update()};THREE.VertexTangentsHelper.prototype=Object.create(THREE.Line.prototype);
THREE.VertexTangentsHelper.prototype.update=function(){var a=new THREE.Vector3;return function(){var b=["a","b","c","d"];this.object.updateMatrixWorld(!0);for(var c=this.geometry.vertices,d=this.object.geometry.vertices,e=this.object.geometry.faces,f=this.object.matrixWorld,h=0,g=0,i=e.length;g<i;g++)for(var j=e[g],l=0,n=j.vertexTangents.length;l<n;l++){var m=j.vertexTangents[l];c[h].copy(d[j[b[l]]]).applyMatrix4(f);a.copy(m).transformDirection(f).multiplyScalar(this.size);a.add(c[h]);h+=1;c[h].copy(a);
h+=1}this.geometry.verticesNeedUpdate=!0;return this}}();THREE.WireframeHelper=function(a){for(var b=[0,0],c={},d=function(a,b){return a-b},e=["a","b","c","d"],f=new THREE.Geometry,h=a.geometry.vertices,g=a.geometry.faces,i=0,j=g.length;i<j;i++)for(var l=g[i],n=l instanceof THREE.Face4?4:3,m=0;m<n;m++){b[0]=l[e[m]];b[1]=l[e[(m+1)%n]];b.sort(d);var q=b.toString();void 0===c[q]&&(f.vertices.push(h[b[0]]),f.vertices.push(h[b[1]]),c[q]=!0)}THREE.Line.call(this,f,new THREE.LineBasicMaterial({color:16777215}),THREE.LinePieces);this.matrixAutoUpdate=!1;this.matrixWorld=
a.matrixWorld};THREE.WireframeHelper.prototype=Object.create(THREE.Line.prototype);THREE.ImmediateRenderObject=function(){THREE.Object3D.call(this);this.render=function(){}};THREE.ImmediateRenderObject.prototype=Object.create(THREE.Object3D.prototype);THREE.LensFlare=function(a,b,c,d,e){THREE.Object3D.call(this);this.lensFlares=[];this.positionScreen=new THREE.Vector3;this.customUpdateCallback=void 0;void 0!==a&&this.add(a,b,c,d,e)};THREE.LensFlare.prototype=Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add=function(a,b,c,d,e,f){void 0===b&&(b=-1);void 0===c&&(c=0);void 0===f&&(f=1);void 0===e&&(e=new THREE.Color(16777215));void 0===d&&(d=THREE.NormalBlending);c=Math.min(c,Math.max(0,c));this.lensFlares.push({texture:a,size:b,distance:c,x:0,y:0,z:0,scale:1,rotation:1,opacity:f,color:e,blending:d})};
THREE.LensFlare.prototype.updateLensFlares=function(){var a,b=this.lensFlares.length,c,d=2*-this.positionScreen.x,e=2*-this.positionScreen.y;for(a=0;a<b;a++)c=this.lensFlares[a],c.x=this.positionScreen.x+d*c.distance,c.y=this.positionScreen.y+e*c.distance,c.wantedRotation=0.25*c.x*Math.PI,c.rotation+=0.25*(c.wantedRotation-c.rotation)};THREE.MorphBlendMesh=function(a,b){THREE.Mesh.call(this,a,b);this.animationsMap={};this.animationsList=[];var c=this.geometry.morphTargets.length;this.createAnimation("__default",0,c-1,c/1);this.setAnimationWeight("__default",1)};THREE.MorphBlendMesh.prototype=Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation=function(a,b,c,d){b={startFrame:b,endFrame:c,length:c-b+1,fps:d,duration:(c-b)/d,lastFrame:0,currentFrame:0,active:!1,time:0,direction:1,weight:1,directionBackwards:!1,mirroredLoop:!1};this.animationsMap[a]=b;this.animationsList.push(b)};
THREE.MorphBlendMesh.prototype.autoCreateAnimations=function(a){for(var b=/([a-z]+)(\d+)/,c,d={},e=this.geometry,f=0,h=e.morphTargets.length;f<h;f++){var g=e.morphTargets[f].name.match(b);if(g&&1<g.length){var i=g[1];d[i]||(d[i]={start:Infinity,end:-Infinity});g=d[i];f<g.start&&(g.start=f);f>g.end&&(g.end=f);c||(c=i)}}for(i in d)g=d[i],this.createAnimation(i,g.start,g.end,a);this.firstAnimation=c};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward=function(a){if(a=this.animationsMap[a])a.direction=1,a.directionBackwards=!1};THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward=function(a){if(a=this.animationsMap[a])a.direction=-1,a.directionBackwards=!0};THREE.MorphBlendMesh.prototype.setAnimationFPS=function(a,b){var c=this.animationsMap[a];c&&(c.fps=b,c.duration=(c.end-c.start)/c.fps)};
THREE.MorphBlendMesh.prototype.setAnimationDuration=function(a,b){var c=this.animationsMap[a];c&&(c.duration=b,c.fps=(c.end-c.start)/c.duration)};THREE.MorphBlendMesh.prototype.setAnimationWeight=function(a,b){var c=this.animationsMap[a];c&&(c.weight=b)};THREE.MorphBlendMesh.prototype.setAnimationTime=function(a,b){var c=this.animationsMap[a];c&&(c.time=b)};THREE.MorphBlendMesh.prototype.getAnimationTime=function(a){var b=0;if(a=this.animationsMap[a])b=a.time;return b};
THREE.MorphBlendMesh.prototype.getAnimationDuration=function(a){var b=-1;if(a=this.animationsMap[a])b=a.duration;return b};THREE.MorphBlendMesh.prototype.playAnimation=function(a){var b=this.animationsMap[a];b?(b.time=0,b.active=!0):console.warn("animation["+a+"] undefined")};THREE.MorphBlendMesh.prototype.stopAnimation=function(a){if(a=this.animationsMap[a])a.active=!1};
THREE.MorphBlendMesh.prototype.update=function(a){for(var b=0,c=this.animationsList.length;b<c;b++){var d=this.animationsList[b];if(d.active){var e=d.duration/d.length;d.time+=d.direction*a;if(d.mirroredLoop){if(d.time>d.duration||0>d.time)d.direction*=-1,d.time>d.duration&&(d.time=d.duration,d.directionBackwards=!0),0>d.time&&(d.time=0,d.directionBackwards=!1)}else d.time%=d.duration,0>d.time&&(d.time+=d.duration);var f=d.startFrame+THREE.Math.clamp(Math.floor(d.time/e),0,d.length-1),h=d.weight;
f!==d.currentFrame&&(this.morphTargetInfluences[d.lastFrame]=0,this.morphTargetInfluences[d.currentFrame]=1*h,this.morphTargetInfluences[f]=0,d.lastFrame=d.currentFrame,d.currentFrame=f);e=d.time%e/e;d.directionBackwards&&(e=1-e);this.morphTargetInfluences[d.currentFrame]=e*h;this.morphTargetInfluences[d.lastFrame]=(1-e)*h}}};THREE.LensFlarePlugin=function(){function a(a,c){var d=b.createProgram(),e=b.createShader(b.FRAGMENT_SHADER),f=b.createShader(b.VERTEX_SHADER),g="precision "+c+" float;\n";b.shaderSource(e,g+a.fragmentShader);b.shaderSource(f,g+a.vertexShader);b.compileShader(e);b.compileShader(f);b.attachShader(d,e);b.attachShader(d,f);b.linkProgram(d);return d}var b,c,d,e,f,h,g,i,j,l,n,m,q;this.init=function(t){b=t.context;c=t;d=t.getPrecision();e=new Float32Array(16);f=new Uint16Array(6);t=0;e[t++]=-1;e[t++]=-1;
e[t++]=0;e[t++]=0;e[t++]=1;e[t++]=-1;e[t++]=1;e[t++]=0;e[t++]=1;e[t++]=1;e[t++]=1;e[t++]=1;e[t++]=-1;e[t++]=1;e[t++]=0;e[t++]=1;t=0;f[t++]=0;f[t++]=1;f[t++]=2;f[t++]=0;f[t++]=2;f[t++]=3;h=b.createBuffer();g=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,h);b.bufferData(b.ARRAY_BUFFER,e,b.STATIC_DRAW);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,g);b.bufferData(b.ELEMENT_ARRAY_BUFFER,f,b.STATIC_DRAW);i=b.createTexture();j=b.createTexture();b.bindTexture(b.TEXTURE_2D,i);b.texImage2D(b.TEXTURE_2D,0,b.RGB,16,16,
0,b.RGB,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);b.bindTexture(b.TEXTURE_2D,j);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,16,16,0,b.RGBA,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);
b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);0>=b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS)?(l=!1,n=a(THREE.ShaderFlares.lensFlare,d)):(l=!0,n=a(THREE.ShaderFlares.lensFlareVertexTexture,d));m={};q={};m.vertex=b.getAttribLocation(n,"position");m.uv=b.getAttribLocation(n,"uv");q.renderType=b.getUniformLocation(n,"renderType");q.map=b.getUniformLocation(n,"map");q.occlusionMap=b.getUniformLocation(n,"occlusionMap");q.opacity=
b.getUniformLocation(n,"opacity");q.color=b.getUniformLocation(n,"color");q.scale=b.getUniformLocation(n,"scale");q.rotation=b.getUniformLocation(n,"rotation");q.screenPosition=b.getUniformLocation(n,"screenPosition")};this.render=function(a,d,e,f){var a=a.__webglFlares,v=a.length;if(v){var z=new THREE.Vector3,G=f/e,C=0.5*e,H=0.5*f,I=16/f,F=new THREE.Vector2(I*G,I),A=new THREE.Vector3(1,1,0),K=new THREE.Vector2(1,1),B=q,I=m;b.useProgram(n);b.enableVertexAttribArray(m.vertex);b.enableVertexAttribArray(m.uv);
b.uniform1i(B.occlusionMap,0);b.uniform1i(B.map,1);b.bindBuffer(b.ARRAY_BUFFER,h);b.vertexAttribPointer(I.vertex,2,b.FLOAT,!1,16,0);b.vertexAttribPointer(I.uv,2,b.FLOAT,!1,16,8);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,g);b.disable(b.CULL_FACE);b.depthMask(!1);var J,N,y,M,w;for(J=0;J<v;J++)if(I=16/f,F.set(I*G,I),M=a[J],z.set(M.matrixWorld.elements[12],M.matrixWorld.elements[13],M.matrixWorld.elements[14]),z.applyMatrix4(d.matrixWorldInverse),z.applyProjection(d.projectionMatrix),A.copy(z),K.x=A.x*C+C,
K.y=A.y*H+H,l||0<K.x&&K.x<e&&0<K.y&&K.y<f){b.activeTexture(b.TEXTURE1);b.bindTexture(b.TEXTURE_2D,i);b.copyTexImage2D(b.TEXTURE_2D,0,b.RGB,K.x-8,K.y-8,16,16,0);b.uniform1i(B.renderType,0);b.uniform2f(B.scale,F.x,F.y);b.uniform3f(B.screenPosition,A.x,A.y,A.z);b.disable(b.BLEND);b.enable(b.DEPTH_TEST);b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0);b.activeTexture(b.TEXTURE0);b.bindTexture(b.TEXTURE_2D,j);b.copyTexImage2D(b.TEXTURE_2D,0,b.RGBA,K.x-8,K.y-8,16,16,0);b.uniform1i(B.renderType,1);b.disable(b.DEPTH_TEST);
b.activeTexture(b.TEXTURE1);b.bindTexture(b.TEXTURE_2D,i);b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0);M.positionScreen.copy(A);M.customUpdateCallback?M.customUpdateCallback(M):M.updateLensFlares();b.uniform1i(B.renderType,2);b.enable(b.BLEND);N=0;for(y=M.lensFlares.length;N<y;N++)w=M.lensFlares[N],0.001<w.opacity&&0.001<w.scale&&(A.x=w.x,A.y=w.y,A.z=w.z,I=w.size*w.scale/f,F.x=I*G,F.y=I,b.uniform3f(B.screenPosition,A.x,A.y,A.z),b.uniform2f(B.scale,F.x,F.y),b.uniform1f(B.rotation,w.rotation),b.uniform1f(B.opacity,
w.opacity),b.uniform3f(B.color,w.color.r,w.color.g,w.color.b),c.setBlending(w.blending,w.blendEquation,w.blendSrc,w.blendDst),c.setTexture(w.texture,1),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0))}b.enable(b.CULL_FACE);b.enable(b.DEPTH_TEST);b.depthMask(!0)}}};THREE.ShadowMapPlugin=function(){var a,b,c,d,e,f,h=new THREE.Frustum,g=new THREE.Matrix4,i=new THREE.Vector3,j=new THREE.Vector3,l=new THREE.Vector3;this.init=function(g){a=g.context;b=g;var g=THREE.ShaderLib.depthRGBA,h=THREE.UniformsUtils.clone(g.uniforms);c=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h});d=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0});e=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,
vertexShader:g.vertexShader,uniforms:h,skinning:!0});f=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0,skinning:!0});c._shadowPass=!0;d._shadowPass=!0;e._shadowPass=!0;f._shadowPass=!0};this.render=function(a,c){b.shadowMapEnabled&&b.shadowMapAutoUpdate&&this.update(a,c)};this.update=function(n,m){var q,t,p,r,s,v,z,G,C,H=[];r=0;a.clearColor(1,1,1,1);a.disable(a.BLEND);a.enable(a.CULL_FACE);a.frontFace(a.CCW);b.shadowMapCullFace===THREE.CullFaceFront?
a.cullFace(a.FRONT):a.cullFace(a.BACK);b.setDepthTest(!0);q=0;for(t=n.__lights.length;q<t;q++)if(p=n.__lights[q],p.castShadow)if(p instanceof THREE.DirectionalLight&&p.shadowCascade)for(s=0;s<p.shadowCascadeCount;s++){var I;if(p.shadowCascadeArray[s])I=p.shadowCascadeArray[s];else{C=p;z=s;I=new THREE.DirectionalLight;I.isVirtual=!0;I.onlyShadow=!0;I.castShadow=!0;I.shadowCameraNear=C.shadowCameraNear;I.shadowCameraFar=C.shadowCameraFar;I.shadowCameraLeft=C.shadowCameraLeft;I.shadowCameraRight=C.shadowCameraRight;
I.shadowCameraBottom=C.shadowCameraBottom;I.shadowCameraTop=C.shadowCameraTop;I.shadowCameraVisible=C.shadowCameraVisible;I.shadowDarkness=C.shadowDarkness;I.shadowBias=C.shadowCascadeBias[z];I.shadowMapWidth=C.shadowCascadeWidth[z];I.shadowMapHeight=C.shadowCascadeHeight[z];I.pointsWorld=[];I.pointsFrustum=[];G=I.pointsWorld;v=I.pointsFrustum;for(var F=0;8>F;F++)G[F]=new THREE.Vector3,v[F]=new THREE.Vector3;G=C.shadowCascadeNearZ[z];C=C.shadowCascadeFarZ[z];v[0].set(-1,-1,G);v[1].set(1,-1,G);v[2].set(-1,
1,G);v[3].set(1,1,G);v[4].set(-1,-1,C);v[5].set(1,-1,C);v[6].set(-1,1,C);v[7].set(1,1,C);I.originalCamera=m;v=new THREE.Gyroscope;v.position=p.shadowCascadeOffset;v.add(I);v.add(I.target);m.add(v);p.shadowCascadeArray[s]=I;console.log("Created virtualLight",I)}z=p;G=s;C=z.shadowCascadeArray[G];C.position.copy(z.position);C.target.position.copy(z.target.position);C.lookAt(C.target);C.shadowCameraVisible=z.shadowCameraVisible;C.shadowDarkness=z.shadowDarkness;C.shadowBias=z.shadowCascadeBias[G];v=z.shadowCascadeNearZ[G];
z=z.shadowCascadeFarZ[G];C=C.pointsFrustum;C[0].z=v;C[1].z=v;C[2].z=v;C[3].z=v;C[4].z=z;C[5].z=z;C[6].z=z;C[7].z=z;H[r]=I;r++}else H[r]=p,r++;q=0;for(t=H.length;q<t;q++){p=H[q];p.shadowMap||(s=THREE.LinearFilter,b.shadowMapType===THREE.PCFSoftShadowMap&&(s=THREE.NearestFilter),p.shadowMap=new THREE.WebGLRenderTarget(p.shadowMapWidth,p.shadowMapHeight,{minFilter:s,magFilter:s,format:THREE.RGBAFormat}),p.shadowMapSize=new THREE.Vector2(p.shadowMapWidth,p.shadowMapHeight),p.shadowMatrix=new THREE.Matrix4);
if(!p.shadowCamera){if(p instanceof THREE.SpotLight)p.shadowCamera=new THREE.PerspectiveCamera(p.shadowCameraFov,p.shadowMapWidth/p.shadowMapHeight,p.shadowCameraNear,p.shadowCameraFar);else if(p instanceof THREE.DirectionalLight)p.shadowCamera=new THREE.OrthographicCamera(p.shadowCameraLeft,p.shadowCameraRight,p.shadowCameraTop,p.shadowCameraBottom,p.shadowCameraNear,p.shadowCameraFar);else{console.error("Unsupported light type for shadow");continue}n.add(p.shadowCamera);!0===n.autoUpdate&&n.updateMatrixWorld()}p.shadowCameraVisible&&
!p.cameraHelper&&(p.cameraHelper=new THREE.CameraHelper(p.shadowCamera),p.shadowCamera.add(p.cameraHelper));if(p.isVirtual&&I.originalCamera==m){s=m;r=p.shadowCamera;v=p.pointsFrustum;C=p.pointsWorld;i.set(Infinity,Infinity,Infinity);j.set(-Infinity,-Infinity,-Infinity);for(z=0;8>z;z++)G=C[z],G.copy(v[z]),THREE.ShadowMapPlugin.__projector.unprojectVector(G,s),G.applyMatrix4(r.matrixWorldInverse),G.x<i.x&&(i.x=G.x),G.x>j.x&&(j.x=G.x),G.y<i.y&&(i.y=G.y),G.y>j.y&&(j.y=G.y),G.z<i.z&&(i.z=G.z),G.z>j.z&&
(j.z=G.z);r.left=i.x;r.right=j.x;r.top=j.y;r.bottom=i.y;r.updateProjectionMatrix()}r=p.shadowMap;v=p.shadowMatrix;s=p.shadowCamera;s.position.getPositionFromMatrix(p.matrixWorld);l.getPositionFromMatrix(p.target.matrixWorld);s.lookAt(l);s.updateMatrixWorld();s.matrixWorldInverse.getInverse(s.matrixWorld);p.cameraHelper&&(p.cameraHelper.visible=p.shadowCameraVisible);p.shadowCameraVisible&&p.cameraHelper.update();v.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);v.multiply(s.projectionMatrix);v.multiply(s.matrixWorldInverse);
g.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse);h.setFromMatrix(g);b.setRenderTarget(r);b.clear();C=n.__webglObjects;p=0;for(r=C.length;p<r;p++)if(z=C[p],v=z.object,z.render=!1,v.visible&&v.castShadow&&(!(v instanceof THREE.Mesh||v instanceof THREE.ParticleSystem)||!v.frustumCulled||h.intersectsObject(v)))v._modelViewMatrix.multiplyMatrices(s.matrixWorldInverse,v.matrixWorld),z.render=!0;p=0;for(r=C.length;p<r;p++)z=C[p],z.render&&(v=z.object,z=z.buffer,F=v.material instanceof THREE.MeshFaceMaterial?
v.material.materials[0]:v.material,G=0<v.geometry.morphTargets.length&&F.morphTargets,F=v instanceof THREE.SkinnedMesh&&F.skinning,G=v.customDepthMaterial?v.customDepthMaterial:F?G?f:e:G?d:c,z instanceof THREE.BufferGeometry?b.renderBufferDirect(s,n.__lights,null,G,z,v):b.renderBuffer(s,n.__lights,null,G,z,v));C=n.__webglObjectsImmediate;p=0;for(r=C.length;p<r;p++)z=C[p],v=z.object,v.visible&&v.castShadow&&(v._modelViewMatrix.multiplyMatrices(s.matrixWorldInverse,v.matrixWorld),b.renderImmediateObject(s,
n.__lights,null,c,v))}q=b.getClearColor();t=b.getClearAlpha();a.clearColor(q.r,q.g,q.b,t);a.enable(a.BLEND);b.shadowMapCullFace===THREE.CullFaceFront&&a.cullFace(a.BACK)}};THREE.ShadowMapPlugin.__projector=new THREE.Projector;THREE.SpritePlugin=function(){function a(a,b){return a.z!==b.z?b.z-a.z:b.id-a.id}var b,c,d,e,f,h,g,i,j,l;this.init=function(a){b=a.context;c=a;d=a.getPrecision();e=new Float32Array(16);f=new Uint16Array(6);a=0;e[a++]=-1;e[a++]=-1;e[a++]=0;e[a++]=0;e[a++]=1;e[a++]=-1;e[a++]=1;e[a++]=0;e[a++]=1;e[a++]=1;e[a++]=1;e[a++]=1;e[a++]=-1;e[a++]=1;e[a++]=0;e[a++]=1;a=0;f[a++]=0;f[a++]=1;f[a++]=2;f[a++]=0;f[a++]=2;f[a++]=3;h=b.createBuffer();g=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,h);b.bufferData(b.ARRAY_BUFFER,
e,b.STATIC_DRAW);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,g);b.bufferData(b.ELEMENT_ARRAY_BUFFER,f,b.STATIC_DRAW);var a=THREE.ShaderSprite.sprite,m=b.createProgram(),q=b.createShader(b.FRAGMENT_SHADER),t=b.createShader(b.VERTEX_SHADER),p="precision "+d+" float;\n";b.shaderSource(q,p+a.fragmentShader);b.shaderSource(t,p+a.vertexShader);b.compileShader(q);b.compileShader(t);b.attachShader(m,q);b.attachShader(m,t);b.linkProgram(m);i=m;j={};l={};j.position=b.getAttribLocation(i,"position");j.uv=b.getAttribLocation(i,
"uv");l.uvOffset=b.getUniformLocation(i,"uvOffset");l.uvScale=b.getUniformLocation(i,"uvScale");l.rotation=b.getUniformLocation(i,"rotation");l.scale=b.getUniformLocation(i,"scale");l.alignment=b.getUniformLocation(i,"alignment");l.color=b.getUniformLocation(i,"color");l.map=b.getUniformLocation(i,"map");l.opacity=b.getUniformLocation(i,"opacity");l.useScreenCoordinates=b.getUniformLocation(i,"useScreenCoordinates");l.sizeAttenuation=b.getUniformLocation(i,"sizeAttenuation");l.screenPosition=b.getUniformLocation(i,
"screenPosition");l.modelViewMatrix=b.getUniformLocation(i,"modelViewMatrix");l.projectionMatrix=b.getUniformLocation(i,"projectionMatrix");l.fogType=b.getUniformLocation(i,"fogType");l.fogDensity=b.getUniformLocation(i,"fogDensity");l.fogNear=b.getUniformLocation(i,"fogNear");l.fogFar=b.getUniformLocation(i,"fogFar");l.fogColor=b.getUniformLocation(i,"fogColor");l.alphaTest=b.getUniformLocation(i,"alphaTest")};this.render=function(d,e,f,t){var p=d.__webglSprites,r=p.length;if(r){var s=j,v=l,z=t/
f,f=0.5*f,G=0.5*t;b.useProgram(i);b.enableVertexAttribArray(s.position);b.enableVertexAttribArray(s.uv);b.disable(b.CULL_FACE);b.enable(b.BLEND);b.bindBuffer(b.ARRAY_BUFFER,h);b.vertexAttribPointer(s.position,2,b.FLOAT,!1,16,0);b.vertexAttribPointer(s.uv,2,b.FLOAT,!1,16,8);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,g);b.uniformMatrix4fv(v.projectionMatrix,!1,e.projectionMatrix.elements);b.activeTexture(b.TEXTURE0);b.uniform1i(v.map,0);var C=s=0,H=d.fog;H?(b.uniform3f(v.fogColor,H.color.r,H.color.g,H.color.b),
H instanceof THREE.Fog?(b.uniform1f(v.fogNear,H.near),b.uniform1f(v.fogFar,H.far),b.uniform1i(v.fogType,1),C=s=1):H instanceof THREE.FogExp2&&(b.uniform1f(v.fogDensity,H.density),b.uniform1i(v.fogType,2),C=s=2)):(b.uniform1i(v.fogType,0),C=s=0);for(var I,F,A=[],H=0;H<r;H++)I=p[H],F=I.material,I.visible&&0!==F.opacity&&(F.useScreenCoordinates?I.z=-I.position.z:(I._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse,I.matrixWorld),I.z=-I._modelViewMatrix.elements[14]));p.sort(a);for(H=0;H<r;H++)I=
p[H],F=I.material,I.visible&&0!==F.opacity&&(F.map&&F.map.image&&F.map.image.width)&&(b.uniform1f(v.alphaTest,F.alphaTest),!0===F.useScreenCoordinates?(b.uniform1i(v.useScreenCoordinates,1),b.uniform3f(v.screenPosition,(I.position.x*c.devicePixelRatio-f)/f,(G-I.position.y*c.devicePixelRatio)/G,Math.max(0,Math.min(1,I.position.z))),A[0]=c.devicePixelRatio,A[1]=c.devicePixelRatio):(b.uniform1i(v.useScreenCoordinates,0),b.uniform1i(v.sizeAttenuation,F.sizeAttenuation?1:0),b.uniformMatrix4fv(v.modelViewMatrix,
!1,I._modelViewMatrix.elements),A[0]=1,A[1]=1),e=d.fog&&F.fog?C:0,s!==e&&(b.uniform1i(v.fogType,e),s=e),e=1/(F.scaleByViewport?t:1),A[0]*=e*z*I.scale.x,A[1]*=e*I.scale.y,b.uniform2f(v.uvScale,F.uvScale.x,F.uvScale.y),b.uniform2f(v.uvOffset,F.uvOffset.x,F.uvOffset.y),b.uniform2f(v.alignment,F.alignment.x,F.alignment.y),b.uniform1f(v.opacity,F.opacity),b.uniform3f(v.color,F.color.r,F.color.g,F.color.b),b.uniform1f(v.rotation,I.rotation),b.uniform2fv(v.scale,A),c.setBlending(F.blending,F.blendEquation,
F.blendSrc,F.blendDst),c.setDepthTest(F.depthTest),c.setDepthWrite(F.depthWrite),c.setTexture(F.map,0),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0));b.enable(b.CULL_FACE)}}};THREE.DepthPassPlugin=function(){this.enabled=!1;this.renderTarget=null;var a,b,c,d,e,f,h=new THREE.Frustum,g=new THREE.Matrix4;this.init=function(g){a=g.context;b=g;var g=THREE.ShaderLib.depthRGBA,h=THREE.UniformsUtils.clone(g.uniforms);c=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h});d=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0});e=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,
vertexShader:g.vertexShader,uniforms:h,skinning:!0});f=new THREE.ShaderMaterial({fragmentShader:g.fragmentShader,vertexShader:g.vertexShader,uniforms:h,morphTargets:!0,skinning:!0});c._shadowPass=!0;d._shadowPass=!0;e._shadowPass=!0;f._shadowPass=!0};this.render=function(a,b){this.enabled&&this.update(a,b)};this.update=function(i,j){var l,n,m,q,t,p;a.clearColor(1,1,1,1);a.disable(a.BLEND);b.setDepthTest(!0);!0===i.autoUpdate&&i.updateMatrixWorld();j.matrixWorldInverse.getInverse(j.matrixWorld);g.multiplyMatrices(j.projectionMatrix,
j.matrixWorldInverse);h.setFromMatrix(g);b.setRenderTarget(this.renderTarget);b.clear();p=i.__webglObjects;l=0;for(n=p.length;l<n;l++)if(m=p[l],t=m.object,m.render=!1,t.visible&&(!(t instanceof THREE.Mesh||t instanceof THREE.ParticleSystem)||!t.frustumCulled||h.intersectsObject(t)))t._modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,t.matrixWorld),m.render=!0;var r;l=0;for(n=p.length;l<n;l++)if(m=p[l],m.render&&(t=m.object,m=m.buffer,!(t instanceof THREE.ParticleSystem)||t.customDepthMaterial))(r=
t.material instanceof THREE.MeshFaceMaterial?t.material.materials[0]:t.material)&&b.setMaterialFaces(t.material),q=0<t.geometry.morphTargets.length&&r.morphTargets,r=t instanceof THREE.SkinnedMesh&&r.skinning,q=t.customDepthMaterial?t.customDepthMaterial:r?q?f:e:q?d:c,m instanceof THREE.BufferGeometry?b.renderBufferDirect(j,i.__lights,null,q,m,t):b.renderBuffer(j,i.__lights,null,q,m,t);p=i.__webglObjectsImmediate;l=0;for(n=p.length;l<n;l++)m=p[l],t=m.object,t.visible&&(t._modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,
t.matrixWorld),b.renderImmediateObject(j,i.__lights,null,c,t));l=b.getClearColor();n=b.getClearAlpha();a.clearColor(l.r,l.g,l.b,n);a.enable(a.BLEND)}};THREE.ShaderFlares={lensFlareVertexTexture:{vertexShader:"uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
fragmentShader:"uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"},lensFlare:{vertexShader:"uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
fragmentShader:"precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"}};THREE.ShaderSprite={sprite:{vertexShader:"uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
fragmentShader:"uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"}};

define("threejs", function(){});

define('threex/particles/ParticleEngine',['threejs'], function() {
    var ParticleEngine = function(scene) {
        var clock = new THREE.Clock();
        var offsetX = (window.innerWidth / 2);
        var offsetY = (window.innerHeight / 2);
        var queuedParticles = [];
        var count = 250,
            particles = new THREE.Geometry(),
            material = new THREE.ParticleBasicMaterial({
                color: 0xFFFFFF,
                size: 15
                //transparent: true,
                //blending: THREE.AdditiveBlending
            });

        var i = 0;
        while(i < count) {
            //var pX = (Math.random() * 500 - 250) + offsetX;
            //var pY = (Math.random() * 500 - 250) + offsetY;
            var pZ = (Math.random() * 500 - 250);
            var pX = 0;
            var pY = 2000;
            //var pZ = 0;
            var particle = new THREE.Vector3(pX, pY, pZ);
            // Custom properties
            particle.life = Math.floor(Math.random() * 4 + 1) * 1000;
            particle.speed = Math.random() * 1 + 2;
            particle.vx = 0;
            particle.vy = 0;
            particle.alive = false;
            particle.rotation = 0;
            particle.lived = 0;

            particles.vertices.push(particle);

            i++;
        }

        var particleSystem = new THREE.ParticleSystem(
            particles, material
        );
        particleSystem.position.x -= offsetX;
        particleSystem.position.y += offsetY;
        particleSystem.scale.y = -1;
        particleSystem.sortParticles = true;

        scene.add(particleSystem);

        i = 0;
        var lt;
        this.generate = function(x, y) {
            lt = Math.floor(new Date());
            var p = particles.vertices[i];
            // Basic Move
            //p.x = x;
            //p.y = y;
            // ---------
            
            // A bit of randomization
            var offset = (Math.random() * 30); 
            p.x = x + Math.random() * 60 - 30;
            p.y = y + Math.random() * 60 - 30;
            var rotation = Math.atan2(y - p.y, x - p.x) * 180 / Math.PI;
            p.vx = p.speed * (90 - Math.abs(rotation)) / 90;
            p.rotation = rotation;
            // --------
            
            p.lived = p.life + lt;
            queuedParticles.push(p);

            particleSystem.verticesNeedUpdate = true;
            i = i < count - 1 ? i + 1 : 0;
        };

        this.update = function() {
            var t = Math.floor(new Date());
            var delta = clock.getDelta();
            var i = queuedParticles.length;
            while(i--) {
                var p = queuedParticles[i];
                if (t > p.lived) {
                    p.alive = false;
                    p.x = 0;
                    p.y = 1200;
                    queuedParticles.splice(i, 1);
                } else {
                    if (p.rotation < 0) {
                        p.vy = -p.speed + Math.abs(p.vx);
                    } else {
                        p.vy = p.speed - Math.abs(p.vx);
                    }
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alive = true;
                    //p.y -= delta * 50;
                }
            }
        };

        this.getParticles = function() {
            return particles.vertices;
        };
    };

    return ParticleEngine;
});

define('Leap', [], function() {var define;
 ;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var CircularBuffer = module.exports = function(size) {
  this.pos = 0;
  this._buf = [];
  this.size = size;
}

CircularBuffer.prototype.get = function(i) {
  if (i == undefined) i = 0;
  if (i >= this.size) return undefined;
  if (i >= this._buf.length) return undefined;
  return this._buf[(this.pos - i - 1) % this.size];
}

CircularBuffer.prototype.push = function(o) {
  this._buf[this.pos % this.size] = o;
  return this.pos++;
}

},{}],2:[function(require,module,exports){
var chooseProtocol = require('../protocol').chooseProtocol
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

var BaseConnection = module.exports = function(opts) {
  this.opts = _.defaults(opts || {}, {
    host : '127.0.0.1',
    enableGestures: false,
    port: 6437,
    background: false,
    requestProtocolVersion: 4
  });
  this.host = this.opts.host;
  this.port = this.opts.port;
  this.on('ready', function() {
    this.enableGestures(this.opts.enableGestures);
    this.setBackground(this.opts.background);
  });
}

BaseConnection.prototype.getUrl = function() {
  return "ws://" + this.host + ":" + this.port + "/v" + this.opts.requestProtocolVersion + ".json";
}

BaseConnection.prototype.setBackground = function(state) {
  this.opts.background = state;
  if (this.protocol && this.protocol.sendBackground && this.background !== this.opts.background) {
    this.background = this.opts.background;
    this.protocol.sendBackground(this, this.opts.background);
  }
}

BaseConnection.prototype.handleOpen = function() {
  if (!this.connected) {
    this.connected = true;
    this.emit('connect');
  }
}

BaseConnection.prototype.enableGestures = function(enabled) {
  this.gesturesEnabled = enabled ? true : false;
  this.send(this.protocol.encode({"enableGestures": this.gesturesEnabled}));
}

BaseConnection.prototype.handleClose = function(code, reason) {
  if (!this.connected) return;
  this.disconnect();
  if (code === 1001 && this.opts.requestProtocolVersion > 1) {
    this.opts.requestProtocolVersion--;
  }
  this.startReconnection();
}

BaseConnection.prototype.startReconnection = function() {
  var connection = this;
  this.reconnectionTimer = setInterval(function() { connection.reconnect() }, 1000);
}

BaseConnection.prototype.disconnect = function() {
  if (!this.socket) return;
  this.socket.close();
  delete this.socket;
  delete this.protocol;
  if (this.connected) {
    this.connected = false;
    this.emit('disconnect');
  }
  return true;
}

BaseConnection.prototype.reconnect = function() {
  if (this.connected) {
    clearInterval(this.reconnectionTimer);
  } else {
    this.disconnect();
    this.connect();
  }
}

BaseConnection.prototype.handleData = function(data) {
  var message = JSON.parse(data);
  var messageEvent;
  if (this.protocol === undefined) {
    messageEvent = this.protocol = chooseProtocol(message);
    this.emit('ready');
  } else {
    messageEvent = this.protocol(message);
  }
  this.emit(messageEvent.type, messageEvent);
}

BaseConnection.prototype.connect = function() {
  if (this.socket) return;
  this.socket = this.setupSocket();
  return true;
}

BaseConnection.prototype.send = function(data) {
  this.socket.send(data);
}

BaseConnection.prototype.reportFocus = function(state) {
  if (this.focusedState === state) return;
  this.focusedState = state;
  this.emit(this.focusedState ? 'focus' : 'blur');
  if (this.protocol && this.protocol.sendFocused) {
    this.protocol.sendFocused(this, this.focusedState);
  }
}

_.extend(BaseConnection.prototype, EventEmitter.prototype);


},{"../protocol":13,"events":17,"underscore":20}],3:[function(require,module,exports){
var BaseConnection = module.exports = require('./base')
  , _ = require('underscore');

var BrowserConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
  var connection = this;
  this.on('ready', function() { connection.startFocusLoop(); })
  this.on('disconnect', function() { connection.stopFocusLoop(); })
}

_.extend(BrowserConnection.prototype, BaseConnection.prototype);

BrowserConnection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket(this.getUrl());
  socket.onopen = function() { connection.handleOpen(); };
  socket.onclose = function(data) { connection.handleClose(data['code'], data['reason']); };
  socket.onmessage = function(message) { connection.handleData(message.data) };
  return socket;
}

BrowserConnection.prototype.startFocusLoop = function() {
  if (this.focusDetectorTimer) return;
  var connection = this;
  var propertyName = null;
  if (typeof document.hidden !== "undefined") {
    propertyName = "hidden";
  } else if (typeof document.mozHidden !== "undefined") {
    propertyName = "mozHidden";
  } else if (typeof document.msHidden !== "undefined") {
    propertyName = "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    propertyName = "webkitHidden";
  } else {
    propertyName = undefined;
  }

  if (connection.windowVisible === undefined) {
    connection.windowVisible = propertyName === undefined ? true : document[propertyName] === false;
  }

  var focusListener = window.addEventListener('focus', function(e) {
    connection.windowVisible = true;
    updateFocusState();
  });

  var blurListener = window.addEventListener('blur', function(e) {
    connection.windowVisible = false;
    updateFocusState();
  });

  this.on('disconnect', function() {
    window.removeEventListener('focus', focusListener);
    window.removeEventListener('blur', blurListener);
  });

  var updateFocusState = function() {
    var isVisible = propertyName === undefined ? true : document[propertyName] === false;
    connection.reportFocus(isVisible && connection.windowVisible);
  }

  this.focusDetectorTimer = setInterval(updateFocusState, 100);
}

BrowserConnection.prototype.stopFocusLoop = function() {
  if (!this.focusDetectorTimer) return;
  clearTimeout(this.focusDetectorTimer);
  delete this.focusDetectorTimer;
}

},{"./base":2,"underscore":20}],4:[function(require,module,exports){
var WebSocket = require('ws')
  , BaseConnection = require('./base')
  , _ = require('underscore');

var NodeConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
}

_.extend(NodeConnection.prototype, BaseConnection.prototype);

NodeConnection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket(this.getUrl());
  socket.on('open', function() { connection.handleOpen(); });
  socket.on('message', function(m) { connection.handleData(m); });
  socket.on('close', function(code, reason) { connection.handleClose(code, reason); });
  socket.on('error', function() { connection.startReconnection(); });
  return socket;
}

},{"./base":2,"underscore":20,"ws":21}],5:[function(require,module,exports){
(function(process){var Frame = require('./frame')
  , CircularBuffer = require("./circular_buffer")
  , Pipeline = require("./pipeline")
  , EventEmitter = require('events').EventEmitter
  , gestureListener = require('./gesture').gestureListener
  , _ = require('underscore');

/**
 * Constructs a Controller object.
 *
 * When creating a Controller object, you may optionally pass in options
 * to set the host , set the port, enable gestures, or select the frame event type.
 *
 * ```javascript
 * var controller = new Leap.Controller({
 *   host: '127.0.0.1',
 *   port: 6437,
 *   enableGestures: true,
 *   frameEventName: 'animationFrame'
 * });
 * ```
 *
 * @class Controller
 * @memberof Leap
 * @classdesc
 * The Controller class is your main interface to the Leap Motion Controller.
 *
 * Create an instance of this Controller class to access frames of tracking data
 * and configuration information. Frame data can be polled at any time using the
 * [Controller.frame]{@link Leap.Controller#frame}() function. Call frame() or frame(0) to get the most recent
 * frame. Set the history parameter to a positive integer to access previous frames.
 * A controller stores up to 60 frames in its frame history.
 *
 * Polling is an appropriate strategy for applications which already have an
 * intrinsic update loop, such as a game.
 */
var Controller = module.exports = function(opts) {
  var inNode = typeof(process) !== 'undefined' && process.title === 'node';

  opts = _.defaults(opts || {}, {
    inNode: inNode
  });

  this.inNode = opts.inNode;

  opts = _.defaults(opts || {}, {
    frameEventName: this.useAnimationLoop() ? 'animationFrame' : 'deviceFrame',
    suppressAnimationLoop: false
  });

  this.suppressAnimationLoop = opts.suppressAnimationLoop;
  this.frameEventName = opts.frameEventName;
  this.history = new CircularBuffer(200);
  this.lastFrame = Frame.Invalid;
  this.lastValidFrame = Frame.Invalid;
  this.lastConnectionFrame = Frame.Invalid;
  this.accumulatedGestures = [];
  if (opts.connectionType === undefined) {
    this.connectionType = (this.inBrowser() ? require('./connection/browser') : require('./connection/node'));
  } else {
    this.connectionType = opts.connectionType;
  }
  this.connection = new this.connectionType(opts);
  this.setupConnectionEvents();
}

Controller.prototype.gesture = function(type, cb) {
  var creator = gestureListener(this, type);
  if (cb !== undefined) {
    creator.stop(cb);
  }
  return creator;
}

Controller.prototype.setBackground = function(state) {
  this.connection.setBackground(state);
}

Controller.prototype.inBrowser = function() {
  return !this.inNode;
}

Controller.prototype.useAnimationLoop = function() {
  return this.inBrowser() && typeof(chrome) === "undefined";
}

Controller.prototype.connect = function() {
  var controller = this;
  if (this.connection.connect() && this.inBrowser() && !controller.suppressAnimationLoop) {
    var callback = function() {
      controller.emit('animationFrame', controller.lastConnectionFrame);
      window.requestAnimationFrame(callback);
    }
    window.requestAnimationFrame(callback);
  }
}

Controller.prototype.disconnect = function() {
  this.connection.disconnect();
}

/**
 * Returns a frame of tracking data from the Leap.
 *
 * Use the optional history parameter to specify which frame to retrieve.
 * Call frame() or frame(0) to access the most recent frame; call frame(1) to
 * access the previous frame, and so on. If you use a history value greater
 * than the number of stored frames, then the controller returns an invalid frame.
 *
 * @method frame
 * @memberof Leap.Controller.prototype
 * @param {number} history The age of the frame to return, counting backwards from
 * the most recent frame (0) into the past and up to the maximum age (59).
 * @returns {Leap.Frame} The specified frame; or, if no history
 * parameter is specified, the newest frame. If a frame is not available at
 * the specified history position, an invalid Frame is returned.
 */
Controller.prototype.frame = function(num) {
  return this.history.get(num) || Frame.Invalid;
}

Controller.prototype.loop = function(callback) {
  switch (callback.length) {
    case 1:
      this.on(this.frameEventName, callback);
      break;
    case 2:
      var controller = this;
      var scheduler = null;
      var immediateRunnerCallback = function(frame) {
        callback(frame, function() {
          if (controller.lastFrame != frame) {
            immediateRunnerCallback(controller.lastFrame);
          } else {
            controller.once(controller.frameEventName, immediateRunnerCallback);
          }
        });
      }
      this.once(this.frameEventName, immediateRunnerCallback);
      break;
  }
  this.connect();
}

Controller.prototype.addStep = function(step) {
  if (!this.pipeline) this.pipeline = new Pipeline(this);
  this.pipeline.addStep(step);
}

Controller.prototype.processFrame = function(frame) {
  if (frame.gestures) {
    this.accumulatedGestures = this.accumulatedGestures.concat(frame.gestures);
  }
  if (this.pipeline) {
    frame = this.pipeline.run(frame);
    if (!frame) frame = Frame.Invalid;
  }
  this.lastConnectionFrame = frame;
  this.emit('deviceFrame', frame);
}

Controller.prototype.processFinishedFrame = function(frame) {
  this.lastFrame = frame;
  if (frame.valid) {
    this.lastValidFrame = frame;
  }
  frame.controller = this;
  frame.historyIdx = this.history.push(frame);
  if (frame.gestures) {
    frame.gestures = this.accumulatedGestures;
    this.accumulatedGestures = [];
    for (var gestureIdx = 0; gestureIdx != frame.gestures.length; gestureIdx++) {
      this.emit("gesture", frame.gestures[gestureIdx], frame);
    }
  }
  this.emit('frame', frame);
}

Controller.prototype.setupConnectionEvents = function() {
  var controller = this;
  this.connection.on('frame', function(frame) {
    controller.processFrame(frame);
  });
  this.on(this.frameEventName, function(frame) {
    controller.processFinishedFrame(frame);
  });

  // Delegate connection events
  this.connection.on('disconnect', function() { controller.emit('disconnect'); });
  this.connection.on('ready', function() { controller.emit('ready'); });
  this.connection.on('connect', function() { controller.emit('connect'); });
  this.connection.on('focus', function() { controller.emit('focus') });
  this.connection.on('blur', function() { controller.emit('blur') });
  this.connection.on('protocol', function(protocol) { controller.emit('protocol', protocol); });
  this.connection.on('deviceConnect', function(evt) { controller.emit(evt.state ? 'deviceConnected' : 'deviceDisconnected'); });
}

_.extend(Controller.prototype, EventEmitter.prototype);

})(require("__browserify_process"))
},{"./circular_buffer":1,"./connection/browser":3,"./connection/node":4,"./frame":6,"./gesture":7,"./pipeline":11,"__browserify_process":18,"events":17,"underscore":20}],6:[function(require,module,exports){
var Hand = require("./hand")
  , Pointable = require("./pointable")
  , createGesture = require("./gesture").createGesture
  , glMatrix = require("gl-matrix")
  , mat3 = glMatrix.mat3
  , vec3 = glMatrix.vec3
  , InteractionBox = require("./interaction_box")
  , _ = require("underscore");

/**
 * Constructs a Frame object.
 *
 * Frame instances created with this constructor are invalid.
 * Get valid Frame objects by calling the
 * [Controller.frame]{@link Leap.Controller#frame}() function.
 *<C-D-Space>
 * @class Frame
 * @memberof Leap
 * @classdesc
 * The Frame class represents a set of hand and finger tracking data detected
 * in a single frame.
 *
 * The Leap detects hands, fingers and tools within the tracking area, reporting
 * their positions, orientations and motions in frames at the Leap frame rate.
 *
 * Access Frame objects using the [Controller.frame]{@link Leap.Controller#frame}() function.
 */
var Frame = module.exports = function(data) {
  /**
   * Reports whether this Frame instance is valid.
   *
   * A valid Frame is one generated by the Controller object that contains
   * tracking data for all detected entities. An invalid Frame contains no
   * actual tracking data, but you can call its functions without risk of a
   * undefined object exception. The invalid Frame mechanism makes it more
   * convenient to track individual data across the frame history. For example,
   * you can invoke:
   *
   * ```javascript
   * var finger = controller.frame(n).finger(fingerID);
   * ```
   *
   * for an arbitrary Frame history value, "n", without first checking whether
   * frame(n) returned a null object. (You should still check that the
   * returned Finger instance is valid.)
   *
   * @member valid
   * @memberof Leap.Frame.prototype
   * @type {Boolean}
   */
  this.valid = true;
  /**
   * A unique ID for this Frame. Consecutive frames processed by the Leap
   * have consecutive increasing values.
   * @member id
   * @memberof Leap.Frame.prototype
   * @type {String}
   */
  this.id = data.id;
  /**
   * The frame capture time in microseconds elapsed since the Leap started.
   * @member timestamp
   * @memberof Leap.Frame.prototype
   * @type {number}
   */
  this.timestamp = data.timestamp;
  /**
   * The list of Hand objects detected in this frame, given in arbitrary order.
   * The list can be empty if no hands are detected.
   *
   * @member hands[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Hand}
   */
  this.hands = [];
  this.handsMap = {};
  /**
   * The list of Pointable objects (fingers and tools) detected in this frame,
   * given in arbitrary order. The list can be empty if no fingers or tools are
   * detected.
   *
   * @member pointables[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.pointables = [];
  /**
   * The list of Tool objects detected in this frame, given in arbitrary order.
   * The list can be empty if no tools are detected.
   *
   * @member tools[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.tools = [];
  /**
   * The list of Finger objects detected in this frame, given in arbitrary order.
   * The list can be empty if no fingers are detected.
   * @member fingers[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.fingers = [];

  /**
   * The InteractionBox associated with the current frame.
   *
   * @member interactionBox
   * @memberof Leap.Frame.prototype
   * @type {Leap.InteractionBox}
   */
  if (data.interactionBox) {
    this.interactionBox = new InteractionBox(data.interactionBox);
  }
  this.gestures = [];
  this.pointablesMap = {};
  this._translation = data.t;
  this._rotation = _.flatten(data.r);
  this._scaleFactor = data.s;
  this.data = data;
  this.type = 'frame'; // used by event emitting
  this.currentFrameRate = data.currentFrameRate;
  var handMap = {};
  for (var handIdx = 0, handCount = data.hands.length; handIdx != handCount; handIdx++) {
    var hand = new Hand(data.hands[handIdx]);
    hand.frame = this;
    this.hands.push(hand);
    this.handsMap[hand.id] = hand;
    handMap[hand.id] = handIdx;
  }
  for (var pointableIdx = 0, pointableCount = data.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
    var pointable = new Pointable(data.pointables[pointableIdx]);
    pointable.frame = this;
    this.pointables.push(pointable);
    this.pointablesMap[pointable.id] = pointable;
    (pointable.tool ? this.tools : this.fingers).push(pointable);
    if (pointable.handId !== undefined && handMap.hasOwnProperty(pointable.handId)) {
      var hand = this.hands[handMap[pointable.handId]];
      hand.pointables.push(pointable);
      (pointable.tool ? hand.tools : hand.fingers).push(pointable);
    }
  }

  if (data.gestures) {
   /**
    * The list of Gesture objects detected in this frame, given in arbitrary order.
    * The list can be empty if no gestures are detected.
    *
    * Circle and swipe gestures are updated every frame. Tap gestures
    * only appear in the list for a single frame.
    * @member gestures[]
    * @memberof Leap.Frame.prototype
    * @type {Leap.Gesture}
    */
    for (var gestureIdx = 0, gestureCount = data.gestures.length; gestureIdx != gestureCount; gestureIdx++) {
      this.gestures.push(createGesture(data.gestures[gestureIdx]));
    }
  }
}

/**
 * The tool with the specified ID in this frame.
 *
 * Use the Frame tool() function to retrieve a tool from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no tool
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a tool is lost and subsequently
 * regained, the new Pointable object representing that tool may have a
 * different ID than that representing the tool in an earlier frame.
 *
 * @method tool
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Tool object from a previous frame.
 * @returns {Leap.Pointable} The tool with the
 * matching ID if one exists in this frame; otherwise, an invalid Pointable object
 * is returned.
 */
Frame.prototype.tool = function(id) {
  var pointable = this.pointable(id);
  return pointable.tool ? pointable : Pointable.Invalid;
}

/**
 * The Pointable object with the specified ID in this frame.
 *
 * Use the Frame pointable() function to retrieve the Pointable object from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no finger or tool
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a finger or tool is lost and subsequently
 * regained, the new Pointable object representing that finger or tool may have
 * a different ID than that representing the finger or tool in an earlier frame.
 *
 * @method pointable
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Pointable object from a previous frame.
 * @returns {Leap.Pointable} The Pointable object with
 * the matching ID if one exists in this frame;
 * otherwise, an invalid Pointable object is returned.
 */
Frame.prototype.pointable = function(id) {
  return this.pointablesMap[id] || Pointable.Invalid;
}

/**
 * The finger with the specified ID in this frame.
 *
 * Use the Frame finger() function to retrieve the finger from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Finger object, but if no finger
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a finger is lost and subsequently
 * regained, the new Pointable object representing that physical finger may have
 * a different ID than that representing the finger in an earlier frame.
 *
 * @method finger
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Leap.Pointable} The finger with the
 * matching ID if one exists in this frame; otherwise, an invalid Pointable
 * object is returned.
 */
Frame.prototype.finger = function(id) {
  var pointable = this.pointable(id);
  return !pointable.tool ? pointable : Pointable.Invalid;
}

/**
 * The Hand object with the specified ID in this frame.
 *
 * Use the Frame hand() function to retrieve the Hand object from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Hand object, but if no hand
 * with the specified ID is present, an invalid Hand object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a hand is lost and subsequently
 * regained, the new Hand object representing that physical hand may have
 * a different ID than that representing the physical hand in an earlier frame.
 *
 * @method hand
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Hand object from a previous frame.
 * @returns {Leap.Hand} The Hand object with the matching
 * ID if one exists in this frame; otherwise, an invalid Hand object is returned.
 */
Frame.prototype.hand = function(id) {
  return this.handsMap[id] || Hand.Invalid;
}

/**
 * The angle of rotation around the rotation axis derived from the overall
 * rotational motion between the current frame and the specified frame.
 *
 * The returned angle is expressed in radians measured clockwise around
 * the rotation axis (using the right-hand rule) between the start and end frames.
 * The value is always between 0 and pi radians (0 and 180 degrees).
 *
 * The Leap derives frame rotation from the relative change in position and
 * orientation of all objects detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, then the
 * angle of rotation is zero.
 *
 * @method rotationAngle
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @param {number[]} [axis] The axis to measure rotation around.
 * @returns {number} A positive value containing the heuristically determined
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationAngle = function(sinceFrame, axis) {
  if (!this.valid || !sinceFrame.valid) return 0.0;

  var rot = this.rotationMatrix(sinceFrame);
  var cs = (rot[0] + rot[4] + rot[8] - 1.0)*0.5
  var angle = Math.acos(cs);
  angle = isNaN(angle) ? 0.0 : angle;

  if (axis !== undefined) {
    var rotAxis = this.rotationAxis(sinceFrame);
    angle *= vec3.dot(rotAxis, vec3.normalize(vec3.create(), axis));
  }

  return angle;
}

/**
 * The axis of rotation derived from the overall rotational motion between
 * the current frame and the specified frame.
 *
 * The returned direction vector is normalized.
 *
 * The Leap derives frame rotation from the relative change in position and
 * orientation of all objects detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, or if no
 * rotation is detected between the two frames, a zero vector is returned.
 *
 * @method rotationAxis
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A normalized direction vector representing the axis of the heuristically determined
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationAxis = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  return vec3.normalize(vec3.create(), [
    this._rotation[7] - sinceFrame._rotation[5],
    this._rotation[2] - sinceFrame._rotation[6],
    this._rotation[3] - sinceFrame._rotation[1]
  ]);
}

/**
 * The transform matrix expressing the rotation derived from the overall
 * rotational motion between the current frame and the specified frame.
 *
 * The Leap derives frame rotation from the relative change in position and
 * orientation of all objects detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, then
 * this method returns an identity matrix.
 *
 * @method rotationMatrix
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A transformation matrix containing the heuristically determined
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationMatrix = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return mat3.create();
  var transpose = mat3.transpose(mat3.create(), this._rotation)
  return mat3.multiply(mat3.create(), sinceFrame._rotation, transpose);
}

/**
 * The scale factor derived from the overall motion between the current frame and the specified frame.
 *
 * The scale factor is always positive. A value of 1.0 indicates no scaling took place.
 * Values between 0.0 and 1.0 indicate contraction and values greater than 1.0 indicate expansion.
 *
 * The Leap derives scaling from the relative inward or outward motion of all
 * objects detected in the field of view (independent of translation and rotation).
 *
 * If either this frame or sinceFrame is an invalid Frame object, then this method returns 1.0.
 *
 * @method scaleFactor
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative scaling.
 * @returns {number} A positive value representing the heuristically determined
 * scaling change ratio between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.scaleFactor = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return 1.0;
  return Math.exp(this._scaleFactor - sinceFrame._scaleFactor);
}

/**
 * The change of position derived from the overall linear motion between the
 * current frame and the specified frame.
 *
 * The returned translation vector provides the magnitude and direction of the
 * movement in millimeters.
 *
 * The Leap derives frame translation from the linear motion of all objects
 * detected in the field of view.
 *
 * If either this frame or sinceFrame is an invalid Frame object, then this
 * method returns a zero vector.
 *
 * @method translation
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {number[]} A vector representing the heuristically determined change in
 * position of all objects between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.translation = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  return vec3.subtract(vec3.create(), this._translation, sinceFrame._translation);
}

/**
 * A string containing a brief, human readable description of the Frame object.
 *
 * @method toString
 * @memberof Leap.Frame.prototype
 * @returns {String} A brief description of this frame.
 */
Frame.prototype.toString = function() {
  var str = "Frame [ id:"+this.id+" | timestamp:"+this.timestamp+" | Hand count:("+this.hands.length+") | Pointable count:("+this.pointables.length+")";
  if (this.gestures) str += " | Gesture count:("+this.gestures.length+")";
  str += " ]";
  return str;
}

/**
 * Returns a JSON-formatted string containing the hands, pointables and gestures
 * in this frame.
 *
 * @method dump
 * @memberof Leap.Frame.prototype
 * @returns {String} A JSON-formatted string.
 */
Frame.prototype.dump = function() {
  var out = '';
  out += "Frame Info:<br/>";
  out += this.toString();
  out += "<br/><br/>Hands:<br/>"
  for (var handIdx = 0, handCount = this.hands.length; handIdx != handCount; handIdx++) {
    out += "  "+ this.hands[handIdx].toString() + "<br/>";
  }
  out += "<br/><br/>Pointables:<br/>";
  for (var pointableIdx = 0, pointableCount = this.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
      out += "  "+ this.pointables[pointableIdx].toString() + "<br/>";
  }
  if (this.gestures) {
    out += "<br/><br/>Gestures:<br/>";
    for (var gestureIdx = 0, gestureCount = this.gestures.length; gestureIdx != gestureCount; gestureIdx++) {
        out += "  "+ this.gestures[gestureIdx].toString() + "<br/>";
    }
  }
  out += "<br/><br/>Raw JSON:<br/>";
  out += JSON.stringify(this.data);
  return out;
}

/**
 * An invalid Frame object.
 *
 * You can use this invalid Frame in comparisons testing
 * whether a given Frame instance is valid or invalid. (You can also check the
 * [Frame.valid]{@link Leap.Frame#valid} property.)
 *
 * @static
 * @type {Leap.Frame}
 * @name Invalid
 * @memberof Leap.Frame
 */
Frame.Invalid = {
  valid: false,
  hands: [],
  fingers: [],
  tools: [],
  gestures: [],
  pointables: [],
  pointable: function() { return Pointable.Invalid },
  finger: function() { return Pointable.Invalid },
  hand: function() { return Hand.Invalid },
  toString: function() { return "invalid frame" },
  dump: function() { return this.toString() },
  rotationAngle: function() { return 0.0; },
  rotationMatrix: function() { return mat3.create(); },
  rotationAxis: function() { return vec3.create(); },
  scaleFactor: function() { return 1.0; },
  translation: function() { return vec3.create(); }
};

},{"./gesture":7,"./hand":8,"./interaction_box":10,"./pointable":12,"gl-matrix":19,"underscore":20}],7:[function(require,module,exports){
var glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

/**
 * Constructs a new Gesture object.
 *
 * An uninitialized Gesture object is considered invalid. Get valid instances
 * of the Gesture class, which will be one of the Gesture subclasses, from a
 * Frame object.
 *
 * @class Gesture
 * @abstract
 * @memberof Leap
 * @classdesc
 * The Gesture class represents a recognized movement by the user.
 *
 * The Leap watches the activity within its field of view for certain movement
 * patterns typical of a user gesture or command. For example, a movement from side to
 * side with the hand can indicate a swipe gesture, while a finger poking forward
 * can indicate a screen tap gesture.
 *
 * When the Leap recognizes a gesture, it assigns an ID and adds a
 * Gesture object to the frame gesture list. For continuous gestures, which
 * occur over many frames, the Leap updates the gesture by adding
 * a Gesture object having the same ID and updated properties in each
 * subsequent frame.
 *
 * **Important:** Recognition for each type of gesture must be enabled;
 * otherwise **no gestures are recognized or reported**.
 *
 * Subclasses of Gesture define the properties for the specific movement patterns
 * recognized by the Leap.
 *
 * The Gesture subclasses for include:
 *
 * * CircleGesture -- A circular movement by a finger.
 * * SwipeGesture -- A straight line movement by the hand with fingers extended.
 * * ScreenTapGesture -- A forward tapping movement by a finger.
 * * KeyTapGesture -- A downward tapping movement by a finger.
 *
 * Circle and swipe gestures are continuous and these objects can have a
 * state of start, update, and stop.
 *
 * The screen tap gesture is a discrete gesture. The Leap only creates a single
 * ScreenTapGesture object appears for each tap and it always has a stop state.
 *
 * Get valid Gesture instances from a Frame object. You can get a list of gestures
 * from the Frame gestures array. You can also use the Frame gesture() method
 * to find a gesture in the current frame using an ID value obtained in a
 * previous frame.
 *
 * Gesture objects can be invalid. For example, when you get a gesture by ID
 * using Frame.gesture(), and there is no gesture with that ID in the current
 * frame, then gesture() returns an Invalid Gesture object (rather than a null
 * value). Always check object validity in situations where a gesture might be
 * invalid.
 */
var createGesture = exports.createGesture = function(data) {
  var gesture;
  switch (data.type) {
    case 'circle':
      gesture = new CircleGesture(data);
      break;
    case 'swipe':
      gesture = new SwipeGesture(data);
      break;
    case 'screenTap':
      gesture = new ScreenTapGesture(data);
      break;
    case 'keyTap':
      gesture = new KeyTapGesture(data);
      break;
    default:
      throw "unkown gesture type";
  }
 /**
  * The gesture ID.
  *
  * All Gesture objects belonging to the same recognized movement share the
  * same ID value. Use the ID value with the Frame::gesture() method to
  * find updates related to this Gesture object in subsequent frames.
  *
  * @member id
  * @memberof Leap.Gesture.prototype
  * @type {number}
  */
  gesture.id = data.id;
 /**
  * The list of hands associated with this Gesture, if any.
  *
  * If no hands are related to this gesture, the list is empty.
  *
  * @member handIds
  * @memberof Leap.Gesture.prototype
  * @type {Array}
  */
  gesture.handIds = data.handIds;
 /**
  * The list of fingers and tools associated with this Gesture, if any.
  *
  * If no Pointable objects are related to this gesture, the list is empty.
  *
  * @member pointableIds
  * @memberof Leap.Gesture.prototype
  * @type {Array}
  */
  gesture.pointableIds = data.pointableIds;
 /**
  * The elapsed duration of the recognized movement up to the
  * frame containing this Gesture object, in microseconds.
  *
  * The duration reported for the first Gesture in the sequence (with the
  * start state) will typically be a small positive number since
  * the movement must progress far enough for the Leap to recognize it as
  * an intentional gesture.
  *
  * @member duration
  * @memberof Leap.Gesture.prototype
  * @type {number}
  */
  gesture.duration = data.duration;
 /**
  * The gesture ID.
  *
  * Recognized movements occur over time and have a beginning, a middle,
  * and an end. The 'state()' attribute reports where in that sequence this
  * Gesture object falls.
  *
  * Possible values for the state field are:
  *
  * * start
  * * update
  * * stop
  *
  * @member state
  * @memberof Leap.Gesture.prototype
  * @type {String}
  */
  gesture.state = data.state;
 /**
  * The gesture type.
  *
  * Possible values for the type field are:
  *
  * * circle
  * * swipe
  * * screenTap
  * * keyTap
  *
  * @member type
  * @memberof Leap.Gesture.prototype
  * @type {String}
  */
  gesture.type = data.type;
  return gesture;
}

var gestureListener = exports.gestureListener = function(controller, type) {
  var handlers = {};
  var gestureMap = {};

  var gestureCreator = function() {
    var candidateGesture = gestureMap[gesture.id];
    if (candidateGesture !== undefined) gesture.update(gesture, frame);
    if (gesture.state == "start" || gesture.state == "stop") {
      if (type == gesture.type && gestureMap[gesture.id] === undefined) {
        gestureMap[gesture.id] = new Gesture(gesture, frame);
        gesture.update(gesture, frame);
      }
      if (gesture.state == "stop") {
        delete gestureMap[gesture.id];
      }
    }
  };

  controller.on('gesture', function(gesture, frame) {
    if (gesture.type == type) {
      if (gesture.state == "start" || gesture.state == "stop") {
        if (gestureMap[gesture.id] === undefined) {
          var gestureTracker = new Gesture(gesture, frame);
          gestureMap[gesture.id] = gestureTracker;
          _.each(handlers, function(cb, name) {
            gestureTracker.on(name, cb);
          });
        }
      }
      gestureMap[gesture.id].update(gesture, frame);
      if (gesture.state == "stop") {
        delete gestureMap[gesture.id];
      }
    }
  });
  var builder = {
    start: function(cb) {
      handlers['start'] = cb;
      return builder;
    },
    stop: function(cb) {
      handlers['stop'] = cb;
      return builder;
    },
    complete: function(cb) {
      handlers['stop'] = cb;
      return builder;
    },
    update: function(cb) {
      handlers['update'] = cb;
      return builder;
    }
  }
  return builder;
}

var Gesture = exports.Gesture = function(gesture, frame) {
  this.gestures = [gesture];
  this.frames = [frame];
}

Gesture.prototype.update = function(gesture, frame) {
  this.lastGesture = gesture;
  this.lastFrame = frame;
  this.gestures.push(gesture);
  this.frames.push(frame);
  this.emit(gesture.state, this);
}

Gesture.prototype.translation = function() {
  return vec3.subtract(vec3.create(), this.lastGesture.startPosition, this.lastGesture.position);
}

_.extend(Gesture.prototype, EventEmitter.prototype);

/**
 * Constructs a new CircleGesture object.
 *
 * An uninitialized CircleGesture object is considered invalid. Get valid instances
 * of the CircleGesture class from a Frame object.
 *
 * @class CircleGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The CircleGesture classes represents a circular finger movement.
 *
 * A circle movement is recognized when the tip of a finger draws a circle
 * within the Leap field of view.
 *
 * ![CircleGesture](images/Leap_Gesture_Circle.png)
 *
 * Circle gestures are continuous. The CircleGesture objects for the gesture have
 * three possible states:
 *
 * * start -- The circle gesture has just started. The movement has
 *  progressed far enough for the recognizer to classify it as a circle.
 * * update -- The circle gesture is continuing.
 * * stop -- The circle gesture is finished.
 */
var CircleGesture = function(data) {
 /**
  * The center point of the circle within the Leap frame of reference.
  *
  * @member center
  * @memberof Leap.CircleGesture.prototype
  * @type {number[]}
  */
  this.center = data.center;
 /**
  * The normal vector for the circle being traced.
  *
  * If you draw the circle clockwise, the normal vector points in the same
  * general direction as the pointable object drawing the circle. If you draw
  * the circle counterclockwise, the normal points back toward the
  * pointable. If the angle between the normal and the pointable object
  * drawing the circle is less than 90 degrees, then the circle is clockwise.
  *
  * ```javascript
  *    var clockwiseness;
  *    if (circle.pointable.direction.angleTo(circle.normal) <= PI/4) {
  *        clockwiseness = "clockwise";
  *    }
  *    else
  *    {
  *        clockwiseness = "counterclockwise";
  *    }
  * ```
  *
  * @member normal
  * @memberof Leap.CircleGesture.prototype
  * @type {number[]}
  */
  this.normal = data.normal;
 /**
  * The number of times the finger tip has traversed the circle.
  *
  * Progress is reported as a positive number of the number. For example,
  * a progress value of .5 indicates that the finger has gone halfway
  * around, while a value of 3 indicates that the finger has gone around
  * the the circle three times.
  *
  * Progress starts where the circle gesture began. Since the circle
  * must be partially formed before the Leap can recognize it, progress
  * will be greater than zero when a circle gesture first appears in the
  * frame.
  *
  * @member progress
  * @memberof Leap.CircleGesture.prototype
  * @type {number}
  */
  this.progress = data.progress;
 /**
  * The radius of the circle in mm.
  *
  * @member radius
  * @memberof Leap.CircleGesture.prototype
  * @type {number}
  */
  this.radius = data.radius;
}

CircleGesture.prototype.toString = function() {
  return "CircleGesture ["+JSON.stringify(this)+"]";
}

/**
 * Constructs a new SwipeGesture object.
 *
 * An uninitialized SwipeGesture object is considered invalid. Get valid instances
 * of the SwipeGesture class from a Frame object.
 *
 * @class SwipeGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The SwipeGesture class represents a swiping motion of a finger or tool.
 *
 * ![SwipeGesture](images/Leap_Gesture_Swipe.png)
 *
 * Swipe gestures are continuous.
 */
var SwipeGesture = function(data) {
 /**
  * The starting position within the Leap frame of
  * reference, in mm.
  *
  * @member startPosition
  * @memberof Leap.SwipeGesture.prototype
  * @type {number[]}
  */
  this.startPosition = data.startPosition;
 /**
  * The current swipe position within the Leap frame of
  * reference, in mm.
  *
  * @member position
  * @memberof Leap.SwipeGesture.prototype
  * @type {number[]}
  */
  this.position = data.position;
 /**
  * The unit direction vector parallel to the swipe motion.
  *
  * You can compare the components of the vector to classify the swipe as
  * appropriate for your application. For example, if you are using swipes
  * for two dimensional scrolling, you can compare the x and y values to
  * determine if the swipe is primarily horizontal or vertical.
  *
  * @member direction
  * @memberof Leap.SwipeGesture.prototype
  * @type {number[]}
  */
  this.direction = data.direction;
 /**
  * The speed of the finger performing the swipe gesture in
  * millimeters per second.
  *
  * @member speed
  * @memberof Leap.SwipeGesture.prototype
  * @type {number}
  */
  this.speed = data.speed;
}

SwipeGesture.prototype.toString = function() {
  return "SwipeGesture ["+JSON.stringify(this)+"]";
}

/**
 * Constructs a new ScreenTapGesture object.
 *
 * An uninitialized ScreenTapGesture object is considered invalid. Get valid instances
 * of the ScreenTapGesture class from a Frame object.
 *
 * @class ScreenTapGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The ScreenTapGesture class represents a tapping gesture by a finger or tool.
 *
 * A screen tap gesture is recognized when the tip of a finger pokes forward
 * and then springs back to approximately the original postion, as if
 * tapping a vertical screen. The tapping finger must pause briefly before beginning the tap.
 *
 * ![ScreenTap](images/Leap_Gesture_Tap2.png)
 *
 * ScreenTap gestures are discrete. The ScreenTapGesture object representing a tap always
 * has the state, STATE_STOP. Only one ScreenTapGesture object is created for each
 * screen tap gesture recognized.
 */
var ScreenTapGesture = function(data) {
 /**
  * The position where the screen tap is registered.
  *
  * @member position
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {number[]}
  */
  this.position = data.position;
 /**
  * The direction of finger tip motion.
  *
  * @member direction
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {number[]}
  */
  this.direction = data.direction;
 /**
  * The progess value is always 1.0 for a screen tap gesture.
  *
  * @member progress
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {number}
  */
  this.progress = data.progress;
}

ScreenTapGesture.prototype.toString = function() {
  return "ScreenTapGesture ["+JSON.stringify(this)+"]";
}

/**
 * Constructs a new KeyTapGesture object.
 *
 * An uninitialized KeyTapGesture object is considered invalid. Get valid instances
 * of the KeyTapGesture class from a Frame object.
 *
 * @class KeyTapGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The KeyTapGesture class represents a tapping gesture by a finger or tool.
 *
 * A key tap gesture is recognized when the tip of a finger rotates down toward the
 * palm and then springs back to approximately the original postion, as if
 * tapping. The tapping finger must pause briefly before beginning the tap.
 *
 * ![KeyTap](images/Leap_Gesture_Tap.png)
 *
 * Key tap gestures are discrete. The KeyTapGesture object representing a tap always
 * has the state, STATE_STOP. Only one KeyTapGesture object is created for each
 * key tap gesture recognized.
 */
var KeyTapGesture = function(data) {
    /**
     * The position where the key tap is registered.
     *
     * @member position
     * @memberof Leap.KeyTapGesture.prototype
     * @type {number[]}
     */
    this.position = data.position;
    /**
     * The direction of finger tip motion.
     *
     * @member direction
     * @memberof Leap.KeyTapGesture.prototype
     * @type {number[]}
     */
    this.direction = data.direction;
    /**
     * The progess value is always 1.0 for a key tap gesture.
     *
     * @member progress
     * @memberof Leap.KeyTapGesture.prototype
     * @type {number}
     */
    this.progress = data.progress;
}

KeyTapGesture.prototype.toString = function() {
  return "KeyTapGesture ["+JSON.stringify(this)+"]";
}

},{"events":17,"gl-matrix":19,"underscore":20}],8:[function(require,module,exports){
var Pointable = require("./pointable")
  , glMatrix = require("gl-matrix")
  , mat3 = glMatrix.mat3
  , vec3 = glMatrix.vec3
  , _ = require("underscore");

/**
 * Constructs a Hand object.
 *
 * An uninitialized hand is considered invalid.
 * Get valid Hand objects from a Frame object.
 * @class Hand
 * @memberof Leap
 * @classdesc
 * The Hand class reports the physical characteristics of a detected hand.
 *
 * Hand tracking data includes a palm position and velocity; vectors for
 * the palm normal and direction to the fingers; properties of a sphere fit
 * to the hand; and lists of the attached fingers and tools.
 *
 * Note that Hand objects can be invalid, which means that they do not contain
 * valid tracking data and do not correspond to a physical entity. Invalid Hand
 * objects can be the result of asking for a Hand object using an ID from an
 * earlier frame when no Hand objects with that ID exist in the current frame.
 * A Hand object created from the Hand constructor is also invalid.
 * Test for validity with the [Hand.valid]{@link Leap.Hand#valid} property.
 */
var Hand = module.exports = function(data) {
  /**
   * A unique ID assigned to this Hand object, whose value remains the same
   * across consecutive frames while the tracked hand remains visible. If
   * tracking is lost (for example, when a hand is occluded by another hand
   * or when it is withdrawn from or reaches the edge of the Leap field of view),
   * the Leap may assign a new ID when it detects the hand in a future frame.
   *
   * Use the ID value with the {@link Frame.hand}() function to find this
   * Hand object in future frames.
   *
   * @member id
   * @memberof Leap.Hand.prototype
   * @type {String}
   */
  this.id = data.id;
  /**
   * The center position of the palm in millimeters from the Leap origin.
   * @member palmPosition
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.palmPosition = data.palmPosition;
  /**
   * The direction from the palm position toward the fingers.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the directed line from the palm position to the fingers.
   *
   * @member direction
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.direction = data.direction;
  /**
   * The rate of change of the palm position in millimeters/second.
   *
   * @member palmVeclocity
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.palmVelocity = data.palmVelocity;
  /**
   * The normal vector to the palm. If your hand is flat, this vector will
   * point downward, or "out" of the front surface of your palm.
   *
   * ![Palm Vectors](images/Leap_Palm_Vectors.png)
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the palm normal (that is, a vector orthogonal to the palm).
   * @member palmNormal
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.palmNormal = data.palmNormal;
  /**
   * The center of a sphere fit to the curvature of this hand.
   *
   * This sphere is placed roughly as if the hand were holding a ball.
   *
   * ![Hand Ball](images/Leap_Hand_Ball.png)
   * @member sphereCenter
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
  this.sphereCenter = data.sphereCenter;
  /**
   * The radius of a sphere fit to the curvature of this hand, in millimeters.
   *
   * This sphere is placed roughly as if the hand were holding a ball. Thus the
   * size of the sphere decreases as the fingers are curled into a fist.
   *
   * @member sphereRadius
   * @memberof Leap.Hand.prototype
   * @type {number}
   */
  this.sphereRadius = data.sphereRadius;
  /**
   * Reports whether this is a valid Hand object.
   *
   * @member valid
   * @memberof Leap.Hand.prototype
   * @type {boolean}
   */
  this.valid = true;
  /**
   * The list of Pointable objects (fingers and tools) detected in this frame
   * that are associated with this hand, given in arbitrary order. The list
   * can be empty if no fingers or tools associated with this hand are detected.
   *
   * Use the {@link Pointable} tool property to determine
   * whether or not an item in the list represents a tool or finger.
   * You can also get only the tools using the Hand.tools[] list or
   * only the fingers using the Hand.fingers[] list.
   *
   * @member pointables[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable[]}
   */
  this.pointables = [];
  /**
   * The list of fingers detected in this frame that are attached to
   * this hand, given in arbitrary order.
   *
   * The list can be empty if no fingers attached to this hand are detected.
   *
   * @member fingers[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable[]}
   */
  this.fingers = [];
  /**
   * The list of tools detected in this frame that are held by this
   * hand, given in arbitrary order.
   *
   * The list can be empty if no tools held by this hand are detected.
   *
   * @member tools[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable[]}
   */
  this.tools = [];
  this._translation = data.t;
  this._rotation = _.flatten(data.r);
  this._scaleFactor = data.s;

  /**
   * Time the hand has been visible in seconds.
   *
   * @member timeVisible
   * @memberof Leap.Hand.prototype
   * @type {number}
   */
   this.timeVisible = data.timeVisible;

  /**
   * The palm position with stabalization
   * @member stabilizedPalmPosition
   * @memberof Leap.Hand.prototype
   * @type {number[]}
   */
   this.stabilizedPalmPosition = data.stabilizedPalmPosition;
}

/**
 * The finger with the specified ID attached to this hand.
 *
 * Use this function to retrieve a Pointable object representing a finger
 * attached to this hand using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no finger
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that the ID values assigned to fingers persist across frames, but only
 * until tracking of a particular finger is lost. If tracking of a finger is
 * lost and subsequently regained, the new Finger object representing that
 * finger may have a different ID than that representing the finger in an
 * earlier frame.
 *
 * @method finger
 * @memberof Leap.Hand.prototype
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Leap.Pointable} The Finger object with
 * the matching ID if one exists for this hand in this frame; otherwise, an
 * invalid Finger object is returned.
 */
Hand.prototype.finger = function(id) {
  var finger = this.frame.finger(id);
  return (finger && finger.handId == this.id) ? finger : Pointable.Invalid;
}

/**
 * The angle of rotation around the rotation axis derived from the change in
 * orientation of this hand, and any associated fingers and tools, between the
 * current frame and the specified frame.
 *
 * The returned angle is expressed in radians measured clockwise around the
 * rotation axis (using the right-hand rule) between the start and end frames.
 * The value is always between 0 and pi radians (0 and 180 degrees).
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either
 * this frame or sinceFrame are invalid Frame objects, then the angle of rotation is zero.
 *
 * @method rotationAngle
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @param {numnber[]} [axis] The axis to measure rotation around.
 * @returns {number} A positive value representing the heuristically determined
 * rotational change of the hand between the current frame and that specified in
 * the sinceFrame parameter.
 */
Hand.prototype.rotationAngle = function(sinceFrame, axis) {
  if (!this.valid || !sinceFrame.valid) return 0.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 0.0;
  var rot = this.rotationMatrix(sinceFrame);
  var cs = (rot[0] + rot[4] + rot[8] - 1.0)*0.5
  var angle = Math.acos(cs);
  angle = isNaN(angle) ? 0.0 : angle;
  if (axis !== undefined) {
    var rotAxis = this.rotationAxis(sinceFrame);
    angle *= vec3.dot(rotAxis, vec3.normalize(vec3.create(), axis));
  }
  return angle;
}

/**
 * The axis of rotation derived from the change in orientation of this hand, and
 * any associated fingers and tools, between the current frame and the specified frame.
 *
 * The returned direction vector is normalized.
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either
 * this frame or sinceFrame are invalid Frame objects, then this method returns a zero vector.
 *
 * @method rotationAxis
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A normalized direction Vector representing the axis of the heuristically determined
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationAxis = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  var sinceHand = sinceFrame.hand(this.id);
  if (!sinceHand.valid) return vec3.create();
  return vec3.normalize(vec3.create(), [
    this._rotation[7] - sinceHand._rotation[5],
    this._rotation[2] - sinceHand._rotation[6],
    this._rotation[3] - sinceHand._rotation[1]
  ]);
}

/**
 * The transform matrix expressing the rotation derived from the change in
 * orientation of this hand, and any associated fingers and tools, between
 * the current frame and the specified frame.
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either
 * this frame or sinceFrame are invalid Frame objects, then this method returns
 * an identity matrix.
 *
 * @method rotationMatrix
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {number[]} A transformation Matrix containing the heuristically determined
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationMatrix = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return mat3.create();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return mat3.create();
  var transpose = mat3.transpose(mat3.create(), this._rotation);
  var m = mat3.multiply(mat3.create(), sinceHand._rotation, transpose);
  return m;
}

/**
 * The scale factor derived from the hand's motion between the current frame and the specified frame.
 *
 * The scale factor is always positive. A value of 1.0 indicates no scaling took place.
 * Values between 0.0 and 1.0 indicate contraction and values greater than 1.0 indicate expansion.
 *
 * The Leap derives scaling from the relative inward or outward motion of a hand
 * and its associated fingers and tools (independent of translation and rotation).
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or sinceFrame
 * are invalid Frame objects, then this method returns 1.0.
 *
 * @method scaleFactor
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative scaling.
 * @returns {number} A positive value representing the heuristically determined
 * scaling change ratio of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.scaleFactor = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return 1.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 1.0;

  return Math.exp(this._scaleFactor - sinceHand._scaleFactor);
}

/**
 * The change of position of this hand between the current frame and the specified frame
 *
 * The returned translation vector provides the magnitude and direction of the
 * movement in millimeters.
 *
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or
 * sinceFrame are invalid Frame objects, then this method returns a zero vector.
 *
 * @method translation
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {number[]} A Vector representing the heuristically determined change in hand
 * position between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.translation = function(sinceFrame) {
  if (!this.valid || !sinceFrame.valid) return vec3.create();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return vec3.create();
  return [
    this._translation[0] - sinceHand._translation[0],
    this._translation[1] - sinceHand._translation[1],
    this._translation[2] - sinceHand._translation[2]
  ];
}

/**
 * A string containing a brief, human readable description of the Hand object.
 * @method toString
 * @memberof Leap.Hand.prototype
 * @returns {String} A description of the Hand as a string.
 */
Hand.prototype.toString = function() {
  return "Hand [ id: "+ this.id + " | palm velocity:"+this.palmVelocity+" | sphere center:"+this.sphereCenter+" ] ";
}

/**
 * The pitch angle in radians.
 *
 * Pitch is the angle between the negative z-axis and the projection of
 * the vector onto the y-z plane. In other words, pitch represents rotation
 * around the x-axis.
 * If the vector points upward, the returned angle is between 0 and pi radians
 * (180 degrees); if it points downward, the angle is between 0 and -pi radians.
 *
 * @method pitch
 * @memberof Leap.Hand.prototype
 * @returns {number} The angle of this vector above or below the horizon (x-z plane).
 *
 */
Hand.prototype.pitch = function() {
  return Math.atan2(this.direction[1], -this.direction[2]);
}

/**
 *  The yaw angle in radians.
 *
 * Yaw is the angle between the negative z-axis and the projection of
 * the vector onto the x-z plane. In other words, yaw represents rotation
 * around the y-axis. If the vector points to the right of the negative z-axis,
 * then the returned angle is between 0 and pi radians (180 degrees);
 * if it points to the left, the angle is between 0 and -pi radians.
 *
 * @method yaw
 * @memberof Leap.Hand.prototype
 * @returns {number} The angle of this vector to the right or left of the y-axis.
 *
 */
Hand.prototype.yaw = function() {
  return Math.atan2(this.direction[0], -this.direction[2]);
}

/**
 *  The roll angle in radians.
 *
 * Roll is the angle between the y-axis and the projection of
 * the vector onto the x-y plane. In other words, roll represents rotation
 * around the z-axis. If the vector points to the left of the y-axis,
 * then the returned angle is between 0 and pi radians (180 degrees);
 * if it points to the right, the angle is between 0 and -pi radians.
 *
 * @method roll
 * @memberof Leap.Hand.prototype
 * @returns {number} The angle of this vector to the right or left of the y-axis.
 *
 */
Hand.prototype.roll = function() {
  return Math.atan2(this.palmNormal[0], -this.palmNormal[1]);
}

/**
 * An invalid Hand object.
 *
 * You can use an invalid Hand object in comparisons testing
 * whether a given Hand instance is valid or invalid. (You can also use the
 * Hand valid property.)
 *
 * @static
 * @type {Leap.Hand}
 * @name Invalid
 * @memberof Leap.Hand
 */
Hand.Invalid = {
  valid: false,
  fingers: [],
  tools: [],
  pointables: [],
  pointable: function() { return Pointable.Invalid },
  finger: function() { return Pointable.Invalid },
  toString: function() { return "invalid frame" },
  dump: function() { return this.toString(); },
  rotationAngle: function() { return 0.0; },
  rotationMatrix: function() { return mat3.create(); },
  rotationAxis: function() { return vec3.create(); },
  scaleFactor: function() { return 1.0; },
  translation: function() { return vec3.create(); }
};

},{"./pointable":12,"gl-matrix":19,"underscore":20}],9:[function(require,module,exports){
(function(){/**
 * Leap is the global namespace of the Leap API.
 * @namespace Leap
 */
module.exports = {
  Controller: require("./controller"),
  Frame: require("./frame"),
  Gesture: require("./gesture"),
  Hand: require("./hand"),
  Pointable: require("./pointable"),
  InteractionBox: require("./interaction_box"),
  CircularBuffer: require("./circular_buffer"),
  UI: require("./ui"),
  glMatrix: require("gl-matrix"),
  mat3: require("gl-matrix").mat3,
  vec3: require("gl-matrix").vec3,
  loopController: undefined,
  /**
   * The Leap.loop() function passes a frame of Leap data to your
   * callback function and then calls window.requestAnimationFrame() after
   * executing your callback function.
   *
   * Leap.loop() sets up the Leap controller and WebSocket connection for you.
   * You do not need to create your own controller when using this method.
   *
   * Your callback function is called on an interval determined by the client
   * browser. Typically, this is on an interval of 60 frames/second. The most
   * recent frame of Leap data is passed to your callback function. If the Leap
   * is producing frames at a slower rate than the browser frame rate, the same
   * frame of Leap data can be passed to your function in successive animation
   * updates.
   *
   * As an alternative, you can create your own Controller object and use a
   * {@link Controller#onFrame onFrame} callback to process the data at
   * the frame rate of the Leap device. See {@link Controller} for an
   * example.
   *
   * @method Leap.loop
   * @param {function} callback A function called when the browser is ready to
   * draw to the screen. The most recent {@link Frame} object is passed to
   * your callback function.
   *
   * ```javascript
   *    Leap.loop( function( frame ) {
   *        // ... your code here
   *    })
   * ```
   */
  loop: function(opts, callback) {
    if (callback === undefined) {
      callback = opts;
      opts = {};
    }
    if (!this.loopController) this.loopController = new this.Controller(opts);
    this.loopController.loop(callback);
    return this.loopController;
  }
}

})()
},{"./circular_buffer":1,"./controller":5,"./frame":6,"./gesture":7,"./hand":8,"./interaction_box":10,"./pointable":12,"./ui":14,"gl-matrix":19}],10:[function(require,module,exports){
var glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3;

/**
 * Constructs a InteractionBox object.
 *
 * @class InteractionBox
 * @memberof Leap
 * @classdesc
 * The InteractionBox class represents a box-shaped region completely within
 * the field of view of the Leap Motion controller.
 *
 * The interaction box is an axis-aligned rectangular prism and provides
 * normalized coordinates for hands, fingers, and tools within this box.
 * The InteractionBox class can make it easier to map positions in the
 * Leap Motion coordinate system to 2D or 3D coordinate systems used
 * for application drawing.
 *
 * ![Interaction Box](images/Leap_InteractionBox.png)
 *
 * The InteractionBox region is defined by a center and dimensions along the x, y, and z axes.
 */
var InteractionBox = module.exports = function(data) {
  /**
   * Indicates whether this is a valid InteractionBox object.
   *
   * @member valid
   * @type {Boolean}
   * @memberof Leap.InteractionBox.prototype
   */
  this.valid = true;
  /**
   * The center of the InteractionBox in device coordinates (millimeters).
   * This point is equidistant from all sides of the box.
   *
   * @member center
   * @type {number[]}
   * @memberof Leap.InteractionBox.prototype
   */
  this.center = data.center;

  this.size = data.size;
  /**
   * The width of the InteractionBox in millimeters, measured along the x-axis.
   *
   * @member width
   * @type {number}
   * @memberof Leap.InteractionBox.prototype
   */
  this.width = data.size[0];
  /**
   * The height of the InteractionBox in millimeters, measured along the y-axis.
   *
   * @member height
   * @type {number}
   * @memberof Leap.InteractionBox.prototype
   */
  this.height = data.size[1];
  /**
   * The depth of the InteractionBox in millimeters, measured along the z-axis.
   *
   * @member depth
   * @type {number}
   * @memberof Leap.InteractionBox.prototype
   */
  this.depth = data.size[2];
}

/**
 * Converts a position defined by normalized InteractionBox coordinates
 * into device coordinates in millimeters.
 *
 * This function performs the inverse of normalizePoint().
 *
 * @method denormalizePoint
 * @memberof Leap.InteractionBox.prototype
 * @param {number[]} normalizedPosition The input position in InteractionBox coordinates.
 * @returns {number[]} The corresponding denormalized position in device coordinates.
 */
InteractionBox.prototype.denormalizePoint = function(normalizedPosition) {
  return vec3.fromValues(
    (normalizedPosition[0] - 0.5) * this.size[0] + this.center[0],
    (normalizedPosition[1] - 0.5) * this.size[1] + this.center[1],
    (normalizedPosition[2] - 0.5) * this.size[2] + this.center[2]
  );
}

/**
 * Normalizes the coordinates of a point using the interaction box.
 *
 * Coordinates from the Leap Motion frame of reference (millimeters) are
 * converted to a range of [0..1] such that the minimum value of the
 * InteractionBox maps to 0 and the maximum value of the InteractionBox maps to 1.
 *
 * @method normalizePoint
 * @memberof Leap.InteractionBox.prototype
 * @param {number[]} position The input position in device coordinates.
 * @param {Boolean} clamp Whether or not to limit the output value to the range [0,1]
 * when the input position is outside the InteractionBox. Defaults to true.
 * @returns {number[]} The normalized position.
 */
InteractionBox.prototype.normalizePoint = function(position, clamp) {
  var vec = vec3.fromValues(
    ((position[0] - this.center[0]) / this.size[0]) + 0.5,
    ((position[1] - this.center[1]) / this.size[1]) + 0.5,
    ((position[2] - this.center[2]) / this.size[2]) + 0.5
  );

  if (clamp) {
    vec[0] = Math.min(Math.max(vec[0], 0), 1);
    vec[1] = Math.min(Math.max(vec[1], 0), 1);
    vec[2] = Math.min(Math.max(vec[2], 0), 1);
  }
  return vec;
}

/**
 * Writes a brief, human readable description of the InteractionBox object.
 *
 * @method toString
 * @memberof Leap.InteractionBox.prototype
 * @returns {String} A description of the InteractionBox object as a string.
 */
InteractionBox.prototype.toString = function() {
  return "InteractionBox [ width:" + this.width + " | height:" + this.height + " | depth:" + this.depth + " ]";
}

/**
 * An invalid InteractionBox object.
 *
 * You can use this InteractionBox instance in comparisons testing
 * whether a given InteractionBox instance is valid or invalid. (You can also use the
 * InteractionBox.valid property.)
 *
 * @static
 * @type {Leap.InteractionBox}
 * @name Invalid
 * @memberof Leap.InteractionBox
 */
InteractionBox.Invalid = { valid: false };

},{"gl-matrix":19}],11:[function(require,module,exports){
var Pipeline = module.exports = function() {
  this.steps = [];
}

Pipeline.prototype.addStep = function(step) {
  this.steps.push(step);
}

Pipeline.prototype.run = function(frame) {
  var stepsLength = this.steps.length;
  for (var i = 0; i != stepsLength; i++) {
    if (!frame) break;
    frame = this.steps[i](frame);
  }
  return frame;
}

},{}],12:[function(require,module,exports){
var glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3;

/**
 * Constructs a Pointable object.
 *
 * An uninitialized pointable is considered invalid.
 * Get valid Pointable objects from a Frame or a Hand object.
 *
 * @class Pointable
 * @memberof Leap
 * @classdesc
 * The Pointable class reports the physical characteristics of a detected
 * finger or tool.
 *
 * Both fingers and tools are classified as Pointable objects. Use the
 * Pointable.tool property to determine whether a Pointable object represents a
 * tool or finger. The Leap classifies a detected entity as a tool when it is
 * thinner, straighter, and longer than a typical finger.
 *
 * Note that Pointable objects can be invalid, which means that they do not
 * contain valid tracking data and do not correspond to a physical entity.
 * Invalid Pointable objects can be the result of asking for a Pointable object
 * using an ID from an earlier frame when no Pointable objects with that ID
 * exist in the current frame. A Pointable object created from the Pointable
 * constructor is also invalid. Test for validity with the Pointable.valid
 * property.
 */
var Pointable = module.exports = function(data) {
  /**
   * Indicates whether this is a valid Pointable object.
   *
   * @member valid
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.valid = true;
  /**
   * A unique ID assigned to this Pointable object, whose value remains the
   * same across consecutive frames while the tracked finger or tool remains
   * visible. If tracking is lost (for example, when a finger is occluded by
   * another finger or when it is withdrawn from the Leap field of view), the
   * Leap may assign a new ID when it detects the entity in a future frame.
   *
   * Use the ID value with the pointable() functions defined for the
   * {@link Frame} and {@link Frame.Hand} classes to find this
   * Pointable object in future frames.
   *
   * @member id
   * @type {String}
   * @memberof Leap.Pointable.prototype
   */
  this.id = data.id;
  this.handId = data.handId;
  /**
   * The estimated length of the finger or tool in millimeters.
   *
   * The reported length is the visible length of the finger or tool from the
   * hand to tip. If the length isn't known, then a value of 0 is returned.
   *
   * @member length
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.length = data.length;
  /**
   * Whether or not the Pointable is believed to be a tool.
   * Tools are generally longer, thinner, and straighter than fingers.
   *
   * If tool is false, then this Pointable must be a finger.
   *
   * @member tool
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.tool = data.tool;
  /**
   * The estimated width of the tool in millimeters.
   *
   * The reported width is the average width of the visible portion of the
   * tool from the hand to the tip. If the width isn't known,
   * then a value of 0 is returned.
   *
   * Pointable objects representing fingers do not have a width property.
   *
   * @member width
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.width = data.width;
  /**
   * The direction in which this finger or tool is pointing.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the tip.
   *
   * ![Finger](images/Leap_Finger_Model.png)
   * @member direction
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.direction = data.direction;
  /**
   * The tip position in millimeters from the Leap origin.
   * Stabilized
   *
   * @member stabilizedTipPosition
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.stabilizedTipPosition = data.stabilizedTipPosition;
  /**
   * The tip position in millimeters from the Leap origin.
   *
   * @member tipPosition
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.tipPosition = data.tipPosition;
  /**
   * The rate of change of the tip position in millimeters/second.
   *
   * @member tipVelocity
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.tipVelocity = data.tipVelocity;
  /**
   * The current touch zone of this Pointable object.
   *
   * The Leap Motion software computes the touch zone based on a floating touch
   * plane that adapts to the user's finger movement and hand posture. The Leap
   * Motion software interprets purposeful movements toward this plane as potential touch
   * points. When a Pointable moves close to the adaptive touch plane, it enters the
   * "hovering" zone. When a Pointable reaches or passes through the plane, it enters
   * the "touching" zone.
   *
   * The possible states include:
   *
   * * "none" -- The Pointable is outside the hovering zone.
   * * "hovering" -- The Pointable is close to, but not touching the touch plane.
   * * "touching" -- The Pointable has penetrated the touch plane.
   *
   * The touchDistance value provides a normalized indication of the distance to
   * the touch plane when the Pointable is in the hovering or touching zones.
   *
   * @member touchZone
   * @type {String}
   * @memberof Leap.Pointable.prototype
   */
  this.touchZone = data.touchZone;
  /**
   * A value proportional to the distance between this Pointable object and the
   * adaptive touch plane.
   *
   * ![Touch Distance](images/Leap_Touch_Plane.png)
   *
   * The touch distance is a value in the range [-1, 1]. The value 1.0 indicates the
   * Pointable is at the far edge of the hovering zone. The value 0 indicates the
   * Pointable is just entering the touching zone. A value of -1.0 indicates the
   * Pointable is firmly within the touching zone. Values in between are
   * proportional to the distance from the plane. Thus, the touchDistance of 0.5
   * indicates that the Pointable is halfway into the hovering zone.
   *
   * You can use the touchDistance value to modulate visual feedback given to the
   * user as their fingers close in on a touch target, such as a button.
   *
   * @member touchDistance
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.touchDistance = data.touchDistance;

  /**
   * How long the pointable has been visible in seconds.
   *
   * @member timeVisible
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.timeVisible = data.timeVisible;
}

/**
 * A string containing a brief, human readable description of the Pointable
 * object.
 *
 * @method toString
 * @memberof Leap.Pointable.prototype
 * @returns {String} A description of the Pointable object as a string.
 */
Pointable.prototype.toString = function() {
  if(this.tool == true){
    return "Pointable [ id:" + this.id + " " + this.length + "mmx | with:" + this.width + "mm | direction:" + this.direction + ' ]';
  } else {
    return "Pointable [ id:" + this.id + " " + this.length + "mmx | direction: " + this.direction + ' ]';
  }
}

/**
 * An invalid Pointable object.
 *
 * You can use this Pointable instance in comparisons testing
 * whether a given Pointable instance is valid or invalid. (You can also use the
 * Pointable.valid property.)

 * @static
 * @type {Leap.Pointable}
 * @name Invalid
 * @memberof Leap.Pointable
 */
Pointable.Invalid = { valid: false };

},{"gl-matrix":19}],13:[function(require,module,exports){
var Frame = require('./frame')

var Event = function(data) {
  this.type = data.type;
  this.state = data.state;
};

var chooseProtocol = exports.chooseProtocol = function(header) {
  var protocol;
  switch(header.version) {
    case 1:
    case 2:
    case 3:
    case 4:
      protocol = JSONProtocol(header.version, function(data) {
        return data.event ? new Event(data.event) : new Frame(data);
      });
      protocol.sendBackground = function(connection, state) {
        connection.send(protocol.encode({background: state}));
      }
      protocol.sendFocused = function(connection, state) {
        connection.send(protocol.encode({focused: state}));
      }
      break;
    default:
      throw "unrecognized version";
  }
  return protocol;
}

var JSONProtocol = function(version, cb) {
  var protocol = cb;
  protocol.encode = function(message) {
    return JSON.stringify(message);
  }
  protocol.version = version;
  protocol.versionLong = 'Version ' + version;
  protocol.type = 'protocol';
  return protocol;
};

},{"./frame":6}],14:[function(require,module,exports){
exports.UI = {
  Region: require("./ui/region"),
  Cursor: require("./ui/cursor")
};
},{"./ui/cursor":15,"./ui/region":16}],15:[function(require,module,exports){
var Cursor = module.exports = function() {
  return function(frame) {
    var pointable = frame.pointables.sort(function(a, b) { return a.z - b.z })[0]
    if (pointable && pointable.valid) {
      frame.cursorPosition = pointable.tipPosition
    }
    return frame
  }
}

},{}],16:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter
  , _ = require('underscore')

var Region = module.exports = function(start, end) {
  this.start = new Vector(start)
  this.end = new Vector(end)
  this.enteredFrame = null
}

Region.prototype.hasPointables = function(frame) {
  for (var i = 0; i != frame.pointables.length; i++) {
    var position = frame.pointables[i].tipPosition
    if (position.x >= this.start.x && position.x <= this.end.x && position.y >= this.start.y && position.y <= this.end.y && position.z >= this.start.z && position.z <= this.end.z) {
      return true
    }
  }
  return false
}

Region.prototype.listener = function(opts) {
  var region = this
  if (opts && opts.nearThreshold) this.setupNearRegion(opts.nearThreshold)
  return function(frame) {
    return region.updatePosition(frame)
  }
}

Region.prototype.clipper = function() {
  var region = this
  return function(frame) {
    region.updatePosition(frame)
    return region.enteredFrame ? frame : null
  }
}

Region.prototype.setupNearRegion = function(distance) {
  var nearRegion = this.nearRegion = new Region(
    [this.start.x - distance, this.start.y - distance, this.start.z - distance],
    [this.end.x + distance, this.end.y + distance, this.end.z + distance]
  )
  var region = this
  nearRegion.on("enter", function(frame) {
    region.emit("near", frame)
  })
  nearRegion.on("exit", function(frame) {
    region.emit("far", frame)
  })
  region.on('exit', function(frame) {
    region.emit("near", frame)
  })
}

Region.prototype.updatePosition = function(frame) {
  if (this.nearRegion) this.nearRegion.updatePosition(frame)
  if (this.hasPointables(frame) && this.enteredFrame == null) {
    this.enteredFrame = frame
    this.emit("enter", this.enteredFrame)
  } else if (!this.hasPointables(frame) && this.enteredFrame != null) {
    this.enteredFrame = null
    this.emit("exit", this.enteredFrame)
  }
  return frame
}

Region.prototype.normalize = function(position) {
  return new Vector([
    (position.x - this.start.x) / (this.end.x - this.start.x),
    (position.y - this.start.y) / (this.end.y - this.start.y),
    (position.z - this.start.z) / (this.end.z - this.start.z)
  ])
}

Region.prototype.mapToXY = function(position, width, height) {
  var normalized = this.normalize(position)
  var x = normalized.x, y = normalized.y
  if (x > 1) x = 1
  else if (x < -1) x = -1
  if (y > 1) y = 1
  else if (y < -1) y = -1
  return [
    (x + 1) / 2 * width,
    (1 - y) / 2 * height,
    normalized.z
  ]
}

_.extend(Region.prototype, EventEmitter.prototype)
},{"events":17,"underscore":20}],17:[function(require,module,exports){
(function(process){if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})(require("__browserify_process"))
},{"__browserify_process":18}],18:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],19:[function(require,module,exports){
(function(){/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.0.0
 */

/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function() {
  

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define('Leap',[],function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = window;
    }    
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}
 
/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    return new Float32Array(2);
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new Float32Array(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.sub = vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.mul = vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.div = vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {vec2} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.dist = vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.sqrDist = vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Caclulates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.len = vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Caclulates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.sqrLen = vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Caclulates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = x * m[0] + y * m[1];
    out[1] = x * m[2] + y * m[3];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 */
vec2.forEach = (function() {
    var vec = new Float32Array(2);

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}
 
/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    return new Float32Array(3);
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new Float32Array(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new Float32Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.sub = vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.mul = vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.div = vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {vec3} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.dist = vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.sqrDist = vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Caclulates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.len = vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Caclulates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.sqrLen = vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Caclulates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 */
vec3.forEach = (function() {
    var vec = new Float32Array(3);

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    return new Float32Array(4);
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.sub = vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.mul = vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.div = vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {vec4} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.dist = vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.sqrDist = vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Caclulates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.len = vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Caclulates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.sqrLen = vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Caclulates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 */
vec4.forEach = (function() {
    var vec = new Float32Array(4);

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

var mat2Identity = new Float32Array([
    1, 0,
    0, 1
]);

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    return new Float32Array(mat2Identity);
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Caclulates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.mul = mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a1 * b2;
    out[1] = a0 * b1 + a1 * b3;
    out[2] = a2 * b0 + a3 * b2;
    out[3] = a2 * b1 + a3 * b3;
    return out;
};

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {mat2} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a1 * s;
    out[1] = a0 * -s + a1 * c;
    out[2] = a2 *  c + a3 * s;
    out[3] = a2 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {mat2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v1;
    out[2] = a2 * v0;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

var mat3Identity = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]);

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    return new Float32Array(mat3Identity);
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new Float32Array(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Caclulates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.mul = mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

var mat4Identity = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    return new Float32Array(mat4Identity);
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Caclulates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.mul = mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

var quatIdentity = new Float32Array([0, 0, 0, 1]);

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    return new Float32Array(quatIdentity);
};

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.mul = quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {quat} b amount to scale the vector by
 * @returns {quat} out
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle around the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle around the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle around the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Caclulates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = a[3];

    var cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw,
        halfTheta,
        sinHalfTheta,
        ratioA,
        ratioB;

    if (Math.abs(cosHalfTheta) >= 1.0) {
        if (out !== a) {
            out[0] = ax;
            out[1] = ay;
            out[2] = az;
            out[3] = aw;
        }
        return out;
    }

    halfTheta = Math.acos(cosHalfTheta);
    sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
        out[0] = (ax * 0.5 + bx * 0.5);
        out[1] = (ay * 0.5 + by * 0.5);
        out[2] = (az * 0.5 + bz * 0.5);
        out[3] = (aw * 0.5 + bw * 0.5);
        return out;
    }

    ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    out[0] = (ax * ratioA + bx * ratioB);
    out[1] = (ay * ratioA + by * ratioB);
    out[2] = (az * ratioA + bz * ratioB);
    out[3] = (aw * ratioA + bw * ratioB);

    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Caclulates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
quat.len = quat.length = vec4.length;

/**
 * Caclulates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
quat.sqrLen = quat.squaredLength = vec4.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 */
quat.normalize = vec4.normalize;

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;










  })(shim.exports);
})();

})()
},{}],20:[function(require,module,exports){
(function(){//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

})()
},{}],21:[function(require,module,exports){
(function(global){/// shim for browser packaging

module.exports = function() {
  return global.WebSocket || global.MozWebSocket;
}

})(self)
},{}],22:[function(require,module,exports){
if (typeof(window.requestAnimationFrame) !== 'function') {
  window.requestAnimationFrame = (
    window.webkitRequestAnimationFrame   ||
    window.mozRequestAnimationFrame      ||
    window.oRequestAnimationFrame        ||
    window.msRequestAnimationFrame       ||
    function(callback) { setTimeout(callback, 1000 / 60); }
  );
}

Leap = require("../lib/index");

},{"../lib/index":9}]},{},[22])
; return Leap; });
/* Use AMD Plugin v0.4.0
 * Copyright 2013, Tim Branyen (@tbranyen)
 * use.js may be freely distributed under the MIT license.
 */
(function(global) {

// Cache used to map configuration options between load and write.
var buildMap = {};

define('use',{
  version: "0.4.0",

  // Invoked by the AMD builder, passed the path to resolve, the require
  // function, done callback, and the configuration options.
  load: function(name, req, load, config) {
    // Dojo provides access to the config object through the req function.
    if (!config) {
      config = require.rawConfig;
    }

    // Configuration is namespaced under use object.
    var module = config.use && config.use[name];

    // No module to load, throw.
    if (!module) {
      throw new TypeError("Module '" + name + "' is undefined or does not" +
        " have a `use` config. Make sure it exists, add a `use` config, or" +
        " don't use use! on it");
    }

    // Attach to the build map for use in the write method below.
    var settings = buildMap[name] = {
      deps: module.deps || [],
      attach: module.attach || module.exports || module.init
    };

    // Determine if shim parity is necessary to handle passed dependency array.
    // Browsers that don't support Array.isArray do not have my sympathy.
    if (Array.isArray ? Array.isArray(module) : module.length) {
      settings.deps = module;
      settings.attach = undefined;
    }

    // Read the current module configuration for any dependencies that are
    // required to run this particular non-AMD module.
    req(settings.deps || [], function() {
      var depArgs = arguments;

      // Utilize the `js!` plugin within Curl to load the source file.  It's
      // not recommended that this is used, but it's built in and accessible.
      if (global.curl) {
        name = "js!" + name;
      }

      // Require this module
      req([name], function() {
        // Attach property
        var attach = settings.attach;

        // If doing a build don't care about loading
        if (config.isBuild) { 
          return load();
        }

        // Return the correct attached object
        if (typeof attach === "function") {
          return load(attach.apply(global, depArgs));
        }

        // Use global for now (maybe this?)
        return load(global[attach]);
      });
    });
  },

  // Also invoked by the AMD builder, this writes out a compatible define
  // call that will work with loaders such as almond.js that cannot read
  // the configuration data.
  write: function(pluginName, moduleName, write) {
    var module = buildMap[moduleName];
    var deps = module.deps;
    var normalize = { attach: null, deps: "" };
	
    // Normalize the attach to global[name] or function() { }
    if (typeof module.attach === "function") {
      normalize.attach = module.attach.toString();
    } else {
      normalize.attach = [
        "function() {",
          "return typeof ", String(module.attach),
            " !== \"undefined\" ? ", String(module.attach), " : void 0;",
        "}"
      ].join("");
    }

    // Normalize the dependencies to have proper string characters
    if (deps.length) {
      normalize.deps = "'" + deps.toString().split(",").join("','") + "'";
    }

    // Write out the actual definition
    write([
      "define('", pluginName, "!", moduleName, "', ",
        "[", normalize.deps, "], ", normalize.attach,
      ");\n"
    ].join(""));
  }
});

})(this);

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	this.enabled = true;

	this.center = new THREE.Vector3();

	this.userZoom = true;
	this.userZoomSpeed = 1.0;

	this.userRotate = true;
	this.userRotateSpeed = 1.0;

	this.userPan = true;
	this.userPanSpeed = 2.0;

	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	this.minDistance = 0;
	this.maxDistance = Infinity;

	// 65 /*A*/, 83 /*S*/, 68 /*D*/
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, ROTATE: 65, ZOOM: 83, PAN: 68 };

	// internals

	var scope = this;

	var EPS = 0.000001;
	var PIXELS_PER_ROUND = 1800;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var zoomStart = new THREE.Vector2();
	var zoomEnd = new THREE.Vector2();
	var zoomDelta = new THREE.Vector2();

	var phiDelta = 0;
	var thetaDelta = 0;
	var scale = 1;

	var lastPosition = new THREE.Vector3();

	var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
	var state = STATE.NONE;

	// events

	var changeEvent = { type: 'change' };


	this.rotateLeft = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta -= angle;

	};

	this.rotateRight = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta += angle;

	};

	this.rotateUp = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta -= angle;

	};

	this.rotateDown = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta += angle;

	};

	this.zoomIn = function ( zoomScale ) {

		if ( zoomScale === undefined ) {

			zoomScale = getZoomScale();

		}

		scale /= zoomScale;

	};

	this.zoomOut = function ( zoomScale ) {

		if ( zoomScale === undefined ) {

			zoomScale = getZoomScale();

		}

		scale *= zoomScale;

	};

	this.pan = function ( distance ) {

		distance.transformDirection( this.object.matrix );
		distance.multiplyScalar( scope.userPanSpeed );

		this.object.position.add( distance );
		this.center.add( distance );

	};

	this.update = function () {

		var position = this.object.position;
		var offset = position.clone().sub( this.center );

		// angle from z-axis around y-axis

		var theta = Math.atan2( offset.x, offset.z );

		// angle from y-axis

		var phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

		if ( this.autoRotate ) {

			this.rotateLeft( getAutoRotationAngle() );

		}

		theta += thetaDelta;
		phi += phiDelta;

		// restrict phi to be between desired limits
		phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

		// restrict phi to be betwee EPS and PI-EPS
		phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

		var radius = offset.length() * scale;

		// restrict radius to be between desired limits
		radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

		offset.x = radius * Math.sin( phi ) * Math.sin( theta );
		offset.y = radius * Math.cos( phi );
		offset.z = radius * Math.sin( phi ) * Math.cos( theta );

		position.copy( this.center ).add( offset );

		this.object.lookAt( this.center );

		thetaDelta = 0;
		phiDelta = 0;
		scale = 1;

		if ( lastPosition.distanceTo( this.object.position ) > 0 ) {

			this.dispatchEvent( changeEvent );

			lastPosition.copy( this.object.position );

		}

	};


	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.userZoomSpeed );

	}

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;
		if ( scope.userRotate === false ) return;

		event.preventDefault();

		if ( state === STATE.NONE )
		{
			if ( event.button === 0 )
				state = STATE.ROTATE;
			if ( event.button === 1 )
				state = STATE.ZOOM;
			if ( event.button === 2 )
				state = STATE.PAN;
		}
		
		
		if ( state === STATE.ROTATE ) {

			//state = STATE.ROTATE;

			rotateStart.set( event.clientX, event.clientY );

		} else if ( state === STATE.ZOOM ) {

			//state = STATE.ZOOM;

			zoomStart.set( event.clientX, event.clientY );

		} else if ( state === STATE.PAN ) {

			//state = STATE.PAN;

		}

		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'mouseup', onMouseUp, false );

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		
		
		if ( state === STATE.ROTATE ) {

			rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			scope.rotateLeft( 2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed );
			scope.rotateUp( 2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed );

			rotateStart.copy( rotateEnd );

		} else if ( state === STATE.ZOOM ) {

			zoomEnd.set( event.clientX, event.clientY );
			zoomDelta.subVectors( zoomEnd, zoomStart );

			if ( zoomDelta.y > 0 ) {

				scope.zoomIn();

			} else {

				scope.zoomOut();

			}

			zoomStart.copy( zoomEnd );

		} else if ( state === STATE.PAN ) {

			var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
			var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

			scope.pan( new THREE.Vector3( - movementX, movementY, 0 ) );

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;
		if ( scope.userRotate === false ) return;

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false ) return;
		if ( scope.userZoom === false ) return;

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail;

		}

		if ( delta > 0 ) {

			scope.zoomOut();

		} else {

			scope.zoomIn();

		}

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false ) return;
		if ( scope.userPan === false ) return;

		switch ( event.keyCode ) {

			/*case scope.keys.UP:
				scope.pan( new THREE.Vector3( 0, 1, 0 ) );
				break;
			case scope.keys.BOTTOM:
				scope.pan( new THREE.Vector3( 0, - 1, 0 ) );
				break;
			case scope.keys.LEFT:
				scope.pan( new THREE.Vector3( - 1, 0, 0 ) );
				break;
			case scope.keys.RIGHT:
				scope.pan( new THREE.Vector3( 1, 0, 0 ) );
				break;
			*/
			case scope.keys.ROTATE:
				state = STATE.ROTATE;
				break;
			case scope.keys.ZOOM:
				state = STATE.ZOOM;
				break;
			case scope.keys.PAN:
				state = STATE.PAN;
				break;
				
		}

	}
	
	function onKeyUp( event ) {

		switch ( event.keyCode ) {

			case scope.keys.ROTATE:
			case scope.keys.ZOOM:
			case scope.keys.PAN:
				state = STATE.NONE;
				break;
		}

	}

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );
	this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
	this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
	window.addEventListener( 'keydown', onKeyDown, false );
	window.addEventListener( 'keyup', onKeyUp, false );

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );

define("OrbitControls", function(){});

define('use!OrbitControls', ['threejs'], function() {return typeof OrbitControls !== "undefined" ? OrbitControls : void 0;});

/**
 * VERSION: beta 1.542
 * DATE: 2012-10-01
 * JavaScript (ActionScript 3 and 2 also available)
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, easing.EasePack, plugins.CSSPlugin, plugins.RoundPropsPlugin
 *
 * Copyright (c) 2008-2012, GreenSock. All rights reserved. 
 * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){_gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(y,w,i){var q=function(h,d,b){i.call(this,h,d,b);this._cycle=0;this._yoyo=!0==this.vars.yoyo;this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._dirty=!0},s=q.prototype=i.to({},0.1,{}),c=[];s.constructor=q;s.kill()._gc=!1;q.killTweensOf=q.killDelayedCallsTo=i.killTweensOf;q.getTweensOf=i.getTweensOf;q.ticker=i.ticker;s.invalidate=function(){this._yoyo=
!0==this.vars.yoyo;this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._uncache(!0);return i.prototype.invalidate.call(this)};s.updateTo=function(h,d){var b=this.ratio,k;d&&(null!=this.timeline&&this._startTime<this._timeline._time)&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(k in h)this.vars[k]=h[k];if(this._initted)if(d)this._initted=!1;else if(this._notifyPluginsOfEnabled&&
this._firstPT&&i._onPluginEvent("_onDisable",this),0.998<this._time/this._duration)b=this._time,this.render(0,!0,!1),this._initted=!1,this.render(b,!0,!1);else if(0<this._time){this._initted=!1;this._init();b=1/(1-b);k=this._firstPT;for(var A;k;)A=k.s+k.c,k.c*=b,k.s=A-k.c,k=k._next}return this};s.render=function(b,d,f){var k=!this._dirty?this._totalDuration:this.totalDuration(),A=this._time,t=this._totalTime,e=this._cycle,x,m;if(b>=k){if(this._totalTime=k,this._cycle=this._repeat,this._yoyo&&0!==
(this._cycle&1)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(x=!0,m="onComplete"),0===this._duration){if(0===b||0>this._rawPrevTime)this._rawPrevTime!==b&&(f=!0);this._rawPrevTime=b}}else if(0>=b){this._totalTime=this._time=this._cycle=0;this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(0!==t||0===this._duration&&0<this._rawPrevTime)m="onReverseComplete",x=this._reversed;
0>b?(this._active=!1,0===this._duration&&(0<=this._rawPrevTime&&(f=!0),this._rawPrevTime=b)):this._initted||(f=!0)}else if(this._totalTime=this._time=b,0!==this._repeat&&(b=this._duration+this._repeatDelay,this._cycle=this._totalTime/b>>0,0!==this._cycle&&this._cycle===this._totalTime/b&&this._cycle--,this._time=this._totalTime-this._cycle*b,this._yoyo&&0!==(this._cycle&1)&&(this._time=this._duration-this._time),this._time>this._duration?this._time=this._duration:0>this._time&&(this._time=0)),this._easeType){var b=
this._time/this._duration,k=this._easeType,B=this._easePower;if(1===k||3===k&&0.5<=b)b=1-b;3===k&&(b*=2);1===B?b*=b:2===B?b*=b*b:3===B?b*=b*b*b:4===B&&(b*=b*b*b*b);this.ratio=1===k?1-b:2===k?b:0.5>this._time/this._duration?b/2:1-b/2}else this.ratio=this._ease.getRatio(this._time/this._duration);if(A!==this._time||f){this._initted||(this._init(),!x&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration)));!this._active&&!this._paused&&(this._active=!0);if(0==t&&this.vars.onStart&&(0!==
this._totalTime||0===this._duration))d||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||c);for(f=this._firstPT;f;){if(f.f)f.t[f.p](f.c*this.ratio+f.s);else f.t[f.p]=f.c*this.ratio+f.s;f=f._next}this._onUpdate&&(d||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||c));this._cycle!=e&&(d||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||c));m&&!this._gc&&(x&&(this._timeline.autoRemoveChildren&&
this._enabled(!1,!1),this._active=!1),d||this.vars[m]&&this.vars[m].apply(this.vars[m+"Scope"]||this,this.vars[m+"Params"]||c))}};q.to=function(b,d,f){return new q(b,d,f)};q.from=function(b,d,f){f.runBackwards=!0;!1!=f.immediateRender&&(f.immediateRender=!0);return new q(b,d,f)};q.fromTo=function(b,d,f,k){k.startAt=f;f.immediateRender&&(k.immediateRender=!0);return new q(b,d,k)};q.staggerTo=q.allTo=function(b,d,f,k,A,c,t){var k=k||0,x=[],m=b.length,e=f.delay||0,p,i,s;for(i=0;i<m;i++){p={};for(s in f)p[s]=
f[s];p.delay=e;i===m-1&&A&&(p.onComplete=function(){f.onComplete&&f.onComplete.apply(f.onCompleteScope,f.onCompleteParams);A.apply(t,c)});x[i]=new q(b[i],d,p);e+=k}return x};q.staggerFrom=q.allFrom=function(b,d,f,k,A,c,t){f.runBackwards=!0;!1!=f.immediateRender&&(f.immediateRender=!0);return q.staggerTo(b,d,f,k,A,c,t)};q.staggerFromTo=q.allFromTo=function(b,d,f,k,A,c,t,x){k.startAt=f;f.immediateRender&&(k.immediateRender=!0);return q.staggerTo(b,d,k,A,c,t,x)};q.delayedCall=function(b,d,f,k,A){return new q(d,
0,{delay:b,onComplete:d,onCompleteParams:f,onCompleteScope:k,onReverseComplete:d,onReverseCompleteParams:f,onReverseCompleteScope:k,immediateRender:!1,useFrames:A,overwrite:0})};q.set=function(b,d){return new q(b,0,d)};q.isTweening=function(b){for(var b=i.getTweensOf(b),d=b.length,f;-1<--d;)if((f=b[d])._active||f._startTime===f.timeline._time&&f.timeline._active)return!0;return!1};var t=function(b,d){for(var f=[],k=0,A=b._first;A;)A instanceof i?f[k++]=A:(d&&(f[k++]=A),f=f.concat(t(A,d)),k=f.length),
A=A._next;return f},e=q.getAllTweens=function(b){return t(y._rootTimeline,b).concat(t(y._rootFramesTimeline,b))};q.killAll=function(b,d,f,k){null==d&&(d=!0);null==f&&(f=!0);var A=e(!1!=k),c=A.length,k=d&&f&&k,t,x,m;for(m=0;m<c;m++)if(x=A[m],k||x instanceof w||(t=x.target===x.vars.onComplete)&&f||d&&!t)b?x.totalTime(x.totalDuration()):x._enabled(!1,!1)};q.killChildTweensOf=function(b,d){if(null!=b)if(b.jquery)b.each(function(b,f){q.killChildTweensOf(f,d)});else{var f=i._tweenLookup,k=[],A,c;for(c in f)for(A=
f[c].target.parentNode;A;)A===b&&(k=k.concat(f[c].tweens)),A=A.parentNode;A=k.length;for(f=0;f<A;f++)d&&k[f].totalTime(k[f].totalDuration()),k[f]._enabled(!1,!1)}};q.pauseAll=function(h,d,f){b(!0,h,d,f)};q.resumeAll=function(h,d,f){b(!1,h,d,f)};var b=function(b,d,f,k){void 0==d&&(d=!0);void 0==f&&(f=!0);for(var A=e(k),k=d&&f&&k,c=A.length,t,x;-1<--c;)x=A[c],(k||x instanceof w||(t=x.target===x.vars.onComplete)&&f||d&&!t)&&x.paused(b)};s.progress=function(b){return!arguments.length?this._time/this.duration():
this.totalTime(this.duration()*b+this._cycle*this._duration,!1)};s.totalProgress=function(b){return!arguments.length?this._totalTime/this.totalDuration():this.totalTime(this.totalDuration()*b,!1)};s.time=function(b,d){if(!arguments.length)return this._time;this._dirty&&this.totalDuration();b>this._duration&&(b=this._duration);this._yoyo&&0!==(this._cycle&1)?b=this._duration-b+this._cycle*(this._duration+this._repeatDelay):0!=this._repeat&&(b+=this._cycle*(this._duration+this._repeatDelay));return this.totalTime(b,
d)};s.totalDuration=function(b){return!arguments.length?(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration):-1==this._repeat?this:this.duration((b-this._repeat*this._repeatDelay)/(this._repeat+1))};s.repeat=function(b){if(!arguments.length)return this._repeat;this._repeat=b;return this._uncache(!0)};s.repeatDelay=function(b){if(!arguments.length)return this._repeatDelay;this._repeatDelay=
b;return this._uncache(!0)};s.yoyo=function(b){if(!arguments.length)return this._yoyo;this._yoyo=b;return this};return q},!0);_gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(y,w,i){var q=function(b){w.call(this,b);this._labels={};this.autoRemoveChildren=!0==this.vars.autoRemoveChildren;this.smoothChildTiming=!0==this.vars.smoothChildTiming;this._sortChildren=!0;this._onUpdate=this.vars.onUpdate;for(var b=s.length,h,d;-1<--b;)if(d=this.vars[s[b]])for(h=d.length;-1<
--h;)"{self}"===d[h]&&(d=this.vars[s[b]]=d.concat(),d[h]=this);this.vars.tweens instanceof Array&&this.insertMultiple(this.vars.tweens,0,this.vars.align||"normal",this.vars.stagger||0)},s=["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],c=[],t=function(b){var h={},d;for(d in b)h[d]=b[d];return h},e=q.prototype=new w;e.constructor=q;e.kill()._gc=!1;e.to=function(b,h,d,f,k){return this.insert(new i(b,h,d),this._parseTimeOrLabel(k)+(f||0))};e.from=function(b,
h,d,f,k){return this.insert(i.from(b,h,d),this._parseTimeOrLabel(k)+(f||0))};e.fromTo=function(b,h,d,f,k,A){return this.insert(i.fromTo(b,h,d,f),this._parseTimeOrLabel(A)+(k||0))};e.staggerTo=function(b,h,d,f,k,A,c,e,x){c=new q({onComplete:c,onCompleteParams:e,onCompleteScope:x});f=f||0;for(e=0;e<b.length;e++)null!=d.startAt&&(d.startAt=t(d.startAt)),c.insert(new i(b[e],h,t(d)),e*f);return this.insert(c,this._parseTimeOrLabel(A)+(k||0))};e.staggerFrom=function(b,h,d,f,k,A,c,t,x){null==d.immediateRender&&
(d.immediateRender=!0);d.runBackwards=!0;return this.staggerTo(b,h,d,f,k,A,c,t,x)};e.staggerFromTo=function(b,h,d,f,k,c,t,e,x,m){f.startAt=d;d.immediateRender&&(f.immediateRender=!0);return this.staggerTo(b,h,f,k,c,t,e,x,m)};e.call=function(b,h,d,f,k){return this.insert(i.delayedCall(0,b,h,d),this._parseTimeOrLabel(k)+(f||0))};e.set=function(b,h,d,f){h.immediateRender=!1;return this.insert(new i(b,0,h),this._parseTimeOrLabel(f)+(d||0))};q.exportRoot=function(b,h){b=b||{};null==b.smoothChildTiming&&
(b.smoothChildTiming=!0);var d=new q(b),f=d._timeline;null==h&&(h=!0);f._remove(d,!0);d._startTime=0;d._rawPrevTime=d._time=d._totalTime=f._time;for(var k=f._first,c;k;)c=k._next,(!h||!(k instanceof i&&k.target==k.vars.onComplete))&&d.insert(k,k._startTime-k._delay),k=c;f.insert(d,0);return d};e.insert=function(b,h){if(!(b instanceof y)){if(b instanceof Array)return this.insertMultiple(b,h);if("string"===typeof b)return this.addLabel(b,this._parseTimeOrLabel(h||0,!0));if("function"===typeof b)b=i.delayedCall(0,
b);else throw"ERROR: Cannot insert() "+b+" into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.";}w.prototype.insert.call(this,b,this._parseTimeOrLabel(h||0,!0));if(this._gc&&!this._paused&&this._time===this._duration&&this._time<this.duration())for(var d=this;d._gc&&d._timeline;)d._timeline.smoothChildTiming?d.totalTime(d._totalTime,!0):d._enabled(!0,!1),d=d._timeline;return this};e.remove=function(b){if(b instanceof y)return this._remove(b,!1);if(b instanceof
Array){for(var h=b.length;-1<--h;)this.remove(b[h]);return this}return"string"===typeof b?this.removeLabel(b):this.kill(null,b)};e.append=function(b,h){return this.insert(b,this.duration()+(h||0))};e.insertMultiple=function(b,h,d,f){for(var d=d||"normal",f=f||0,k,c=this._parseTimeOrLabel(h||0,!0),t=b.length,h=0;h<t;h++){if((k=b[h])instanceof Array)k=new q({tweens:k});this.insert(k,c);"string"===typeof k||"function"===typeof k||("sequence"===d?c=k._startTime+k.totalDuration()/k._timeScale:"start"===
d&&(k._startTime-=k.delay()));c+=f}return this._uncache(!0)};e.appendMultiple=function(b,c,d,f){return this.insertMultiple(b,this.duration()+(c||0),d,f)};e.addLabel=function(b,c){this._labels[b]=c;return this};e.removeLabel=function(b){delete this._labels[b];return this};e.getLabelTime=function(b){return null!=this._labels[b]?this._labels[b]:-1};e._parseTimeOrLabel=function(b,c){return null==b?this.duration():"string"===typeof b&&isNaN(b)?null==this._labels[b]?c?this._labels[b]=this.duration():0:
this._labels[b]:Number(b)};e.seek=function(b,c){return this.totalTime(this._parseTimeOrLabel(b,!1),!1!=c)};e.stop=function(){return this.paused(!0)};e.gotoAndPlay=function(b,c){return w.prototype.play.call(this,b,c)};e.gotoAndStop=function(b,c){return this.pause(b,c)};e.render=function(b,h,d){this._gc&&this._enabled(!0,!1);this._active=!this._paused;var f=!this._dirty?this._totalDuration:this.totalDuration(),k=this._time,t=this._startTime,e=this._timeScale,i=this._paused,x,m,B;if(b>=f){this._totalTime=
this._time=f;if(!this._reversed&&!this._hasPausedChild()&&(x=!0,B="onComplete",0===this._duration&&(0===b||0>this._rawPrevTime)))this._rawPrevTime!==b&&(d=!0);this._rawPrevTime=b;b=f+1E-6}else if(0>=b){this._totalTime=this._time=0;if(0!==k||0===this._duration&&0<this._rawPrevTime)B="onReverseComplete",x=this._reversed;0>b?(this._active=!1,0===this._duration&&0<=this._rawPrevTime&&(d=!0)):this._initted||(d=!0);this._rawPrevTime=b;b=-1E-6}else this._totalTime=this._time=this._rawPrevTime=b;if(this._time!==
k||d){this._initted||(this._initted=!0);0===k&&this.vars.onStart&&0!==this._time&&(h||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||c));if(this._time>k)for(d=this._first;d;){m=d._next;if(this._paused&&!i)break;else if(d._active||d._startTime<=this._time&&!d._paused&&!d._gc)d._reversed?d.render((!d._dirty?d._totalDuration:d.totalDuration())-(b-d._startTime)*d._timeScale,h,!1):d.render((b-d._startTime)*d._timeScale,h,!1);d=m}else for(d=this._last;d;){m=d._prev;if(this._paused&&
!i)break;else if(d._active||d._startTime<=k&&!d._paused&&!d._gc)d._reversed?d.render((!d._dirty?d._totalDuration:d.totalDuration())-(b-d._startTime)*d._timeScale,h,!1):d.render((b-d._startTime)*d._timeScale,h,!1);d=m}this._onUpdate&&(h||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||c));if(B&&!this._gc&&(t===this._startTime||e!=this._timeScale))if(0===this._time||f>=this.totalDuration())x&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),h||this.vars[B]&&
this.vars[B].apply(this.vars[B+"Scope"]||this,this.vars[B+"Params"]||c)}};e._hasPausedChild=function(){for(var b=this._first;b;){if(b._paused||b instanceof q&&b._hasPausedChild())return!0;b=b._next}return!1};e.getChildren=function(b,c,d,f){for(var f=f||-9999999999,k=[],t=this._first,e=0;t;)t._startTime<f||(t instanceof i?!1!=c&&(k[e++]=t):(!1!=d&&(k[e++]=t),!1!=b&&(k=k.concat(t.getChildren(!0,c,d)),e=k.length))),t=t._next;return k};e.getTweensOf=function(b,c){for(var d=i.getTweensOf(b),f=d.length,
k=[],t=0;-1<--f;)if(d[f].timeline===this||c&&this._contains(d[f]))k[t++]=d[f];return k};e._contains=function(b){for(b=b.timeline;b;){if(b===this)return!0;b=b.timeline}return!1};e.shiftChildren=function(b,c,d){for(var d=d||0,f=this._first;f;)f._startTime>=d&&(f._startTime+=b),f=f._next;if(c)for(var k in this._labels)this._labels[k]>=d&&(this._labels[k]+=b);return this._uncache(!0)};e._kill=function(b,c){if(null==b&&null==c)return this._enabled(!1,!1);for(var d=null==c?this.getChildren(!0,!0,!1):this.getTweensOf(c),
f=d.length,k=!1;-1<--f;)d[f]._kill(b,c)&&(k=!0);return k};e.clear=function(b){var c=this.getChildren(!1,!0,!0),d=c.length;for(this._time=this._totalTime=0;-1<--d;)c[d]._enabled(!1,!1);!1!=b&&(this._labels={});return this._uncache(!0)};e.invalidate=function(){for(var b=this._first;b;)b.invalidate(),b=b._next;return this};e._enabled=function(b,c){if(b==this._gc)for(var d=this._first;d;)d._enabled(b,!0),d=d._next;return w.prototype._enabled.call(this,b,c)};e.progress=function(b){return!arguments.length?
this._time/this.duration():this.totalTime(this.duration()*b,!1)};e.duration=function(b){if(!arguments.length)return this._dirty&&this.totalDuration(),this._duration;0!==this.duration()&&0!==b&&this.timeScale(this._duration/b);return this};e.totalDuration=function(b){if(!arguments.length){if(this._dirty){for(var c=0,d=this._first,f=-999999999999,k;d;)k=d._next,d._startTime<f&&this._sortChildren?this.insert(d,d._startTime-d._delay):f=d._startTime,0>d._startTime&&(c-=d._startTime,this.shiftChildren(-d._startTime,
!1,-9999999999)),d=d._startTime+(!d._dirty?d._totalDuration:d.totalDuration())/d._timeScale,d>c&&(c=d),d=k;this._duration=this._totalDuration=c;this._dirty=!1}return this._totalDuration}0!==this.totalDuration()&&0!==b&&this.timeScale(this._totalDuration/b);return this};e.usesFrames=function(){for(var b=this._timeline;b._timeline;)b=b._timeline;return b===y._rootFramesTimeline};e.rawTime=function(){return this._paused||0!==this._totalTime&&this._totalTime!==this._totalDuration?this._totalTime:(this._timeline.rawTime()-
this._startTime)*this._timeScale};return q},!0);_gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(y,w,i){var q=function(c){y.call(this,c);this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||0;this._cycle=0;this._yoyo=!0==this.vars.yoyo;this._dirty=!0},s=[],c=new i(null,null,1,0),i=q.prototype=new y;i.constructor=q;i.kill()._gc=!1;q.version=12;i.invalidate=function(){this._yoyo=!0==this.vars.yoyo;this._repeat=this.vars.repeat||0;this._repeatDelay=this.vars.repeatDelay||
0;this._uncache(!0);return y.prototype.invalidate.call(this)};i.addCallback=function(c,e,b,h){return this.insert(w.delayedCall(0,c,b,h),e)};i.removeCallback=function(c,e){if(null==e)this._kill(null,c);else for(var b=this.getTweensOf(c,!1),h=b.length,d=this._parseTimeOrLabel(e,!1);-1<--h;)b[h]._startTime===d&&b[h]._enabled(!1,!1);return this};i.tweenTo=function(t,e){var e=e||{},b={ease:c,overwrite:2,useFrames:this.usesFrames(),immediateRender:!1},h,d;for(h in e)b[h]=e[h];b.time=this._parseTimeOrLabel(t,
!1);d=new w(this,Math.abs(Number(b.time)-this._time)/this._timeScale||0.001,b);b.onStart=function(){d.target.paused(!0);d.vars.time!=d.target.time()&&d.duration(Math.abs(d.vars.time-d.target.time())/d.target._timeScale);e.onStart&&e.onStart.apply(e.onStartScope||d,e.onStartParams||s)};return d};i.tweenFromTo=function(c,e,b){b=b||{};b.startAt={time:this._parseTimeOrLabel(c,!1)};c=this.tweenTo(e,b);return c.duration(Math.abs(c.vars.time-c.vars.startAt.time)/this._timeScale||0.001)};i.render=function(c,
e,b){this._gc&&this._enabled(!0,!1);this._active=!this._paused;var h=!this._dirty?this._totalDuration:this.totalDuration(),d=this._time,f=this._totalTime,k=this._startTime,A=this._timeScale,i=this._rawPrevTime,q=this._paused,x=this._cycle,m,B;if(c>=h){this._locked||(this._totalTime=h,this._cycle=this._repeat);if(!this._reversed&&!this._hasPausedChild()&&(m=!0,B="onComplete",0===this._duration&&(0===c||0>this._rawPrevTime)))this._rawPrevTime!==c&&(b=!0);this._rawPrevTime=c;this._yoyo&&0!==(this._cycle&
1)?(this._time=0,c=-1E-6):(this._time=this._duration,c=this._duration+1E-6)}else if(0>=c){this._locked||(this._totalTime=this._cycle=0);this._time=0;if(0!==d||0===this._duration&&0<this._rawPrevTime)B="onReverseComplete",m=this._reversed;0>c?(this._active=!1,0===this._duration&&0<=this._rawPrevTime&&(b=!0)):this._initted||(b=!0);this._rawPrevTime=c;c=-1E-6}else this._time=this._rawPrevTime=c,this._locked||(this._totalTime=c,0!==this._repeat&&(c=this._duration+this._repeatDelay,this._cycle=this._totalTime/
c>>0,0!==this._cycle&&this._cycle===this._totalTime/c&&this._cycle--,this._time=this._totalTime-this._cycle*c,this._yoyo&&0!=(this._cycle&1)&&(this._time=this._duration-this._time),this._time>this._duration?(this._time=this._duration,c=this._duration+1E-6):0>this._time?(this._time=0,c=-1E-6):c=this._time));if(this._cycle!==x&&!this._locked){var p=this._yoyo&&0!==(x&1),P=p===(this._yoyo&&0!==(this._cycle&1)),w=this._totalTime,y=this._cycle,E=this._rawPrevTime,C=this._time;this._totalTime=x*this._duration;
this._cycle<x?p=!p:this._totalTime+=this._duration;this._time=d;this._rawPrevTime=i;this._cycle=x;this._locked=!0;d=p?0:this._duration;this.render(d,e,!1);e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||s);P&&(d=p?this._duration+1E-6:-1E-6,this.render(d,!0,!1));this._time=C;this._totalTime=w;this._cycle=y;this._rawPrevTime=E;this._locked=!1}if(this._time!==d||b){this._initted||(this._initted=!0);0===f&&this.vars.onStart&&0!==this._totalTime&&
(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||s));if(this._time>d)for(b=this._first;b;){f=b._next;if(this._paused&&!q)break;else if(b._active||b._startTime<=this._time&&!b._paused&&!b._gc)b._reversed?b.render((!b._dirty?b._totalDuration:b.totalDuration())-(c-b._startTime)*b._timeScale,e,!1):b.render((c-b._startTime)*b._timeScale,e,!1);b=f}else for(b=this._last;b;){f=b._prev;if(this._paused&&!q)break;else if(b._active||b._startTime<=d&&!b._paused&&!b._gc)b._reversed?
b.render((!b._dirty?b._totalDuration:b.totalDuration())-(c-b._startTime)*b._timeScale,e,!1):b.render((c-b._startTime)*b._timeScale,e,!1);b=f}this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||s));if(B&&!this._locked&&!this._gc&&(k===this._startTime||A!=this._timeScale))if(0===this._time||h>=this.totalDuration())m&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),e||this.vars[B]&&this.vars[B].apply(this.vars[B+"Scope"]||this,this.vars[B+
"Params"]||s)}};i.getActive=function(c,e,b){null==c&&(c=!0);null==e&&(e=!0);null==b&&(b=!1);var h=[],c=this.getChildren(c,e,b),e=0,b=c.length,d,f;for(d=0;d<b;d++)if(f=c[d],!f._paused&&f._timeline._time>=f._startTime&&f._timeline._time<f._startTime+f._totalDuration/f._timeScale){var k;a:{for(k=f._timeline;k;){if(k._paused){k=!0;break a}k=k._timeline}k=!1}k||(h[e++]=f)}return h};i.getLabelAfter=function(c){!c&&0!==c&&(c=this._time);var e=this.getLabelsArray(),b=e.length,h;for(h=0;h<b;h++)if(e[h].time>
c)return e[h].name;return null};i.getLabelBefore=function(c){null==c&&(c=this._time);for(var e=this.getLabelsArray(),b=e.length;-1<--b;)if(e[b].time<c)return e[b].name;return null};i.getLabelsArray=function(){var c=[],e=0,b;for(b in this._labels)c[e++]={time:this._labels[b],name:b};c.sort(function(b,d){return b.time-d.time});return c};i.progress=function(c){return!arguments.length?this._time/this.duration():this.totalTime(this.duration()*c+this._cycle*this._duration,!1)};i.totalProgress=function(c){return!arguments.length?
this._totalTime/this.totalDuration():this.totalTime(this.totalDuration()*c,!1)};i.totalDuration=function(c){return!arguments.length?(this._dirty&&(y.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration):-1==this._repeat?this:this.duration((c-this._repeat*this._repeatDelay)/(this._repeat+1))};i.time=function(c,e){if(!arguments.length)return this._time;this._dirty&&this.totalDuration();
c>this._duration&&(c=this._duration);this._yoyo&&0!==(this._cycle&1)?c=this._duration-c+this._cycle*(this._duration+this._repeatDelay):0!=this._repeat&&(c+=this._cycle*(this._duration+this._repeatDelay));return this.totalTime(c,e)};i.repeat=function(c){if(!arguments.length)return this._repeat;this._repeat=c;return this._uncache(!0)};i.repeatDelay=function(c){if(!arguments.length)return this._repeatDelay;this._repeatDelay=c;return this._uncache(!0)};i.yoyo=function(c){if(!arguments.length)return this._yoyo;
this._yoyo=c;return this};i.currentLabel=function(c){return!arguments.length?this.getLabelBefore(this._time+1E-8):this.seek(c,!0)};return q},!0);_gsDefine("plugins.BezierPlugin",["plugins.TweenPlugin"],function(y){var w=function(){y.call(this,"bezier",-1);this._overwriteProps.pop();this._func={};this._round={}},i=w.prototype=new y("bezier",1),q=180/Math.PI,s=[],c=[],t=[],e={},b=function(b,c,d,e){this.a=b;this.b=c;this.c=d;this.d=e;this.da=e-b;this.ca=d-b;this.ba=c-b},h=w.bezierThrough=function(f,
k,A,h,i,x){var m={},B=[],p,q,i="string"===typeof i?","+i+",":",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,";null==k&&(k=1);for(q in f[0])B.push(q);s.length=c.length=t.length=0;for(p=B.length;-1<--p;){q=B[p];e[q]=-1!==i.indexOf(","+q+",");var w=m,y=q,E;E=f;var C=q,n=e[q],D=x,H=[],G=void 0,z=void 0,F=void 0,g=void 0,u=void 0,G=void 0;if(D){E=[D].concat(E);for(z=E.length;-1<--z;)if("string"===
typeof(G=E[z][C]))"="===G.charAt(1)&&(E[z][C]=D[C]+Number(G.charAt(0)+G.substr(2)))}G=E.length-2;if(0>G)H[0]=new b(E[0][C],0,0,E[-1>G?0:1][C]);else{for(z=0;z<G;z++)F=E[z][C],g=E[z+1][C],H[z]=new b(F,0,0,g),n&&(u=E[z+2][C],s[z]=(s[z]||0)+(g-F)*(g-F),c[z]=(c[z]||0)+(u-g)*(u-g));H[z]=new b(E[z][C],0,0,E[z+1][C])}E=H;w[y]=E}for(p=s.length;-1<--p;)s[p]=Math.sqrt(s[p]),c[p]=Math.sqrt(c[p]);if(!h){for(p=B.length;-1<--p;)if(e[q]){a=m[B[p]];l=a.length-1;for(j=0;j<l;j++)r=a[j+1].da/c[j]+a[j].da/s[j],t[j]=(t[j]||
0)+r*r}for(p=t.length;-1<--p;)t[p]=Math.sqrt(t[p])}for(p=B.length;-1<--p;){q=B[p];f=m[q];i=k;x=A;w=h;q=e[q];y=f.length-1;E=0;for(var C=f[0].a,v=u=g=D=G=g=F=G=z=F=H=D=n=void 0,n=0;n<y;n++)z=f[E],D=z.a,H=z.d,F=f[E+1].d,q?(g=s[n],u=c[n],v=0.25*(u+g)*i/(w?0.5:t[n]||0.5),G=H-(H-D)*(w?0.5*i:v/g),F=H+(F-H)*(w?0.5*i:v/u),g=H-(G+(F-G)*(3*g/(g+u)+0.5)/4)):(G=H-0.5*(H-D)*i,F=H+0.5*(F-H)*i,g=H-(G+F)/2),G+=g,F+=g,z.c=G,z.b=0!=n?C:C=z.a+0.6*(z.c-z.a),z.da=H-D,z.ca=G-D,z.ba=C-D,x?(D=d(D,C,G,H),f.splice(E,1,D[0],
D[1],D[2],D[3]),E+=4):E++,C=F;z=f[E];z.b=C;z.c=C+0.4*(z.d-C);z.da=z.d-z.a;z.ca=z.c-z.a;z.ba=C-z.a;x&&(D=d(z.a,C,z.c,z.d),f.splice(E,1,D[0],D[1],D[2],D[3]))}return m},d=w.cubicToQuadratic=function(b,c,d,e){var i={a:b},x={},h={},q={c:e},p=(b+c)/2,s=(c+d)/2,d=(d+e)/2,c=(p+s)/2,s=(s+d)/2,t=(s-c)/8;i.b=p+(b-p)/4;x.b=c+t;i.c=x.a=(i.b+x.b)/2;x.c=h.a=(c+s)/2;h.b=s-t;q.b=d+(e-d)/4;h.c=q.a=(h.b+q.b)/2;return[i,x,h,q]};w.quadraticToCubic=function(c,d,e){return new b(c,(2*d+c)/3,(2*d+e)/3,e)};i.constructor=w;
w.API=2;i._onInitTween=function(c,d,e){this._target=c;d instanceof Array&&(d={values:d});this._props=[];this._timeRes=null==d.timeResolution?6:parseInt(d.timeResolution);var i=d.values||[],q={},x=i[0],e=d.autoRotate||e.vars.orientToBezier,m,B,p;this._autoRotate=e?e instanceof Array?e:[["x","y","rotation",!0===e?0:Number(e)||0]]:null;for(m in x)this._props.push(m);for(x=this._props.length;-1<--x;)m=this._props[x],this._overwriteProps.push(m),e=this._func[m]="function"===typeof c[m],q[m]=!e?parseFloat(c[m]):
c[m.indexOf("set")||"function"!==typeof c["get"+m.substr(3)]?m:"get"+m.substr(3)](),p||q[m]!==i[0][m]&&(p=q);if("cubic"!==d.type&&"quadratic"!==d.type&&"soft"!==d.type)q=h(i,isNaN(d.curviness)?1:d.curviness,!1,"thruBasic"===d.type,d.correlate,p);else{e=(e=d.type)||"soft";d={};p="cubic"===e?3:2;var e="soft"===e,x=[],s,t,w,y,C,n,D,H,G;e&&q&&(i=[q].concat(i));if(null==i||i.length<p+1)throw"invalid Bezier data";for(t in i[0])x.push(t);for(n=x.length;-1<--n;){t=x[n];d[t]=C=[];G=0;H=i.length;for(D=0;D<
H;D++)s=null==q?i[D][t]:"string"===typeof(w=i[D][t])&&"="===w.charAt(1)?q[t]+Number(w.charAt(0)+w.substr(2)):Number(w),e&&1<D&&D<H-1&&(C[G++]=(s+C[G-2])/2),C[G++]=s;H=G-p+1;for(D=G=0;D<H;D+=p)s=C[D],t=C[D+1],w=C[D+2],y=2===p?0:C[D+3],C[G++]=w=3===p?new b(s,t,w,y):new b(s,(2*t+s)/3,(2*t+w)/3,w);C.length=G}q=d}this._beziers=q;this._segCount=this._beziers[m].length;if(this._timeRes){x=this._beziers;m=this._timeRes;m=m>>0||6;q=[];t=[];i=w=0;d=m-1;p=[];e=[];for(B in x){s=x[B];C=q;n=m;D=1/n;H=s.length;
for(var z=void 0,F=void 0,g=y=G=F=void 0,u=z=void 0,v=void 0,v=g=void 0;-1<--H;){g=s[H];F=g.a;G=g.d-F;y=g.c-F;g=g.b-F;F=0;for(u=1;u<=n;u++)z=D*u,v=1-z,z=F-(F=(z*z*G+3*v*(z*y+v*g))*z),v=H*n+u-1,C[v]=(C[v]||0)+z*z}}x=q.length;for(B=0;B<x;B++)w+=Math.sqrt(q[B]),s=B%m,e[s]=w,s===d&&(i+=w,s=B/m>>0,p[s]=e,t[s]=i,w=0,e=[]);this._length=i;this._lengths=t;this._segments=p;this._l1=this._li=this._s1=this._si=0;this._l2=this._lengths[0];this._curSeg=this._segments[0];this._s2=this._curSeg[0];this._prec=1/this._curSeg.length}if(e=
this._autoRotate){e[0]instanceof Array||(this._autoRotate=e=[e]);for(x=e.length;-1<--x;)for(B=0;3>B;B++)m=e[x][B],this._func[m]="function"===typeof c[m]?c[m.indexOf("set")||"function"!==typeof c["get"+m.substr(3)]?m:"get"+m.substr(3)]:!1}return!0};i.setRatio=function(b){var d=this._segCount,c=this._func,e=this._target,i,h,m,s,p;if(this._timeRes){i=this._lengths;s=this._curSeg;b*=this._length;h=this._li;if(b>this._l2&&h<d-1){for(d-=1;h<d&&(this._l2=i[++h])<=b;);this._l1=i[h-1];this._li=h;this._curSeg=
s=this._segments[h];this._s2=s[this._s1=this._si=0]}else if(b<this._l1&&0<h){for(;0<h&&(this._l1=i[--h])>=b;);0===h&&b<this._l1?this._l1=0:h++;this._l2=i[h];this._li=h;this._curSeg=s=this._segments[h];this._s1=s[(this._si=s.length-1)-1]||0;this._s2=s[this._si]}i=h;b-=this._l1;h=this._si;if(b>this._s2&&h<s.length-1){for(d=s.length-1;h<d&&(this._s2=s[++h])<=b;);this._s1=s[h-1];this._si=h}else if(b<this._s1&&0<h){for(;0<h&&(this._s1=s[--h])>=b;);0===h&&b<this._s1?this._s1=0:h++;this._s2=s[h];this._si=
h}s=(h+(b-this._s1)/(this._s2-this._s1))*this._prec}else i=0>b?0:1<=b?d-1:d*b>>0,s=(b-i*(1/d))*d;d=1-s;for(h=this._props.length;-1<--h;)if(b=this._props[h],m=this._beziers[b][i],p=(s*s*m.da+3*d*(s*m.ca+d*m.ba))*s+m.a,this._round[b]&&(p=p+(0<p?0.5:-0.5)>>0),c[b])e[b](p);else e[b]=p;if(this._autoRotate){var d=this._autoRotate,t,w,y,E,C;for(h=d.length;-1<--h;)b=d[h][2],E=d[h][3]||0,C=!0==d[h][4]?1:q,m=this._beziers[d[h][0]][i],p=this._beziers[d[h][1]][i],t=m.a+(m.b-m.a)*s,w=m.b+(m.c-m.b)*s,t+=(w-t)*
s,w+=(m.c+(m.d-m.c)*s-w)*s,m=p.a+(p.b-p.a)*s,y=p.b+(p.c-p.b)*s,m+=(y-m)*s,y+=(p.c+(p.d-p.c)*s-y)*s,p=Math.atan2(y-m,w-t)*C+E,c[b]?c[b].call(e,p):e[b]=p}};i._roundProps=function(b,d){for(var c=this._overwriteProps,e=c.length;-1<--e;)if(b[c[e]]||b.bezier||b.bezierThrough)this._round[c[e]]=d};i._kill=function(b){var d=this._props,c,e;for(c in _beziers)if(c in b){delete this._beziers[c];delete this._func[c];for(e=d.length;-1<--e;)d[e]===c&&d.splice(e,1)}return y.prototype._kill.call(this,b)};y.activate([w]);
return w},!0);_gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(y){var w=function(){y.call(this,"css");this._overwriteProps.pop()},i=w.prototype=new y("css");i.constructor=w;w.API=2;w.suffixMap={top:"px",right:"px",bottom:"px",left:"px",width:"px",height:"px",fontSize:"px",padding:"px",margin:"px"};var q=/[^\d\-\.]/g,s=/(\d|\-|\+|=|#|\.)*/g,c=/(\d|\.)+/g,t=/opacity *= *([^)]*)/,e=/opacity:([^;]*)/,b=/([A-Z])/g,h=/-([a-z])/gi,d=function(b,g){return g.toUpperCase()},f=/(Left|Right|Width)/i,
k=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,A=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,L=Math.PI/180,O=180/Math.PI,x={},m=document,B=m.createElement("div"),p=navigator.userAgent,P,M,N,E,C,n=p.indexOf("Android"),D=m.createElement("div");N=-1!==p.indexOf("Safari")&&-1===p.indexOf("Chrome")&&(-1===n||3<Number(p.substr(n+8,1)));/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(p);E=parseFloat(RegExp.$1);D.innerHTML="<a style='top:1px;opacity:.55;'>a</a>";C=(p=D.getElementsByTagName("a")[0])?/^0.55/.test(p.style.opacity):
!1;var H=function(b){if(!b||""===b)return R.black;if(R[b])return R[b];if("number"===typeof b)return[b>>16,b>>8&255,b&255];if("#"===b.charAt(0)){if(4===b.length)var g=b.charAt(1),d=b.charAt(2),b=b.charAt(3),b="#"+g+g+d+d+b+b;b=parseInt(b.substr(1),16);return[b>>16,b>>8&255,b&255]}return b.match(c)||R.transparent},G=function(b){return t.test("string"===typeof b?b:(b.currentStyle?b.currentStyle.filter:b.style.filter)||"")?parseFloat(RegExp.$1)/100:1},z=m.defaultView?m.defaultView.getComputedStyle:function(){},
F=function(g,d,c,v){return!C&&"opacity"===d?G(g):!v&&g.style[d]?g.style[d]:(c=c||z(g,null))?(g=c.getPropertyValue(d.replace(b,"-$1").toLowerCase()))||c.length?g:c[d]:g.currentStyle?(c=g.currentStyle,v=c[d],!v&&"backgroundPosition"===d?c[d+"X"]+" "+c[d+"Y"]:v):null},g=function(b,g){var c={},v;if(g=g||z(b,null))if(v=g.length)for(;-1<--v;)c[g[v].replace(h,d)]=g.getPropertyValue(g[v]);else for(v in g)c[v]=g[v];else if(g=b.currentStyle||b.style)for(v in g)c[v.replace(h,d)]=g[v];C||(c.opacity=G(b));v=S(b,
g,!1);c.rotation=v.rotation*O;c.skewX=v.skewX*O;c.scaleX=v.scaleX;c.scaleY=v.scaleY;c.x=v.x;c.y=v.y;null!=c.filters&&delete c.filters;return c},u=function(b,g,d,c){var v={},u,n;for(n in g)if("cssText"!==n&&"length"!==n&&isNaN(n)&&b[n]!=(u=g[n]))if(u!==J&&("number"===typeof u||"string"===typeof u))v[n]=(""===u||"auto"===u)&&"string"===typeof b[n]&&""!==b[n].replace(q,"")?0:u,c&&c.props.push(n);if(d)for(n in d)"className"!==n&&(v[n]=d[n]);return v},v={scaleX:1,scaleY:1,x:1,y:1,rotation:1,shortRotation:1,
skewX:1,skewY:1,scale:1},I="",K="",J=function(b,g){var g=g||B,d=g.style,c,v;if(void 0!==d[b])return b;b=b.substr(0,1).toUpperCase()+b.substr(1);c=["O","Moz","ms","Ms","Webkit"];for(v=5;-1<--v&&void 0===d[c[v]+b];);return 0<=v?(K=3===v?"ms":c[v],I="-"+K.toLowerCase()+"-",K+b):null}("transform"),W=I+"transform",S=function(b,g,d){var c=b._gsTransform,v;J?v=F(b,W,g,!0):b.currentStyle&&(v=(v=b.currentStyle.filter.match(k))&&4===v.length?v[0].substr(4)+","+Number(v[2].substr(4))+","+Number(v[1].substr(4))+
","+v[3].substr(4)+","+(c?c.x:0)+","+(c?c.y:0):null);var g=(v||"").replace(/[^\d\-\.e,]/g,"").split(","),u=(v=6<=g.length)?Number(g[0]):1,n=v?Number(g[1]):0,f=v?Number(g[2]):0,e=v?Number(g[3]):1,c=d?c||{skewY:0}:{skewY:0},h=0>c.scaleX;c.x=v?Number(g[4]):0;c.y=v?Number(g[5]):0;c.scaleX=Math.sqrt(u*u+n*n);c.scaleY=Math.sqrt(e*e+f*f);c.rotation=u||n?Math.atan2(n,u):c.rotation||0;c.skewX=f||e?Math.atan2(f,e)+c.rotation:c.skewX||0;Math.abs(c.skewX)>Math.PI/2&&(h?(c.scaleX*=-1,c.skewX+=0>=c.rotation?Math.PI:
-Math.PI,c.rotation+=0>=c.rotation?Math.PI:-Math.PI):(c.scaleY*=-1,c.skewX+=0>=c.skewX?Math.PI:-Math.PI));if(1E-6>c.rotation&&-1E-6<c.rotation&&(u||n))c.rotation=0;if(1E-6>c.skewX&&-1E-6<c.skewX&&(n||f))c.skewX=0;d&&(b._gsTransform=c);return c},X={width:["Left","Right"],height:["Top","Bottom"]},Y=["marginLeft","marginRight","marginTop","marginBottom"],Q=function(b,g,c,d,v){if("px"===d||!d)return c;if("auto"===d||!c)return 0;var u=f.test(g),n=b,e=B.style,h=0>c;h&&(c=-c);e.cssText="border-style:solid; border-width:0; position:absolute; line-height:0;";
"%"===d||"em"===d||!n.appendChild?(n=b.parentNode||m.body,e[u?"width":"height"]=c+d):e[u?"borderLeftWidth":"borderTopWidth"]=c+d;n.appendChild(B);u=parseFloat(B[u?"offsetWidth":"offsetHeight"]);n.removeChild(B);0===u&&!v&&(u=Q(b,g,c,d,!0));return h?-u:u},V=function(b,g){if(null==b||""===b||"auto"===b||"auto auto"===b)b="0 0";var g=g||{},c=-1!==b.indexOf("left")?"0%":-1!==b.indexOf("right")?"100%":b.split(" ")[0],d=-1!==b.indexOf("top")?"0%":-1!==b.indexOf("bottom")?"100%":b.split(" ")[1];null==d?
d="0":"center"===d&&(d="50%");"center"===c&&(c="50%");g.oxp=-1!==c.indexOf("%");g.oyp=-1!==d.indexOf("%");g.oxr="="===c.charAt(1);g.oyr="="===d.charAt(1);g.ox=parseFloat(c.replace(q,""));g.oy=parseFloat(d.replace(q,""));return g},T=function(b,g){return null==b?g:"string"===typeof b&&1===b.indexOf("=")?Number(b.split("=").join(""))+g:Number(b)},U=function(b,g){var c=-1===b.indexOf("rad")?L:1,d=1===b.indexOf("="),b=Number(b.replace(q,""))*c;return d?b+g:b},R={aqua:[0,255,255],lime:[0,255,0],silver:[192,
192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]};i._onInitTween=function(b,c,d){if(!b.nodeType)return!1;this._target=b;this._tween=d;this._classData=this._transform=null;P=c.autoRound;var v=this._style=b.style,n=z(b,""),f,h;if(M&&""===
v.zIndex&&(h=F(b,"zIndex",n),"auto"===h||""===h))v.zIndex=0;"string"===typeof c?(f=v.cssText,d=g(b,n),v.cssText=f+";"+c,h=u(d,g(b)),!C&&e.test(c)&&(h.opacity=parseFloat(RegExp.$1)),c=h,v.cssText=f):c.className&&(f=b.className,this._classData={b:f,e:"="!==c.className.charAt(1)?c.className:"+"===c.className.charAt(0)?b.className+" "+c.className.substr(2):b.className.split(c.className.substr(2)).join(""),props:[]},d._duration?(d=g(b,n),b.className=this._classData.e,c=u(d,g(b),c,this._classData),b.className=
f):c={});this._parseVars(c,b,n,c.suffixMap||w.suffixMap);return!0};i._parseVars=function(b,g,c,d){var u=this._style,n,f,e,h,k,i,p;for(n in b)if(f=b[n],"transform"===n||n===J)this._parseTransform(g,f,c,d);else if(v[n]||"transformOrigin"===n)this._parseTransform(g,b,c,d);else{if("alpha"===n||"autoAlpha"===n)n="opacity";else if("margin"===n||"padding"===n){f=(f+"").split(" ");k=f.length;e={};e[n+"Top"]=f[0];e[n+"Right"]=1<k?f[1]:f[0];e[n+"Bottom"]=4===k?f[2]:f[0];e[n+"Left"]=4===k?f[3]:2===k?f[1]:f[0];
this._parseVars(e,g,c,d);continue}else if("backgroundPosition"===n||"backgroundSize"===n){e=V(f);p=V(h=F(g,n,c));this._firstPT=e={_next:this._firstPT,t:u,p:n,b:h,f:!1,n:"css_"+n,type:3,s:p.ox,c:e.oxr?e.ox:e.ox-p.ox,ys:p.oy,yc:e.oyr?e.oy:e.oy-p.oy,sfx:e.oxp?"%":"px",ysfx:e.oyp?"%":"px",r:!e.oxp&&!1!==b.autoRound};e.e=e.s+e.c+e.sfx+" "+(e.ys+e.yc)+e.ysfx;continue}else if("border"===n){f=(f+"").split(" ");this._parseVars({borderWidth:f[0],borderStyle:f[1]||"none",borderColor:f[2]||"#000000"},g,c,d);
continue}else if("bezier"===n){this._parseBezier(f,g,c,d);continue}else if("autoRound"===n)continue;h=F(g,n,c);h=null!=h?h+"":"";this._firstPT=e={_next:this._firstPT,t:u,p:n,b:h,f:!1,n:"css_"+n,sfx:"",r:!1,type:0};"opacity"===n&&null!=b.autoAlpha&&("1"===h&&"hidden"===F(g,"visibility",c)&&(h=e.b="0"),this._firstPT=e._prev={_next:e,t:u,p:"visibility",f:!1,n:"css_visibility",r:!1,type:-1,b:0!==Number(h)?"visible":"hidden",i:"visible",e:0===Number(f)?"hidden":"visible"},this._overwriteProps.push("css_visibility"));
k="string"===typeof f;if("color"===n||"fill"===n||"stroke"===n||-1!==n.indexOf("Color")||k&&!f.indexOf("rgb(")){if(k=H(h),f=H(f),e.e=e.i=(3<f.length?"rgba(":"rgb(")+f.join(",")+")",e.b=(3<k.length?"rgba(":"rgb(")+k.join(",")+")",e.s=Number(k[0]),e.c=Number(f[0])-e.s,e.gs=Number(k[1]),e.gc=Number(f[1])-e.gs,e.bs=Number(k[2]),e.bc=Number(f[2])-e.bs,e.type=1,3<k.length||3<f.length)C?(e.as=4>k.length?1:Number(k[3]),e.ac=(4>f.length?1:Number(f[3]))-e.as,e.type=2):(0==f[3]&&(e.e=e.i="transparent",e.type=
-1),0==k[3]&&(e.b="transparent"))}else{i=h.replace(s,"");if(""===h||"auto"===h)if("width"===n||"height"===n){var I=n;i=g;p=c;h=parseFloat("width"===I?i.offsetWidth:i.offsetHeight);var I=X[I],m=I.length;for(p=p||z(i,null);-1<--m;)h-=parseFloat(F(i,"padding"+I[m],p,!0))||0,h-=parseFloat(F(i,"border"+I[m]+"Width",p,!0))||0;p=h;i="px"}else p="opacity"!==n?0:1,i="";else p=-1===h.indexOf(" ")?parseFloat(h.replace(q,"")):NaN;k?(k="="===f.charAt(1),h=f.replace(s,""),f=-1===f.indexOf(" ")?parseFloat(f.replace(q,
"")):NaN):(k=!1,h="");""===h&&(h=d[n]||i);e.e=f||0===f?(k?f+p:f)+h:b[n];if(i!==h&&""!==h&&(f||0===f))if(p||0===p)if(p=Q(g,n,p,i),"%"===h?(p/=Q(g,n,100,"%")/100,100<p&&(p=100)):"em"===h?p/=Q(g,n,1,"em"):(f=Q(g,n,f,h),h="px"),k&&(f||0===f))e.e=f+p+h;if((p||0===p)&&(f||0===f)&&(e.c=k?f:f-p))if(e.s=p,e.sfx=h,"opacity"===n)C||(e.type=4,e.p="filter",e.b="alpha(opacity="+100*e.s+")",e.e="alpha(opacity="+100*(e.s+e.c)+")",e.dup=null!=b.autoAlpha,this._style.zoom=1);else{if(!1!==P&&("px"===h||"zIndex"===n))e.r=
!0}else e.type=-1,e.i="display"===n&&"none"===e.e?e.b:e.e,e.s=e.c=0}this._overwriteProps.push("css_"+n);e._next&&(e._next._prev=e)}};i._parseTransform=function(b,g,c){if(!this._transform){var d=this._transform=S(b,c,!0),n=this._style,e,f,u;if("object"===typeof g){e={scaleX:T(null!=g.scaleX?g.scaleX:g.scale,d.scaleX),scaleY:T(null!=g.scaleY?g.scaleY:g.scale,d.scaleY),x:T(g.x,d.x),y:T(g.y,d.y)};null!=g.shortRotation?(e.rotation="number"===typeof g.shortRotation?g.shortRotation*L:U(g.shortRotation,d.rotation),
f=(e.rotation-d.rotation)%(2*Math.PI),f!==f%Math.PI&&(f+=Math.PI*(0>f?2:-2)),e.rotation=d.rotation+f):e.rotation=null==g.rotation?d.rotation:"number"===typeof g.rotation?g.rotation*L:U(g.rotation,d.rotation);e.skewX=null==g.skewX?d.skewX:"number"===typeof g.skewX?g.skewX*L:U(g.skewX,d.skewX);e.skewY=null==g.skewY?d.skewY:"number"===typeof g.skewY?g.skewY*L:U(g.skewY,d.skewY);if(f=e.skewY-d.skewY)e.skewX+=f,e.rotation+=f;1E-6>e.skewY&&-1E-6<e.skewY&&(e.skewY=0);1E-6>e.skewX&&-1E-6<e.skewX&&(e.skewX=
0);1E-6>e.rotation&&-1E-6<e.rotation&&(e.rotation=0);if(null!=(g=g.transformOrigin))J?(u=J+"Origin",this._firstPT=g={_next:this._firstPT,t:n,p:u,s:0,c:0,n:u,f:!1,r:!1,b:n[u],e:g,i:g,type:-1,sfx:""},g._next&&(g._next._prev=g)):V(g,d)}else if("string"===typeof g&&J)f=n[J],n[J]=g,e=S(b,null,!1),n[J]=f;else return;if(J){if(N&&(M=!0,""===n.WebkitBackfaceVisibility&&(n.WebkitBackfaceVisibility="hidden"),""===n.zIndex&&(f=F(b,"zIndex",c),"auto"===f||""===f)))n.zIndex=0}else n.zoom=1;for(u in v)if((d[u]!==
e[u]||null!=x[u])&&"shortRotation"!==u&&"scale"!==u)this._firstPT=g={_next:this._firstPT,t:d,p:u,s:d[u],c:e[u]-d[u],n:u,f:!1,r:!1,b:d[u],e:e[u],type:0,sfx:0},g._next&&(g._next._prev=g),this._overwriteProps.push("css_"+u)}};i._parseBezier=function(b,g,c,d){if(window.com.greensock.plugins.BezierPlugin){b instanceof Array&&(b={values:b});var n=b.values||[],v=n.length,e=[],f=this._bezier={_pt:[]},u=f._proxy={},h=0,k=0,i={},p=v-1,q=x,s=f._plugin=new window.com.greensock.plugins.BezierPlugin,I,m,K,t,w;
for(I=0;I<v;I++){t={};this._transform=null;K=this._firstPT;this._parseVars(x=n[I],g,c,d);m=this._firstPT;if(0===I){for(w=this._transform;m!==K;)u[m.p]=m.s,f._pt[k++]=i[m.p]=m,1===m.type||2===m.type?(u[m.p+"_g"]=m.gs,u[m.p+"_b"]=m.bs,2===m.type&&(u[m.p+"_a"]=m.as)):3===m.type&&(u[m.p+"_y"]=m.ys),m=m._next;m=this._firstPT}else this._firstPT=K,K._prev&&(K._prev._next=null),K=K._prev=null;for(;m!==K;)i[m.p]&&(t[m.p]=m.s+m.c,I===p&&(i[m.p].e=m.e),1===m.type||2===m.type?(t[m.p+"_g"]=m.gs+m.gc,t[m.p+"_b"]=
m.bs+m.bc,2===m.type&&(t[m.p+"_a"]=m.as+m.ac)):3===m.type&&(t[m.p+"_y"]=m.ys+m.yc),0===I&&(m.c=m.ac=m.gc=m.bc=m.yc=0)),m=m._next;e[h++]=t}this._transform=w;x=q;b.values=e;0===b.autoRotate&&(b.autoRotate=!0);b.autoRotate&&!(b.autoRotate instanceof Array)&&(I=!0==b.autoRotate?0:Number(b.autoRotate)*Math.PI/180,b.autoRotate=null!=e[0].left?[["left","top","rotation",I,!0]]:null!=e[0].x?[["x","y","rotation",I,!0]]:!1);if((f._autoRotate=b.autoRotate)&&!w)this._transform=S(g,c,!0);s._onInitTween(u,b,this._tween);
b.values=n}else console.log("Error: BezierPlugin not loaded.")};i.setRatio=function(b){var g=this._firstPT,c=this._bezier,d=1E-6,n,v;if(c){c._plugin.setRatio(b);var e=c._pt,f=c._proxy;for(v=e.length;-1<--v;)g=e[v],g.s=f[g.p],1===g.type||2===g.type?(g.gs=f[g.p+"_g"],g.bs=f[g.p+"_b"],2===g.type&&(g.as=f[g.p+"_a"])):3===g.type&&(g.ys=f[g.p+"_y"]);c._autoRotate&&(this._transform.rotation=f.rotation)}if(1===b&&(this._tween._time===this._tween._duration||0===this._tween._time))for(;g;)g.t[g.p]=g.e,4===
g.type&&1===g.s+g.c&&(this._style.removeAttribute("filter"),F(this._target,"filter")&&(g.t[g.p]=g.e)),g=g._next;else if(b||!(this._tween._time===this._tween._duration||0===this._tween._time))for(;g;)n=g.c*b+g.s,g.r?n=0<n?n+0.5>>0:n-0.5>>0:n<d&&n>-d&&(n=0),g.type?1===g.type?g.t[g.p]="rgb("+(n>>0)+", "+(g.gs+b*g.gc>>0)+", "+(g.bs+b*g.bc>>0)+")":2===g.type?g.t[g.p]="rgba("+(n>>0)+", "+(g.gs+b*g.gc>>0)+", "+(g.bs+b*g.bc>>0)+", "+(g.as+b*g.ac)+")":-1===g.type?g.t[g.p]=g.i:3===g.type?(c=g.ys+b*g.yc,g.r&&
(c=0<c?c+0.5>>0:c-0.5>>0),g.t[g.p]=n+g.sfx+" "+c+g.ysfx):(g.dup&&(g.t.filter=g.t.filter||"alpha(opacity=100)"),g.t.filter=-1===g.t.filter.indexOf("opacity")?g.t.filter+(" alpha(opacity="+(100*n>>0)+")"):g.t.filter.replace(t,"opacity="+(100*n>>0))):g.t[g.p]=n+g.sfx,g=g._next;else for(;g;)g.t[g.p]=g.b,4===g.type&&1===g.s&&(this._style.removeAttribute("filter"),F(this._target,"filter")&&(g.t[g.p]=g.b)),g=g._next;if(this._transform)if(g=this._transform,J&&!g.rotation&&!g.skewX)this._style[J]=(g.x||g.y?
"translate("+g.x+"px,"+g.y+"px) ":"")+(1!==g.scaleX||1!==g.scaleY?"scale("+g.scaleX+","+g.scaleY+")":"")||"translate(0px,0px)";else{var e=J?g.rotation:-g.rotation,u=J?e-g.skewX:e+g.skewX,c=Math.cos(e)*g.scaleX,e=Math.sin(e)*g.scaleX,f=Math.sin(u)*-g.scaleY,u=Math.cos(u)*g.scaleY,h;c<d&&c>-d&&(c=0);e<d&&e>-d&&(e=0);f<d&&f>-d&&(f=0);u<d&&u>-d&&(u=0);if(J)this._style[J]="matrix("+c+","+e+","+f+","+u+","+g.x+","+g.y+")";else if(h=this._target.currentStyle){d=e;e=-f;f=-d;d=h.filter;this._style.filter=
"";v=this._target.offsetWidth;n=this._target.offsetHeight;var k="absolute"!==h.position,i="progid:DXImageTransform.Microsoft.Matrix(M11="+c+", M12="+e+", M21="+f+", M22="+u,m=g.x,p=g.y,q,I;null!=g.ox&&(q=(g.oxp?0.01*v*g.ox:g.ox)-v/2,I=(g.oyp?0.01*n*g.oy:g.oy)-n/2,m=q-(q*c+I*e)+g.x,p=I-(q*f+I*u)+g.y);if(k)q=v/2,I=n/2,i+=", Dx="+(q-(q*c+I*e)+m)+", Dy="+(I-(q*f+I*u)+p)+")";else{var K=8>E?1:-1;q=g.ieOffsetX||0;I=g.ieOffsetY||0;g.ieOffsetX=Math.round((v-((0>c?-c:c)*v+(0>e?-e:e)*n))/2+m);g.ieOffsetY=Math.round((n-
((0>u?-u:u)*n+(0>f?-f:f)*v))/2+p);for(v=0;4>v;v++)m=Y[v],n=h[m],n=-1!==n.indexOf("px")?parseFloat(n):Q(this._target,m,parseFloat(n),n.replace(s,""))||0,p=n!==g[m]?2>v?-g.ieOffsetX:-g.ieOffsetY:2>v?q-g.ieOffsetX:I-g.ieOffsetY,this._style[m]=(g[m]=Math.round(n-p*(0===v||2===v?1:K)))+"px";i+=", sizingMethod='auto expand')"}this._style.filter=-1!==d.indexOf("DXImageTransform.Microsoft.Matrix(")?d.replace(A,i):i+" "+d;if(0===b||1===b)if(1===c&&0===e&&0===f&&1===u&&(!k||-1!==i.indexOf("Dx=0, Dy=0")))(!t.test(d)||
100===parseFloat(RegExp.$1))&&this._style.removeAttribute("filter")}}if(this._classData)if(g=this._classData,1===b&&(this._tween._time===this._tween._duration||0===this._tween._time)){for(v=g.props.length;-1<--v;)this._style[g.props[v]]="";this._target.className=g.e}else this._target.className!==g.b&&(this._target.className=g.b)};i._kill=function(g){var b=g,c;if(g.autoAlpha||g.alpha){b={};for(c in g)b[c]=g[c];b.opacity=1;b.autoAlpha&&(b.visibility=1)}return y.prototype._kill.call(this,b)};y.activate([w]);
return w},!0);_gsDefine("plugins.RoundPropsPlugin",["plugins.TweenPlugin"],function(y){var w=function(){y.call(this,"roundProps",-1);this._overwriteProps.length=0},i=w.prototype=new y("roundProps",-1);i.constructor=w;w.API=2;i._onInitTween=function(i,s,c){this._tween=c;return!0};i._onInitAllProps=function(){for(var i=this._tween,s=i.vars.roundProps instanceof Array?i.vars.roundProps:i.vars.roundProps.split(","),c=s.length,t={},e=i._propLookup.roundProps,b,h,d;-1<--c;)t[s[c]]=1;for(c=s.length;-1<--c;){b=
s[c];for(h=i._firstPT;h;)d=h._next,h.pg?h.t._roundProps(t,!0):h.n===b&&(this._add(h.t,b,h.s,h.c),d&&(d._prev=h._prev),h._prev?h._prev._next=d:_tween._firstPT===h&&(i._firstPT=d),h._next=h._prev=null,i._propLookup[b]=e),h=d}return!1};i._add=function(i,s,c,t){this._addTween(i,s,c,c+t,s,!0);this._overwriteProps.push(s)};y.activate([w]);return w},!0);_gsDefine("easing.Back",["easing.Ease"],function(y){var w=window.com.greensock._class,i=function(b,c){var d=w("easing."+b,function(){},!0),e=d.prototype=
new y;e.constructor=d;e.getRatio=c;return d},q=function(b,c){var d=w("easing."+b,function(b){this._p1=b||0===b?b:1.70158;this._p2=1.525*this._p1},!0),e=d.prototype=new y;e.constructor=d;e.getRatio=c;e.config=function(b){return new d(b)};return d},s=q("BackOut",function(b){return(b-=1)*b*((this._p1+1)*b+this._p1)+1}),c=q("BackIn",function(b){return b*b*((this._p1+1)*b-this._p1)}),q=q("BackInOut",function(b){return 1>(b*=2)?0.5*b*b*((this._p2+1)*b-this._p2):0.5*((b-=2)*b*((this._p2+1)*b+this._p2)+2)}),
t=i("BounceOut",function(b){return b<1/2.75?7.5625*b*b:b<2/2.75?7.5625*(b-=1.5/2.75)*b+0.75:b<2.5/2.75?7.5625*(b-=2.25/2.75)*b+0.9375:7.5625*(b-=2.625/2.75)*b+0.984375}),e=i("BounceIn",function(b){return(b=1-b)<1/2.75?1-7.5625*b*b:b<2/2.75?1-(7.5625*(b-=1.5/2.75)*b+0.75):b<2.5/2.75?1-(7.5625*(b-=2.25/2.75)*b+0.9375):1-(7.5625*(b-=2.625/2.75)*b+0.984375)}),b=i("BounceInOut",function(b){var c=0.5>b,b=c?1-2*b:2*b-1,b=b<1/2.75?7.5625*b*b:b<2/2.75?7.5625*(b-=1.5/2.75)*b+0.75:b<2.5/2.75?7.5625*(b-=2.25/
2.75)*b+0.9375:7.5625*(b-=2.625/2.75)*b+0.984375;return c?0.5*(1-b):0.5*b+0.5}),h=i("CircOut",function(b){return Math.sqrt(1-(b-=1)*b)}),d=i("CircIn",function(b){return-(Math.sqrt(1-b*b)-1)}),f=i("CircInOut",function(b){return 1>(b*=2)?-0.5*(Math.sqrt(1-b*b)-1):0.5*(Math.sqrt(1-(b-=2)*b)+1)}),k=2*Math.PI,A=function(b,c,d){var e=w("easing."+b,function(b,c){this._p1=b||1;this._p2=c||d;this._p3=this._p2/k*(Math.asin(1/this._p1)||0)},!0),b=e.prototype=new y;b.constructor=e;b.getRatio=c;b.config=function(b,
c){return new e(b,c)};return e},L=A("ElasticOut",function(b){return this._p1*Math.pow(2,-10*b)*Math.sin((b-this._p3)*k/this._p2)+1},0.3),O=A("ElasticIn",function(b){return-(this._p1*Math.pow(2,10*(b-=1))*Math.sin((b-this._p3)*k/this._p2))},0.3),A=A("ElasticInOut",function(b){return 1>(b*=2)?-0.5*this._p1*Math.pow(2,10*(b-=1))*Math.sin((b-this._p3)*k/this._p2):0.5*this._p1*Math.pow(2,-10*(b-=1))*Math.sin((b-this._p3)*k/this._p2)+1},0.45),x=i("ExpoOut",function(b){return 1-Math.pow(2,-10*b)}),m=i("ExpoIn",
function(b){return Math.pow(2,10*(b-1))-0.001}),B=i("ExpoInOut",function(b){return 1>(b*=2)?0.5*Math.pow(2,10*(b-1)):0.5*(2-Math.pow(2,-10*(b-1)))}),p=Math.PI/2,P=i("SineOut",function(b){return Math.sin(b*p)}),M=i("SineIn",function(b){return-Math.cos(b*p)+1}),i=i("SineInOut",function(b){return-0.5*(Math.cos(Math.PI*b)-1)}),N=w("easing.SlowMo",function(b,c,d){null==b?b=0.7:1<b&&(b=1);this._p=1!=b?c||0===c?c:0.7:0;this._p1=(1-b)/2;this._p2=b;this._p3=this._p1+this._p2;this._calcEnd=!0===d},!0),E=N.prototype=
new y;E.constructor=N;E.getRatio=function(b){var c=b+(0.5-b)*this._p;return b<this._p1?this._calcEnd?1-(b=1-b/this._p1)*b:c-(b=1-b/this._p1)*b*b*b*c:b>this._p3?this._calcEnd?1-(b=(b-this._p3)/this._p1)*b:c+(b-c)*(b=(b-this._p3)/this._p1)*b*b*b:this._calcEnd?1:c};N.ease=new N(0.7,0.7);E.config=N.config=function(b,c,d){return new N(b,c,d)};var C=w("easing.SteppedEase",function(b){b=b||1;this._p1=1/b;this._p2=b+1},!0),E=C.prototype=new y;E.constructor=C;E.getRatio=function(b){0>b?b=0:1<=b&&(b=0.999999999);
return(this._p2*b>>0)*this._p1};E.config=C.config=function(b){return new C(b)};w("easing.Bounce",{easeOut:new t,easeIn:new e,easeInOut:new b},!0);w("easing.Circ",{easeOut:new h,easeIn:new d,easeInOut:new f},!0);w("easing.Elastic",{easeOut:new L,easeIn:new O,easeInOut:new A},!0);w("easing.Expo",{easeOut:new x,easeIn:new m,easeInOut:new B},!0);w("easing.Sine",{easeOut:new P,easeIn:new M,easeInOut:new i},!0);return{easeOut:new s,easeIn:new c,easeInOut:new q}},!0)});
(function(y){var w=function(b){var b=b.split("."),c=y,d;for(d=0;d<b.length;d++)c[b[d]]=c=c[b[d]]||{};return c},i=w("com.greensock"),q,s,c,t,e,b={},h=function(g,c,d,e){this.sc=b[g]?b[g].sc:[];b[g]=this;this.gsClass=null;this.def=d;var f=c||[],i=[];this.check=function(c){for(var u=f.length,k=0,m;-1<--u;)(m=b[f[u]]||new h(f[u])).gsClass?i[u]=m.gsClass:(k++,c&&m.sc.push(this));if(0===k&&d){var c=("com.greensock."+g).split("."),u=c.pop(),n=w(c.join("."))[u]=this.gsClass=d.apply(d,i);e&&((y.GreenSockGlobals||
y)[u]=n,"function"===typeof define&&define.amd?define((y.GreenSockAMDPath?y.GreenSockAMDPath+"/":"")+g.split(".").join("/"),[],function(){return n}):"undefined"!==typeof module&&module.exports&&(module.exports=n));for(u=0;u<this.sc.length;u++)this.sc[u].check(!1)}};this.check(!0)},d=i._class=function(b,c,d){new h(b,[],function(){return c},d);return c};y._gsDefine=function(b,c,d,e){return new h(b,c,d,e)};var f=[0,0,1,1],k=[],A=d("easing.Ease",function(b,c,d,e){this._func=b;this._type=d||0;this._power=
e||0;this._params=c?f.concat(c):f},!0);c=A.prototype;c._calcEnd=!1;c.getRatio=function(b){if(this._func)return this._params[0]=b,this._func.apply(null,this._params);var c=this._type,d=this._power,e=1===c?1-b:2===c?b:0.5>b?2*b:2*(1-b);1===d?e*=e:2===d?e*=e*e:3===d?e*=e*e*e:4===d&&(e*=e*e*e*e);return 1===c?1-e:2===c?e:0.5>b?e/2:1-e/2};q=["Linear","Quad","Cubic","Quart","Quint"];for(s=q.length;-1<--s;)c=d("easing."+q[s],function(){},!0),t=d("easing.Power"+s,function(){},!0),c.easeOut=t.easeOut=new A(null,
null,1,s),c.easeIn=t.easeIn=new A(null,null,2,s),c.easeInOut=t.easeInOut=new A(null,null,3,s);d("easing.Strong",i.easing.Power4,!0);i.easing.Linear.easeNone=i.easing.Linear.easeIn;c=d("events.EventDispatcher",function(b){this._listeners={};this._eventTarget=b||this}).prototype;c.addEventListener=function(b,c,d,e,f){var f=f||0,h=this._listeners[b],i=0,k;null==h&&(this._listeners[b]=h=[]);for(k=h.length;-1<--k;)b=h[k],b.c===c?h.splice(k,1):0===i&&b.pr<f&&(i=k+1);h.splice(i,0,{c:c,s:d,up:e,pr:f})};c.removeEventListener=
function(b,c){var d=this._listeners[b];if(d)for(var e=d.length;-1<--e;)if(d[e].c===c){d.splice(e,1);break}};c.dispatchEvent=function(b){var c=this._listeners[b];if(c)for(var d=c.length,e,f=this._eventTarget;-1<--d;)e=c[d],e.up?e.c.call(e.s||f,{type:b,target:f}):e.c.call(e.s||f)};var L=y.requestAnimationFrame,O=y.cancelAnimationFrame,x=Date.now||function(){return(new Date).getTime()};q=["ms","moz","webkit","o"];for(s=q.length;-1<--s&&!L;)L=y[q[s]+"RequestAnimationFrame"],O=y[q[s]+"CancelAnimationFrame"]||
y[q[s]+"CancelRequestAnimationFrame"];O||(O=function(b){y.clearTimeout(b)});d("Ticker",function(b,c){this.frame=this.time=0;var d=this,e=x(),f=!1!==c,h,i,k,m,n;this.tick=function(){d.time=(x()-e)/1E3;if(!h||d.time>=n)d.frame++,n=d.time+m-(d.time-n)-5E-4,n<=d.time&&(n=d.time+0.001),d.dispatchEvent("tick");k=i(d.tick)};this.fps=function(b){if(!arguments.length)return h;h=b;m=1/(h||60);n=this.time+m;i=0===h?function(){}:!f||!L?function(b){return y.setTimeout(b,1E3*(n-d.time)+1>>0||1)}:L;O(k);k=i(d.tick)};
this.useRAF=function(b){if(!arguments.length)return f;f=b;this.fps(h)};this.fps(b)});c=i.Ticker.prototype=new i.events.EventDispatcher;c.constructor=i.Ticker;var m=d("core.Animation",function(b,c){this.vars=c||{};this._duration=this._totalDuration=b||0;this._delay=Number(this.vars.delay)||0;this._timeScale=1;this._active=!0==this.vars.immediateRender;this.data=this.vars.data;this._reversed=!0==this.vars.reversed;if(D){e||(B.tick(),e=!0);var d=this.vars.useFrames?n:D;d.insert(this,d._time);this.vars.paused&&
this.paused(!0)}}),B=m.ticker=new i.Ticker;c=m.prototype;c._dirty=c._gc=c._initted=c._paused=!1;c._totalTime=c._time=0;c._rawPrevTime=-1;c._next=c._last=c._onUpdate=c._timeline=c.timeline=null;c._paused=!1;c.play=function(b,c){arguments.length&&this.seek(b,c);this.reversed(!1);return this.paused(!1)};c.pause=function(b,c){arguments.length&&this.seek(b,c);return this.paused(!0)};c.resume=function(b,c){arguments.length&&this.seek(b,c);return this.paused(!1)};c.seek=function(b,c){return this.totalTime(Number(b),
!1!=c)};c.restart=function(b,c){this.reversed(!1);this.paused(!1);return this.totalTime(b?-this._delay:0,!1!=c)};c.reverse=function(b,c){arguments.length&&this.seek(b||this.totalDuration(),c);this.reversed(!0);return this.paused(!1)};c.render=function(){};c.invalidate=function(){return this};c._enabled=function(b,c){this._gc=!b;this._active=b&&!this._paused&&0<this._totalTime&&this._totalTime<this._totalDuration;!0!=c&&(b&&null==this.timeline?this._timeline.insert(this,this._startTime-this._delay):
!b&&null!=this.timeline&&this._timeline._remove(this,!0));return!1};c._kill=function(){return this._enabled(!1,!1)};c.kill=function(b,c){this._kill(b,c);return this};c._uncache=function(b){for(b=b?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this};c.eventCallback=function(b,c,d,e){if(null==b)return null;if("on"===b.substr(0,2)){if(1===arguments.length)return this.vars[b];if(null==c)delete this.vars[b];else if(this.vars[b]=c,this.vars[b+"Params"]=d,this.vars[b+"Scope"]=e,d)for(var f=d.length;-1<
--f;)"{self}"===d[f]&&(d=this.vars[b+"Params"]=d.concat(),d[f]=this);"onUpdate"===b&&(this._onUpdate=c)}return this};c.delay=function(b){if(!arguments.length)return this._delay;this._timeline.smoothChildTiming&&this.startTime(this._startTime+b-this._delay);this._delay=b;return this};c.duration=function(b){if(!arguments.length)return this._dirty=!1,this._duration;this._duration=this._totalDuration=b;this._uncache(!0);this._timeline.smoothChildTiming&&this._active&&0!=b&&this.totalTime(this._totalTime*
(b/this._duration),!0);return this};c.totalDuration=function(b){this._dirty=!1;return!arguments.length?this._totalDuration:this.duration(b)};c.time=function(b,c){if(!arguments.length)return this._time;this._dirty&&this.totalDuration();b>this._duration&&(b=this._duration);return this.totalTime(b,c)};c.totalTime=function(b,c){if(!arguments.length)return this._totalTime;if(this._timeline){0>b&&(b+=this.totalDuration());if(this._timeline.smoothChildTiming&&(this._dirty&&this.totalDuration(),b>this._totalDuration&&
(b=this._totalDuration),this._startTime=(this._paused?this._pauseTime:this._timeline._time)-(!this._reversed?b:this._totalDuration-b)/this._timeScale,this._timeline._dirty||this._uncache(!1),!this._timeline._active))for(var d=this._timeline;d._timeline;)d.totalTime(d._totalTime,!0),d=d._timeline;this._gc&&this._enabled(!0,!1);this._totalTime!=b&&this.render(b,c,!1)}return this};c.startTime=function(b){if(!arguments.length)return this._startTime;b!=this._startTime&&(this._startTime=b,this.timeline&&
this.timeline._sortChildren&&this.timeline.insert(this,b-this._delay));return this};c.timeScale=function(b){if(!arguments.length)return this._timeScale;b=b||1E-6;if(this._timeline&&this._timeline.smoothChildTiming){var c=this._pauseTime||0==this._pauseTime?this._pauseTime:this._timeline._totalTime;this._startTime=c-(c-this._startTime)*this._timeScale/b}this._timeScale=b;return this._uncache(!1)};c.reversed=function(b){if(!arguments.length)return this._reversed;b!=this._reversed&&(this._reversed=b,
this.totalTime(this._totalTime,!0));return this};c.paused=function(b){if(!arguments.length)return this._paused;b!=this._paused&&this._timeline&&(!b&&this._timeline.smoothChildTiming&&(this._startTime+=this._timeline.rawTime()-this._pauseTime,this._uncache(!1)),this._pauseTime=b?this._timeline.rawTime():null,this._paused=b,this._active=!this._paused&&0<this._totalTime&&this._totalTime<this._totalDuration);this._gc&&(b||this._enabled(!0,!1));return this};i=d("core.SimpleTimeline",function(b){m.call(this,
0,b);this.autoRemoveChildren=this.smoothChildTiming=!0});c=i.prototype=new m;c.constructor=i;c.kill()._gc=!1;c._first=c._last=null;c._sortChildren=!1;c.insert=function(b,c){b._startTime=Number(c||0)+b._delay;b._paused&&this!==b._timeline&&(b._pauseTime=b._startTime+(this.rawTime()-b._startTime)/b._timeScale);b.timeline&&b.timeline._remove(b,!0);b.timeline=b._timeline=this;b._gc&&b._enabled(!0,!0);var d=this._last;if(this._sortChildren)for(var e=b._startTime;d&&d._startTime>e;)d=d._prev;d?(b._next=
d._next,d._next=b):(b._next=this._first,this._first=b);b._next?b._next._prev=b:this._last=b;b._prev=d;this._timeline&&this._uncache(!0);return this};c._remove=function(b,c){b.timeline===this&&(c||b._enabled(!1,!0),b.timeline=null,b._prev?b._prev._next=b._next:this._first===b&&(this._first=b._next),b._next?b._next._prev=b._prev:this._last===b&&(this._last=b._prev),this._timeline&&this._uncache(!0));return this};c.render=function(b,c){var d=this._first,e;for(this._totalTime=this._time=this._rawPrevTime=
b;d;){e=d._next;if(d._active||b>=d._startTime&&!d._paused)d._reversed?d.render((!d._dirty?d._totalDuration:d.totalDuration())-(b-d._startTime)*d._timeScale,c,!1):d.render((b-d._startTime)*d._timeScale,c,!1);d=e}};c.rawTime=function(){return this._totalTime};var p=d("TweenLite",function(b,c,d){m.call(this,c,d);if(null==b)throw"Cannot tween an undefined reference.";this.target=b;this._overwrite=null==this.vars.overwrite?C[p.defaultOverwrite]:"number"===typeof this.vars.overwrite?this.vars.overwrite>>
0:C[this.vars.overwrite];if((b instanceof Array||b.jquery)&&"object"===typeof b[0]){this._targets=b.slice(0);this._propLookup=[];this._siblings=[];for(b=0;b<this._targets.length;b++)d=this._targets[b],d.jquery?(this._targets.splice(b--,1),this._targets=this._targets.concat(d.constructor.makeArray(d))):(this._siblings[b]=H(d,this,!1),1===this._overwrite&&1<this._siblings[b].length&&G(d,this,null,1,this._siblings[b]))}else this._propLookup={},this._siblings=H(b,this,!1),1===this._overwrite&&1<this._siblings.length&&
G(b,this,null,1,this._siblings);(this.vars.immediateRender||0===c&&0===this._delay&&!1!=this.vars.immediateRender)&&this.render(-this._delay,!1,!0)},!0);c=p.prototype=new m;c.constructor=p;c.kill()._gc=!1;c.ratio=0;c._firstPT=c._targets=c._overwrittenProps=null;c._notifyPluginsOfEnabled=!1;p.version=12;p.defaultEase=c._ease=new A(null,null,1,1);p.defaultOverwrite="auto";p.ticker=B;var P=p._plugins={},M=p._tweenLookup={},N=0,E={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,
useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,orientToBezier:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1},C={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},n=m._rootFramesTimeline=new i,D=m._rootTimeline=new i;D._startTime=B.time;n._startTime=
B.frame;D._active=n._active=!0;m._updateRoot=function(){D.render((B.time-D._startTime)*D._timeScale,!1,!1);n.render((B.frame-n._startTime)*n._timeScale,!1,!1);if(!(B.frame%120)){var b,c,d;for(d in M){c=M[d].tweens;for(b=c.length;-1<--b;)c[b]._gc&&c.splice(b,1);0===c.length&&delete M[d]}}};B.addEventListener("tick",m._updateRoot);var H=function(b,c,d){var e=b._gsTweenID,f;if(!M[e||(b._gsTweenID=e="t"+N++)])M[e]={target:b,tweens:[]};if(c&&(b=M[e].tweens,b[f=b.length]=c,d))for(;-1<--f;)b[f]===c&&b.splice(f,
1);return M[e].tweens},G=function(b,c,d,e,f){var h,i,k;if(1===e||4<=e){b=f.length;for(h=0;h<b;h++)if((k=f[h])!==c)k._gc||k._enabled(!1,!1)&&(i=!0);else if(5===e)break;return i}var m=c._startTime+1E-10,n=[],p=0,q;for(h=f.length;-1<--h;)if(!((k=f[h])===c||k._gc||k._paused))k._timeline!==c._timeline?(q=q||z(c,0),0===z(k,q)&&(n[p++]=k)):k._startTime<=m&&k._startTime+k.totalDuration()/k._timeScale+1E-10>m&&((0===c._duration||!k._initted)&&2E-10>=m-k._startTime||(n[p++]=k));for(h=p;-1<--h;)if(k=n[h],2===
e&&k._kill(d,b)&&(i=!0),2!==e||!k._firstPT&&k._initted)k._enabled(!1,!1)&&(i=!0);return i},z=function(b,c){for(var d=b._timeline,e=d._timeScale,f=b._startTime;d._timeline;){f+=d._startTime;e*=d._timeScale;if(d._paused)return-100;d=d._timeline}f/=e;return f>c?f-c:!b._initted&&2E-10>f-c?1E-10:(f+=b.totalDuration()/b._timeScale/e)>c?0:f-c-1E-10};c._init=function(){this.vars.startAt&&(this.vars.startAt.overwrite=0,this.vars.startAt.immediateRender=!0,p.to(this.target,0,this.vars.startAt));var b,c;this._ease=
this.vars.ease instanceof A?this.vars.easeParams instanceof Array?this.vars.ease.config.apply(this.vars.ease,this.vars.easeParams):this.vars.ease:"function"===typeof this.vars.ease?new A(this.vars.ease,this.vars.easeParams):p.defaultEase;this._easeType=this._ease._type;this._easePower=this._ease._power;this._firstPT=null;if(this._targets)for(b=this._targets.length;-1<--b;){if(this._initProps(this._targets[b],this._propLookup[b]={},this._siblings[b],this._overwrittenProps?this._overwrittenProps[b]:
null))c=!0}else c=this._initProps(this.target,this._propLookup,this._siblings,this._overwrittenProps);c&&p._onPluginEvent("_onInitAllProps",this);this._overwrittenProps&&null==this._firstPT&&"function"!==typeof this.target&&this._enabled(!1,!1);if(this.vars.runBackwards)for(b=this._firstPT;b;)b.s+=b.c,b.c=-b.c,b=b._next;this._onUpdate=this.vars.onUpdate;this._initted=!0};c._initProps=function(b,c,d,e){var f,h,k,i,m,n;if(null==b)return!1;for(f in this.vars){if(E[f]){if("onStartParams"===f||"onUpdateParams"===
f||"onCompleteParams"===f||"onReverseCompleteParams"===f||"onRepeatParams"===f)if(m=this.vars[f])for(h=m.length;-1<--h;)"{self}"===m[h]&&(m=this.vars[f]=m.concat(),m[h]=this)}else if(P[f]&&(i=new P[f])._onInitTween(b,this.vars[f],this)){this._firstPT=n={_next:this._firstPT,t:i,p:"setRatio",s:0,c:1,f:!0,n:f,pg:!0,pr:i._priority};for(h=i._overwriteProps.length;-1<--h;)c[i._overwriteProps[h]]=this._firstPT;if(i._priority||i._onInitAllProps)k=!0;if(i._onDisable||i._onEnable)this._notifyPluginsOfEnabled=
!0}else this._firstPT=c[f]=n={_next:this._firstPT,t:b,p:f,f:"function"===typeof b[f],n:f,pg:!1,pr:0},n.s=!n.f?parseFloat(b[f]):b[f.indexOf("set")||"function"!==typeof b["get"+f.substr(3)]?f:"get"+f.substr(3)](),n.c="number"===typeof this.vars[f]?this.vars[f]-n.s:"string"===typeof this.vars[f]?parseFloat(this.vars[f].split("=").join("")):0;n&&n._next&&(n._next._prev=n)}return e&&this._kill(e,b)?this._initProps(b,c,d,e):1<this._overwrite&&this._firstPT&&1<d.length&&G(b,this,c,this._overwrite,d)?(this._kill(c,
b),this._initProps(b,c,d,e)):k};c.render=function(b,c,d){var e=this._time,f,h;if(b>=this._duration){if(this._totalTime=this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(f=!0,h="onComplete"),0===this._duration){if(0===b||0>this._rawPrevTime)this._rawPrevTime!==b&&(d=!0);this._rawPrevTime=b}}else if(0>=b){this._totalTime=this._time=0;this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0;if(0!==e||0===this._duration&&0<this._rawPrevTime)h="onReverseComplete",
f=this._reversed;0>b?(this._active=!1,0===this._duration&&(0<=this._rawPrevTime&&(d=!0),this._rawPrevTime=b)):this._initted||(d=!0)}else if(this._totalTime=this._time=b,this._easeType){var i=b/this._duration,m=this._easeType,n=this._easePower;if(1===m||3===m&&0.5<=i)i=1-i;3===m&&(i*=2);1===n?i*=i:2===n?i*=i*i:3===n?i*=i*i*i:4===n&&(i*=i*i*i*i);this.ratio=1===m?1-i:2===m?i:0.5>b/this._duration?i/2:1-i/2}else this.ratio=this._ease.getRatio(b/this._duration);if(this._time!==e||d){this._initted||(this._init(),
!f&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration)));!this._active&&!this._paused&&(this._active=!0);if(0===e&&this.vars.onStart&&(0!==this._time||0===this._duration))c||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||k);for(b=this._firstPT;b;){if(b.f)b.t[b.p](b.c*this.ratio+b.s);else b.t[b.p]=b.c*this.ratio+b.s;b=b._next}this._onUpdate&&(c||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||k));h&&!this._gc&&(f&&(this._timeline.autoRemoveChildren&&
this._enabled(!1,!1),this._active=!1),c||this.vars[h]&&this.vars[h].apply(this.vars[h+"Scope"]||this,this.vars[h+"Params"]||k))}};c._kill=function(b,c){"all"===b&&(b=null);if(null==b&&(null==c||c==this.target))return this._enabled(!1,!1);var c=c||this._targets||this.target,d,e,f,h,i,k,m;if((c instanceof Array||c.jquery)&&"object"===typeof c[0])for(d=c.length;-1<--d;)this._kill(b,c[d])&&(i=!0);else{if(this._targets)for(d=this._targets.length;-1<--d;){if(c===this._targets[d]){h=this._propLookup[d]||
{};this._overwrittenProps=this._overwrittenProps||[];e=this._overwrittenProps[d]=b?this._overwrittenProps[d]||{}:"all";break}}else{if(c!==this.target)return!1;h=this._propLookup;e=this._overwrittenProps=b?this._overwrittenProps||{}:"all"}if(h)for(f in k=b||h,m=b!=e&&"all"!=e&&b!=h&&(null==b||!0!=b._tempKill),k){if(d=h[f]){d.pg&&d.t._kill(k)&&(i=!0);if(!d.pg||0===d.t._overwriteProps.length)d._prev?d._prev._next=d._next:d===this._firstPT&&(this._firstPT=d._next),d._next&&(d._next._prev=d._prev),d._next=
d._prev=null;delete h[f]}m&&(e[f]=1)}}return i};c.invalidate=function(){this._notifyPluginsOfEnabled&&p._onPluginEvent("_onDisable",this);this._onUpdate=this._overwrittenProps=this._firstPT=null;this._initted=this._active=this._notifyPluginsOfEnabled=!1;this._propLookup=this._targets?{}:[];return this};c._enabled=function(b,c){if(b&&this._gc)if(this._targets)for(var d=this._targets.length;-1<--d;)this._siblings[d]=H(this._targets[d],this,!0);else this._siblings=H(this.target,this,!0);m.prototype._enabled.call(this,
b,c);return this._notifyPluginsOfEnabled&&this._firstPT?p._onPluginEvent(b?"_onEnable":"_onDisable",this):!1};p.to=function(b,c,d){return new p(b,c,d)};p.from=function(b,c,d){d.runBackwards=!0;!1!=d.immediateRender&&(d.immediateRender=!0);return new p(b,c,d)};p.fromTo=function(b,c,d,e){e.startAt=d;d.immediateRender&&(e.immediateRender=!0);return new p(b,c,e)};p.delayedCall=function(b,c,d,e,f){return new p(c,0,{delay:b,onComplete:c,onCompleteParams:d,onCompleteScope:e,onReverseComplete:c,onReverseCompleteParams:d,
onReverseCompleteScope:e,immediateRender:!1,useFrames:f,overwrite:0})};p.set=function(b,c){return new p(b,0,c)};p.killTweensOf=p.killDelayedCallsTo=function(b,c){for(var d=p.getTweensOf(b),e=d.length;-1<--e;)d[e]._kill(c,b)};p.getTweensOf=function(b){if(null!=b){var c,d,e;if((b instanceof Array||b.jquery)&&"object"===typeof b[0]){c=b.length;for(d=[];-1<--c;)d=d.concat(p.getTweensOf(b[c]));for(c=d.length;-1<--c;){e=d[c];for(b=c;-1<--b;)e===d[b]&&d.splice(c,1)}}else{d=H(b).concat();for(c=d.length;-1<
--c;)d[c]._gc&&d.splice(c,1)}return d}};var F=d("plugins.TweenPlugin",function(b,c){this._overwriteProps=(b||"").split(",");this._propName=this._overwriteProps[0];this._priority=c||0},!0);c=F.prototype;F.version=12;F.API=2;c._firstPT=null;c._addTween=function(b,c,d,e,f,h){var i;if(null!=e&&(i="number"===typeof e||"="!==e.charAt(1)?Number(e)-d:Number(e.split("=").join(""))))this._firstPT={_next:this._firstPT,t:b,p:c,s:d,c:i,f:"function"===typeof b[c],n:f||c,r:h},this._firstPT._next&&(this._firstPT._next._prev=
this._firstPT)};c.setRatio=function(b){for(var c=this._firstPT,d;c;){d=c.c*b+c.s;c.r&&(d=d+(0<d?0.5:-0.5)>>0);if(c.f)c.t[c.p](d);else c.t[c.p]=d;c=c._next}};c._kill=function(b){if(null!=b[this._propName])this._overwriteProps=[];else for(var c=this._overwriteProps.length;-1<--c;)null!=b[this._overwriteProps[c]]&&this._overwriteProps.splice(c,1);for(c=this._firstPT;c;)null!=b[c.n]&&(c._next&&(c._next._prev=c._prev),c._prev?(c._prev._next=c._next,c._prev=null):this._firstPT===c&&(this._firstPT=c._next)),
c=c._next;return!1};c._roundProps=function(b,c){for(var d=this._firstPT;d;){if(b[this._propName]||null!=d.n&&b[d.n.split(this._propName+"_").join("")])d.r=c;d=d._next}};p._onPluginEvent=function(b,c){var d=c._firstPT,e;if("_onInitAllProps"===b){for(var f,h,i,k;d;){k=d._next;for(f=h;f&&f.pr>d.pr;)f=f._next;(d._prev=f?f._prev:i)?d._prev._next=d:h=d;(d._next=f)?f._prev=d:i=d;d=k}d=c._firstPT=h}for(;d;)d.pg&&"function"===typeof d.t[b]&&d.t[b]()&&(e=!0),d=d._next;return e};F.activate=function(b){for(var c=
b.length;-1<--c;)b[c].API===F.API&&(p._plugins[(new b[c])._propName]=b[c]);return!0};if(q=y._gsQueue){for(s=0;s<q.length;s++)q[s]();for(c in b)b[c].def||console.log("Warning: TweenLite encountered missing dependency: com.greensock."+c)}})(window);
define("TweenMax", function(){});

define('proj/ThreeController',['core/utils/Mapper', 'threex/particles/ParticleEngine', 'threejs', 'Leap', 'use!OrbitControls', 'TweenMax'], function(Mapper, ParticleEngine) {
	var ThreeController = function(container, options) {
		options = options || {};
		var scope = this;
		var callback = options.callbacks.onRender;
        var scene = options.scene || new THREE.Scene();

		// ------
		// Camera
		var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
        camera.target = new THREE.Vector3(0, 0, 0);
        camera.lookAt(camera.target);
        camera.position.set(0, 0, 1200);
		var camRadius = 790;
		//var fov = camera.fov;

		var active = false;
		// ------
		// Renderer
		var renderer = new THREE.WebGLRenderer({
			antialias: false
		});
        renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		container.appendChild(renderer.domElement);
		// ------

		// Controls
		var controls = new THREE.OrbitControls(camera, renderer.domElement);
        //controls.autoRotate = true;
        //controls.autoRotateSpeed = 8.0;
		//controls.target.set(0, 0, 0);
		// ------

		// Canvas
		var canvas = container.getElementsByTagName('canvas')[0];
		var width = canvas.width;
		var height = canvas.height;
		// ------
        //var light = new THREE.AmbientLight(0xffffff);
		//light.position.set( 0, 600, 0).normalize();
        //scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff, 1);
        light.intensity = 0.3;
        light.position.set( -300, 500, -900).normalize();
        light.castShadow = true;
		//light.shadowCameraVisible = true;
        scene.add(light);

		light = new THREE.DirectionalLight(0x0040ff, 1);
        light.intensity = 0.3;
        light.position.set(900, 300, -400);
        light.castShadow = true;
		//light.shadowCameraVisible = true;
        scene.add(light);

        // Lamp

        light = new THREE.PointLight( 0xb26b00, 0.1 );
        light.position.set(-285, -90, 450);
        scene.add(light);

        var sphere = new THREE.SphereGeometry( 5, 16, 3 );
        var lamp = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xb26b00 } ) );
        lamp.position = light.position;
        scene.add(lamp);

        // Moon
        sphere = new THREE.SphereGeometry( 50, 16, 5 );
        var moon = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xcccccc } ) );
        moon.position.set(0, 400, -900);
        scene.add(moon);

		// Geometry
		var material, geometry, mesh;

		// Ground plane
        //material = new THREE.MeshBasicMaterial({
            //color: 0xffffff,
        //});

        //geometry = new THREE.CubeGeometry(2300, 10, 2300);
        //mesh = new THREE.Mesh(geometry, material);
        //mesh.position.set(0, - 10, 0);
        //scene.add(mesh);

        material = new THREE.MeshPhongMaterial({
            ambient: 0x555555,
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 40,
            vertexColors: THREE.FaceColors,
            shading: THREE.FlatShading
        });
        material.side = THREE.DoubleSide;

        // Terrain
        var loader = new THREE.JSONLoader(true);
        loader.load('assets/models/terrain.js', function(g, m) {
            for (var i = 0, len = m.length; i < len; i++) {
                m[i].shading = THREE.FlatShading;
                m[i].side = THREE.DoubleSide;
            }
            mesh = new THREE.Mesh(g, new THREE.MeshFaceMaterial(m));
            mesh.scale.set(50, 50, 50);
            mesh.position.y = -200;
            scene.add(mesh);
        });

        var particleEngine = new ParticleEngine(scene);

        // Create point lights
        var particles = particleEngine.getParticles();
        var interval = particles.length / 10;
        var pointLightTargets = [];
        var pointLights = [];
        for (var i = 0, len = particles.length; i < len; i++) {
            if (Math.floor(i % interval) === 0) {
                var p = particles[i];
                pointLightTargets.push(p);
                //pointLight = new THREE.PointLight( 0x0040ff, 0 );
                pointLight = new THREE.PointLight( 0x0040ff, 0 );
                pointLight.position.set(p.x, p.y, p.z);
                pointLights.push(pointLight);
                scene.add(pointLight);
            }
        }



        this.onHit = function(x, y) {
            particleEngine.generate(x, y);
        };

        var onMouseDown = function(evt) {
            for (var i = 0; i < 10; i++) {
                particleEngine.generate( (evt.pageX || evt.clientX) + (Math.random() * 40 - 20), (evt.pageY || evt.clientY) + (Math.random() * 40 - 20));
            }
        };

        var onMouseUp = function() {
            TweenMax.to(camera.position, 0.5, {x: 0, y: 0, z: 1200});
            //camera.position.set(0, 0, 1200);
        };

        document.addEventListener( 'mousedown', onMouseDown, false );
        document.addEventListener( 'mouseup', onMouseUp, false );

		var animate = function() {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
            particleEngine.update();
            //var time = Date.now() * 0.001;
            //camera.position.x = Math.sin( time * 1 ) * 100;
            //camera.position.y = Math.cos( time * 1 ) * 0;
            //camera.position.z = Math.cos( time * 1 ) * 0 + 1200;

            for (var i = 0, len = pointLights.length; i < len; i++) {
                var plt = pointLightTargets[i];
                var pl = pointLights[i];
                if (plt.alive) {
                    pl.intensity = 0.2;
                    pl.position.x = plt.x;
                    pl.position.y = plt.y;
                    pl.position.z = plt.z;
                    //pl.position.x = Math.sin( time * 1 ) * 400;
                    //pl.position.y = Math.cos( time * 1 ) * 100;
                    //pl.position.z = Math.cos( time * 1 ) * 600;
                } else {
                    pl.intensity = 0;
                }
            }


		};

		animate();
	};

	return ThreeController;
});


define('proj/OutputText',['dom/primitives/Elem'], function(Elem) {
    var OutputText = function() {

        var label = new Elem({
            css: {
                width: '100%',
                color: "#ffffff",
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: '100px',
                position: 'absolute',
                top: window.innerHeight / 2 + 'px'
            },
            insert: {
                type: 'parent',
                target: document.body
            }
        });

        this.show = function(gesture) {
            label.el.innerHTML = gesture;
        };
    };

    return OutputText;
});

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

Detector = {

	canvas : !! window.CanvasRenderingContext2D,
	webgl : ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers : !! window.Worker,
	fileapi : window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage : function () {

		var domElement = document.createElement( 'div' );

		domElement.style.fontFamily = 'monospace';
		domElement.style.fontSize = '13px';
		domElement.style.textAlign = 'center';
		domElement.style.background = '#eee';
		domElement.style.color = '#000';
		domElement.style.padding = '1em';
		domElement.style.width = '475px';
		domElement.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			domElement.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
			].join( '\n' );

		}

		return domElement;

	},

	addGetWebGLMessage : function ( parameters ) {

		var parent, id, domElement;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		domElement = Detector.getWebGLErrorMessage();
		domElement.id = id;

		parent.appendChild( domElement );

	}

};

define("libs/three.js/Detector", function(){});

/**
 * @class
 * @name dom.utils.Detector
*/
define('dom/utils/Detector',['libs/three.js/Detector'], function() {
	var Detector = function() {};

	/**
     * @name dom.utils.Detector#topZIndex
     * @function
     * @static
     * @return {} top
    */
	Detector.topZIndex = function() {
		var top = 0;
		var pageEls = document.getElementsByTagName('*');

		for (var i = 0, len = pageEls.length; i < len; i++) {
			if (pageEls[i].style.zIndex && parseInt(pageEls[i].style.zIndex, 10) > top) {
				top = parseInt(pageEls[i].style.zIndex, 10);
			}
		}
		return top;
	};

	/**
     * @name dom.utils.Detector#isElement
     * @function
     * @static
     * @param {} obj
     * @return {} obj instanceof HTMLElement
    */
	Detector.isElement = function(obj) {
		try {
			//Using W3 DOM2 (works for FF, Opera and Chrom)
			return obj instanceof HTMLElement;
		} catch(e) {
			//Browsers not supporting W3 DOM2 don't have HTMLElement and
			//an exception is thrown and we end up here. Testing some
			//properties that all elements have. (works on IE7)
			return (typeof obj === "object") && (obj.nodeType === 1) && (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
		}
	};

	/**
     * @name dom.utils.Detector#unit
     * @function
     * @static
     * @param {} value
     * @return {} unit
    */
	Detector.unit = function(value) {
		var map = { // list of all units and their identifying string
			pixel: "px",
			percent: "%",
			inch: "in",
			cm: "cm",
			mm: "mm",
			point: "pt",
			pica: "pc",
			em: "em",
			ex: "ex"
		};

		var unit = value.match(/\D+$/);
		unit = unit === null ? map.pixel: unit[0];
		return unit;
	};

	Detector.webgl = (function() {
		return Detector.webgl;
	})();

	Detector.getUserMedia = (function() {
		return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	})();

	return Detector;
});


define('dom/video/Camera',['dom/utils/Detector', 'dom/primitives/Elem'], function(Detector, Elem) {
	var Camera = function(container, options) {
		var self = this;

		var init = function() {
			// Determine whether to create a video element
			self.video = new Elem({
				type: 'video',
				attr: {
					autoplay: '',
					width: window.innerWidth,
					height: window.innerHeight
                },
                // Need mixin
                css: {
                    transform: 'rotateY(180deg)',
                    webkitTransform: 'rotateY(180deg)',
                    mozTransform: 'rotateY(180deg)'
                 },
                append: {
                    type: 'child',
                    target: container
                }
			}).el;

			// Not showing vendor prefixes.
			navigator.getUserMedia({
				video: true,
			},
			function(stream) {
                console.log(stream);
				if (window.webkitURL) {
					self.video.src = window.webkitURL.createObjectURL(stream);
				} else if (self.video.mozSrcObject !== undefined) {
					self.video.mozSrcObject = stream;
				} else {
					self.video.src = stream;
				}
				if (options.callback) {
					options.callback();
				}
				// Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
				// See crbug.com/110938.
				self.video.onloadedmetadata = function(e) {
					// Ready to go
				};
			},
			function() {
				console.log('Rejected');
			});
		};

		// Check for getUserMedia
		navigator.getUserMedia = Detector.getUserMedia;
		if (navigator.getUserMedia) {
			// Good to go!
			init();
		} else {
			alert('getUserMedia() is not supported in your browser');
		}
	};

	return Camera;
});


/*
Copyright (c) 2012 Juan Mellado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
References:
- "OpenCV: Open Computer Vision Library"
  http://sourceforge.net/projects/opencvlibrary/
*/

var CV = CV || {};

CV.Image = function(width, height, data){
  this.width = width || 0;
  this.height = height || 0;
  this.data = data || [];
};

CV.findContours = function(imageSrc){
  var contours = [], src = imageSrc.data,
      width = imageSrc.width - 2, height = imageSrc.height - 2,
      pos = width + 3, nbd = 1,
      deltas, pix, outer, hole, i, j;

  deltas = CV.neighborhoodDeltas(width + 2);

  for (i = 0; i < height; ++ i, pos += 2){
  
    for (j = 0; j < width; ++ j, ++ pos){
      pix = src[pos];

      if (0 !== pix){
        outer = hole = false;

        if (1 === pix && 0 === src[pos - 1]){
          outer = true;
        }
        else if (pix >= 1 && 0 === src[pos + 1]){
          hole = true;
        }

        if (outer || hole){
          ++ nbd;
          
          contours.push( CV.borderFollowing(src, pos, nbd,
            {x: j, y: i}, hole, deltas) );
        }
      }
    }
  }  

  return contours;
};

CV.borderFollowing = function(src, pos, nbd, point, hole, deltas){
  var contour = [], pos1, pos3, pos4, s, s_end, s_prev;

  contour.hole = hole;
      
  s = s_end = hole? 0: 4;
  do{
    s = (s - 1) & 7;
    pos1 = pos + deltas[s];
    if (src[pos1] !== 0){
      break;
    }
  }while(s !== s_end);
  
  if (s === s_end){
    src[pos] = -nbd;
    contour.push( {x: point.x, y: point.y} );

  }else{
    pos3 = pos;
    s_prev = s ^ 4;

    while(true){
      s_end = s;
    
      do{
        pos4 = pos3 + deltas[++ s];
      }while(src[pos4] === 0);
      
      s &= 7;
      
      if ( ( (s - 1) >>> 0) < (s_end >>> 0) ){
        src[pos3] = -nbd;
      }
      else if (src[pos3] === 1){
        src[pos3] = nbd;
      }

      contour.push( {x: point.x, y: point.y} );
      
      s_prev = s;

      point.x += CV.neighborhood[s][0];
      point.y += CV.neighborhood[s][1];

      if ( (pos4 === pos) && (pos3 === pos1) ){
        break;
      }
      
      pos3 = pos4;
      s = (s + 4) & 7;
    }
  }

  return contour;
};

CV.neighborhood = 
  [ [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1] ];

CV.neighborhoodDeltas = function(width){
  var deltas = [], len = CV.neighborhood.length, i = 0;
  
  for (; i < len; ++ i){
    deltas[i] = CV.neighborhood[i][0] + (CV.neighborhood[i][1] * width);
  }
  
  return deltas.concat(deltas);
};

CV.approxPolyDP = function(contour, epsilon){
  var slice = {start_index: 0, end_index: 0},
      right_slice = {start_index: 0, end_index: 0},
      poly = [], stack = [], len = contour.length,
      pt, start_pt, end_pt, dist, max_dist, le_eps,
      dx, dy, i, j, k;
  
  epsilon *= epsilon;
  
  k = 0;
  
  for (i = 0; i < 3; ++ i){
    max_dist = 0;
    
    k = (k + right_slice.start_index) % len;
    start_pt = contour[k];
    if (++ k === len) {k = 0;}
  
    for (j = 1; j < len; ++ j){
      pt = contour[k];
      if (++ k === len) {k = 0;}
    
      dx = pt.x - start_pt.x;
      dy = pt.y - start_pt.y;
      dist = dx * dx + dy * dy;

      if (dist > max_dist){
        max_dist = dist;
        right_slice.start_index = j;
      }
    }
  }

  if (max_dist <= epsilon){
    poly.push( {x: start_pt.x, y: start_pt.y} );

  }else{
    slice.start_index = k;
    slice.end_index = (right_slice.start_index += slice.start_index);
  
    right_slice.start_index -= right_slice.start_index >= len? len: 0;
    right_slice.end_index = slice.start_index;
    if (right_slice.end_index < right_slice.start_index){
      right_slice.end_index += len;
    }
    
    stack.push( {start_index: right_slice.start_index, end_index: right_slice.end_index} );
    stack.push( {start_index: slice.start_index, end_index: slice.end_index} );
  }

  while(stack.length !== 0){
    slice = stack.pop();
    
    end_pt = contour[slice.end_index % len];
    start_pt = contour[k = slice.start_index % len];
    if (++ k === len) {k = 0;}
    
    if (slice.end_index <= slice.start_index + 1){
      le_eps = true;
    
    }else{
      max_dist = 0;

      dx = end_pt.x - start_pt.x;
      dy = end_pt.y - start_pt.y;
      
      for (i = slice.start_index + 1; i < slice.end_index; ++ i){
        pt = contour[k];
        if (++ k === len) {k = 0;}
        
        dist = Math.abs( (pt.y - start_pt.y) * dx - (pt.x - start_pt.x) * dy);

        if (dist > max_dist){
          max_dist = dist;
          right_slice.start_index = i;
        }
      }
      
      le_eps = max_dist * max_dist <= epsilon * (dx * dx + dy * dy);
    }
    
    if (le_eps){
      poly.push( {x: start_pt.x, y: start_pt.y} );

    }else{
      right_slice.end_index = slice.end_index;
      slice.end_index = right_slice.start_index;

      stack.push( {start_index: right_slice.start_index, end_index: right_slice.end_index} );
      stack.push( {start_index: slice.start_index, end_index: slice.end_index} );
    }
  }
  
  return poly;
};

CV.erode = function(imageSrc, imageDst){
  return CV.applyKernel(imageSrc, imageDst, Math.min);
};
    
CV.dilate = function(imageSrc, imageDst){
  return CV.applyKernel(imageSrc, imageDst, Math.max);
};
    
CV.applyKernel = function(imageSrc, imageDst, fn){
  var src = imageSrc.data, dst = imageDst.data,
      width = imageSrc.width, height = imageSrc.height,
      offsets = [-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1],
      klen = offsets.length,
      pos = 0, value, i, j, k;
  
  for (i = 0; i < width; ++ i){
    dst[pos ++] = 0;
  }

  for (i = 2; i < height; ++ i){
    dst[pos ++] = 0;

    for (j = 2; j < width; ++ j){
      value = src[pos];
      
      for (k = 0; k < klen; ++ k){
        value = fn(value, src[ pos + offsets[k] ] );
      }
      
      dst[pos ++] = value;
    }
    
    dst[pos ++] = 0;
  }

  for (i = 0; i < width; ++ i){
    dst[pos ++] = 0;
  }

  imageDst.width = imageSrc.width;
  imageDst.height = imageSrc.height;
  
  return imageDst;
};

CV.convexHull = function(points){
  var deque = [], i = 3, point;

  if (points.length >= 3){

    if ( CV.position(points[0], points[1], points[2]) > 0){
      deque.push(points[0]);
      deque.push(points[1]);
    }else{
      deque.push(points[1]);
      deque.push(points[0]);
    }
    deque.push(points[2]);
    deque.unshift(points[2]);

    for (; i < points.length; ++ i){
      point = points[i];

      if ( CV.position(point, deque[0], deque[1]) < 0 ||
           CV.position(deque[deque.length - 2], deque[deque.length - 1], point) < 0 ){
           
        while( CV.position(deque[deque.length - 2], deque[deque.length - 1], point) <= 0 ){
          deque.pop();
        }
        deque.push(point);
        
        while( CV.position(point, deque[0], deque[1]) <= 0 ){
          deque.shift();
        }
        deque.unshift(point);
      }
    }

  }

  return deque;
};

CV.position = function(p1, p2, p3){
  return ( (p2.x - p1.x) * (p3.y - p1.y) ) - ( (p3.x - p1.x) * (p2.y - p1.y) );
};

CV.convexityDefects = function(points, hull){
  var defects = [], len = hull.length,
      curr, next, point, dx0, dy0, scale, defect, isDefect,
      idx1, idx2, idx3, sign, inc, depth, dx, dy, dist, i, j;
  
  if (len >= 3){
    idx1 = CV.indexPoint(points, hull[0]);
    idx2 = CV.indexPoint(points, hull[1]);
    idx3 = CV.indexPoint(points, hull[2]);
    
    sign = 0;
    sign += idx2 > idx1? 1: 0;
    sign += idx3 > idx2? 1: 0;
    sign += idx1 > idx3? 1: 0;
    
    inc = (sign === 2)? 1: -1;
    
    j = idx1;
    curr = hull[0];
    
    for (i = 1; i !== len; ++ i){
      next = hull[i];
      isDefect = false;
      depth = 0;
    
      dx0 = next.x - curr.x;
      dy0 = next.y - curr.y;
      scale = 1 / Math.sqrt(dx0 * dx0 + dy0 * dy0);
    
      defect = {start: curr, end: next};

      while(true){
        j += inc;
        j = (j < 0)? points.length - 1: j % points.length;
        
        point = points[j];
        
        if (point.x === next.x && point.y === next.y){
          break;
        }

        dx = point.x - curr.x;
        dy = point.y - curr.y;
        dist = Math.abs(-dy0 * dx + dx0 * dy) * scale;
      
        if (dist > depth){
          isDefect = true;
          
          defect.depth = depth = dist;
          defect.depthPoint = point;
        }
      }
      
      if (isDefect){
        defects.push(defect);
      }
      
      curr = next;
    }
  }
  
  return defects;
};

CV.indexPoint = function(points, point){
  var len = points.length, i = 0;
  for (; i < len; ++ i){
    if (points[i].x === point.x && points[i].y === point.y){
      break;
    }
  }
  return i;
};

CV.area = function(poly){
  var area = 0, len = poly.length, i = 1,
      x, y, xmin, xmax, ymin, ymax;

  if (len > 0){
    xmin = xmax = poly[0].x;
    ymin = ymax = poly[0].y;
  
    for (; i < len; ++ i){
      x = poly[i].x;
      if (x < xmin){
        xmin = x;
      }
      if (x > xmax){
        xmax = x;
      }
      
      y = poly[i].y;
      if (y < ymin){
        ymin = y;
      }
      if (y > ymax){
        ymax = y;
      }
    }
  
    area = (xmax - xmin + 1) * (ymax - ymin + 1);
  }
  
  return area;
};

define("libs/js-handtracking/src/cv", function(){});

/*
Copyright (c) 2012 Juan Mellado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var HT = HT || {};

HT.Tracker = function(params){
  this.params = params || {};

  this.mask = new CV.Image();
  this.eroded = new CV.Image();
  this.contours = [];
  
  this.skinner = new HT.Skinner();
};

HT.Tracker.prototype.detect = function(image){
  this.skinner.mask(image, this.mask);
  
  if (this.params.fast){
    this.blackBorder(this.mask);
  }else{
    CV.erode(this.mask, this.eroded);
    CV.dilate(this.eroded, this.mask);
  }

  this.contours = CV.findContours(this.mask);

  return this.findCandidate(this.contours, image.width * image.height * 0.05, 0.005);
};

HT.Tracker.prototype.findCandidate = function(contours, minSize, epsilon){
  var contour, candidate;
  
  contour = this.findMaxArea(contours, minSize);
  if (contour){
    contour = CV.approxPolyDP(contour, contour.length * epsilon);
  
    candidate = new HT.Candidate(contour);
  }
  
  return candidate;
};

HT.Tracker.prototype.findMaxArea = function(contours, minSize){
  var len = contours.length, i = 0,
      maxArea = -Infinity, area, contour;

  for (; i < len; ++ i){
    area = CV.area(contours[i]);
    if (area >= minSize){
    
      if (area > maxArea) {
        maxArea = area;
      
        contour = contours[i];
      }
    }
  }
  
  return contour;
};

HT.Tracker.prototype.blackBorder = function(image){
  var img = image.data, width = image.width, height = image.height,
      pos = 0, i;

  for (i = 0; i < width; ++ i){
    img[pos ++] = 0;
  }
  
  for (i = 2; i < height; ++ i){
    img[pos] = img[pos + width - 1] = 0;

    pos += width;
  }

  for (i = 0; i < width; ++ i){
    img[pos ++] = 0;
  }
  
  return image;
};

HT.Candidate = function(contour){
  this.contour = contour;
  this.hull = CV.convexHull(contour);
  this.defects = CV.convexityDefects(contour, this.hull);
};

HT.Skinner = function(){
};

HT.Skinner.prototype.mask = function(imageSrc, imageDst){
  var src = imageSrc.data, dst = imageDst.data, len = src.length,
      i = 0, j = 0,
      r, g, b, h, s, v, value;

  for(; i < len; i += 4){
    r = src[i];
    g = src[i + 1];
    b = src[i + 2];
  
    v = Math.max(r, g, b);
    s = v === 0? 0: 255 * ( v - Math.min(r, g, b) ) / v;
    h = 0;
    
    if (0 !== s){
      if (v === r){
        h = 30 * (g - b) / s;
      }else if (v === g){
        h = 60 + ( (b - r) / s);
      }else{
        h = 120 + ( (r - g) / s);
      }
      if (h < 0){
        h += 360;
      }
    }
    
    value = 0;

    if (v >= 15 && v <= 250){
      if (h >= 3 && h <= 33){
        value = 255;
      }
    }
    
    dst[j ++] = value;
  }
  
  imageDst.width = imageSrc.width;
  imageDst.height = imageSrc.height;
  
  return imageDst;
};

define("libs/js-handtracking/src/handtracking", function(){});

define('canvas/detection/Handtracker',['libs/js-handtracking/src/cv', 'libs/js-handtracking/src/handtracking'], function() {
	var HandTracker = function(canvas, context, options) {
		// Adapted code from https://code.google.com/p/js-handtracking/
		var tracker = new HT.Tracker();
		var image = context.createImageData(canvas.width * 0.2, canvas.height * 0.2);
		var candidate;

		this.update = function(image) {
			candidate = tracker.detect(image);

			if (candidate) {
				options.callback(candidate);
			}

			if (options.debug) {
				draw(candidate);
			}
		};

		var draw = function(candidate) {
			if (candidate) {
				drawHull(candidate.hull, "red");
				drawDefects(candidate.defects, "blue");
			}

			context.putImageData(createImage(tracker.mask, image), canvas.width - image.width, canvas.height - image.height);
		};

		var drawHull = function(hull, color) {
			var len = hull.length,
			i = 1;

			if (len > 0) {
				context.beginPath();
				context.lineWidth = 3;
				context.strokeStyle = color;

				context.moveTo(hull[0].x, hull[0].y);
				for (; i < len; ++i) {
					context.lineTo(hull[i].x, hull[i].y);
				}

				context.stroke();
				context.closePath();
			}
		};

		var drawDefects = function(defects, color) {
			var len = defects.length,
			i = 0,
			point;

			if (len > 0) {
				context.beginPath();
				context.lineWidth = 3;
				context.strokeStyle = color;

				for (; i < len; ++i) {
					point = defects[i].depthPoint;
					context.strokeRect(point.x - 4, point.y - 4, 8, 8);
				}

				context.stroke();
				context.closePath();
			}
		};

		var createImage = function(imageSrc, imageDst) {
			var src = imageSrc.data,
			dst = imageDst.data,
			width = imageSrc.width,
			span = 4 * width,
			len = src.length,
			i = 0,
			j = 0,
			k = 0;

			for (i = 0; i < len; i += span) {

				for (j = 0; j < width; j += 5) {

					dst[k] = dst[k + 1] = dst[k + 2] = src[i];
					dst[k + 3] = 255;
					k += 4;

					i += 5;
				}
			}

			return imageDst;
		};
	};

	return HandTracker;
});

define('canvas/detection/MotionTracker',[],function() {
    var MotionTracker = function(canvas, context, options) {

        var lastImageData;
        var contextBlended = canvas.getContext('2d');

        this.update = function(image) {
            // Blend
			var width = canvas.width;
			var height = canvas.height;
			// get webcam image data
			var sourceData = context.getImageData(0, 0, width, height);
			// create an image if the previous image doesn’t exist
			if (!lastImageData) {
                lastImageData = context.getImageData(0, 0, width, height);
            }
			// create a ImageData instance to receive the blended result
			var blendedData = context.createImageData(width, height);
			// blend the 2 images
			differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
			// draw the result in a canvas
			contextBlended.putImageData(blendedData, 0, 0);
			// store the current webcam image
			lastImageData = sourceData;

            if (options.callback) {
                options.callback(contextBlended);
            }
        };

        var fastAbs = function(value) {
            // equivalent to Math.abs();
            return (value ^ (value >> 31)) - (value >> 31);
        };

        var difference = function(target, data1, data2) {
			// blend mode difference
				if (data1.length != data2.length) {
                    return null;
                }
				var i = 0;
				while (i < (data1.length * 0.25)) {
					target[4*i] = data1[4*i] === 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
					target[4*i+1] = data1[4*i+1] === 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
					target[4*i+2] = data1[4*i+2] === 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
					target[4*i+3] = 0xFF;
					++i;
				}
        };

		var threshold = function(value) {
			return (value > 0x15) ? 0xFF : 0;
		};
		
		var differenceAccuracy = function(target, data1, data2) {
			if (data1.length != data2.length) {
                return null;
            }
			var i = 0;
			while (i < (data1.length * 0.25)) {
				var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
				var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
				var diff = threshold(fastAbs(average1 - average2));
				target[4*i] = diff;
				target[4*i+1] = diff;
				target[4*i+2] = diff;
				target[4*i+3] = 0xFF;
				++i;
			}
		};
    };

    return MotionTracker;
});

/*
 * @example
 *
 *
 */
define('dom/video/CameraRenderer',['dom/primitives/Elem', 'dom/video/Camera', 'canvas/detection/Handtracker', 'canvas/detection/MotionTracker'], function(Elem, Camera, HandTracker, MotionTracker) {
	var CameraRenderer = function(container, options) {
		var self = this;
		var canvas, context;

		var init = function() {
			self.camera = new Camera(container, {
				callback: onStreamHandler
			});

			//var width = 300;
			var ratio = 0.3;
			canvas = new Elem({
				type: 'canvas',
				attr: {
					width: self.camera.video.width * ratio,
					height: self.camera.video.height * ratio
				},
				css: {
					position: 'absolute',
					bottom: '0px',
					right: '0px'
				}
			});

			if (options.video !== false) {
				canvas.appendTo(container);
			}

			context = canvas.el.getContext('2d');

			// Flip the image so the user feels like they're in front of a mirror
			context.translate(canvas.el.width, 0);
			context.scale( - 1, 1);

			//tracker = new HandTracker(canvas, context, options);
			tracker = new MotionTracker(canvas.el, context, options);

		};

		var onStreamHandler = function() {
			// Start ticking
			requestAnimationFrame(function() {
				return onStreamHandler();
			});

			if (self.camera.video.readyState === self.camera.video.HAVE_ENOUGH_DATA) {
				var image = snapshot();
				tracker.update(image);
			}
		};

		var snapshot = function() {
            try {
                context.drawImage(self.camera.video, 0, 0, canvas.el.width, canvas.el.height);
            } catch(e) {
                if (e.name == "NS_ERROR_NOT_AVAILABLE") {
                    setTimeout(snapshot, 0);
                } else {
                    throw e;
                }
            }
			return context.getImageData(0, 0, canvas.el.width, canvas.el.height);
		};

		init();
	};

	return CameraRenderer;
});


define('dom/sprite/Sprite',['dom/primitives/Elem'], function(Elem) {
    var Sprite = function(src, options) {
        var scope = this;
        options.type = 'img';
        Elem.call(this, options);

        this.el.src = src;

        // Event listeners
        this.el.onload = function() {

            scope.width = scope.el.width; 
            scope.height = scope.el.height; 

            if (options.callbakcs && options.callbacks.onLoad) {
                options.callbacks.onLoad();
            }
        };
    };

    return Sprite;
});

/**
 * @class
 * @name dom.shapes.Circle
 * @requires dom.primitives.Elem.js
 * @requires dom.utils.Detector.js
 * @param {} options
*/
define('dom/shapes/Circle',['dom/primitives/Elem', 'dom/utils/Detector'], function(Elem, Detector) {
    var Circle = function(options) {
        var self = this;

        Elem.call(this, options);

        if (options.radius === undefined) {
            throw new Error('Must define a radius');
        }

        this.unit = 'px';
        this.set({
            width: (options.radius * 2) + this.unit,
            height: (options.radius * 2) + this.unit
        });

        this.el.style.borderRadius = (parseInt(options.radius, 10) * 2) + this.unit;
        this.el.style.MoxBorderRadius = (parseInt(options.radius, 10) * 2) + this.unit;
    };

    return Circle;
});

define('canvas/detection/Sensor',['dom/sprite/Sprite', 'dom/shapes/Circle'], function(Sprite, Circle) {
	var Sensor = function(container, path, options) {
		var self = this;
		options = options || {};

		this.name = options.name !== undefined ? options.name: '1';
		this.x = options.x !== undefined ? options.x: 0;
		this.y = options.y !== undefined ? options.y: 0;
		this.width = options.width !== undefined ? options.width: 64;
		this.height = options.height !== undefined ? options.height: 64;
        this.backgroundColor = options.backgroundColor !== undefined ? options.backgroundColor : '#FF0000';

		var node = new Circle({
			radius: this.width / 2,
			css: {
				position: 'absolute',
				top: this.y + 'px',
				left: this.x + 'px',
				backgroundColor: this.backgroundColor
			},
			insert: {
				type: 'parent',
				target: container
			}
		});

		this.hit = function() {
			node.set({
				css: {
					backgroundColor: '#00FF00'
				}
			});
			setTimeout(function() {
				node.set({
					css: {
						backgroundColor: '#FF0000'
					}
				});
			},
			300);
		};

		this.move = function() {
			node.set({
				x: self.x + 'px',
				y: self.y + 'px'
			});
		};
	};

	return Sensor;
});


define('canvas/detection/GridDetector',['dom/video/CameraRenderer', 'canvas/detection/Sensor'], function(CameraRenderer, Sensor) {
	var GridDetector = function(container, callback) {
		var ratio = 0.3;
		var cr = new CameraRenderer(container, {
			debug: true,
			video: false,
			callback: function(contextBlended) {
				// Check for collisions		
				for (var b = 0; b < sensors.length; b++) {
					// get the pixels from the blended image
					var blendedData = contextBlended.getImageData(sensors[b].x * ratio, sensors[b].y * ratio, sensors[b].width * ratio, sensors[b].height * ratio);

					// calculate the average lightness of the blended data
					var i = 0;
					var sum = 0;
					var countPixels = blendedData.data.length * 0.25;
					while (i < countPixels) {
						sum += (blendedData.data[i * 4] + blendedData.data[i * 4 + 1] + blendedData.data[i * 4 + 2]); ++i;
					}
					// calculate an average between of the color values of the note area [0-255]
					var average = Math.round(sum / (3 * countPixels));
					if (average > 50) // more than 20% movement detected
					{
						//console.log("Button " + sensors[b].name + " triggered."); // do stuff
                        //sensors[b].hit();
                        callback(sensors[b].x, sensors[b].y);
					}
				}
			}
		});

		// Sensors
		var sensors = [];
		var makeSensors = function() {
			var rows = 7;
			var cols = 7;
			var spacingW = window.innerWidth / cols;
			var spacingH = window.innerHeight / rows;
			var rowCtr = 0;

			for (var i = 0; i < rows; i++) {
				var colCtr = 0;
				for (var j = 0; j < cols; j++) {
					var s = new Sensor(container.el, 'assets/img/button.png', {
						name: (i * 10) + (j + 1),
						x: j * spacingW,
						y: i * spacingH,
						width: 6,
                        backgroundColor: ''
					});
					sensors.push(s);
				}
			}
		};

		makeSensors();
	};

	return GridDetector;
});


require(['core/utils/FpsTracker', 'dom/primitives/Container', 'proj/ThreeController', 'proj/OutputText', 'canvas/detection/GridDetector', 'threejs'], function(FpsTracker, Container, ThreeController, OutputText, GridDetector) {
	var Master = function() {

		// Scene
		var scene = new THREE.Scene();

		var init = function() {
			// Fps
			//var fps = new FpsTracker();

			var container = new Container({
				insert: {
					type: 'parent',
					target: document.body
				}
			});

            var ot = new OutputText();

			var tc = new ThreeController(container.el, {
				callbacks: {
					onRender: function(frame) {
						//fps.update();
					}
				},
                scene: scene
			});

            var gd = new GridDetector(container, tc.onHit);
		};

		init();

	}; // End
	var master = new Master();
});

define("assets/js/main", function(){});
