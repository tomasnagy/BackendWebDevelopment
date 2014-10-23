/**
 * Created by Tomas on 09/10/14.
 */
var GetText = function () {};

GetText.prototype = {
    reader: function(text) {
        var results = [],
            i = 0,
            lines = text.split('\n');

        lines.forEach(function(line) {
            results[i] = 'lijn' + i + ' ' + line;
            i++;
        });

        return results
    }
}

module.exports = GetText;