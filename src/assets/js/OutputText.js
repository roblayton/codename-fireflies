define(['dom/primitives/Elem'], function(Elem) {
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
