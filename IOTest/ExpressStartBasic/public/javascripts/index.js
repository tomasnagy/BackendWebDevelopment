/*
 * index.js
 * 
 * start om JSON api uit te bouwen 
 * bevat users collection voor users/index.jade  (userListData)
 * bevat user detail (getDetail)
 * 
 */



//0. namespace client minimaliseert globals
var client = {};

client.api = (function () {
    //1. vars ( local) -------------------------------------------------------------
    var root = this; //window;
    var userListData;
    
    var getList = function () {
        $.getJSON('/api/users/', function (data) {
            var tableRows = "";
            // bijhouden voor verder gebruik in een Array -> paging zou beter zijn
            userListData = data;
            // userListData.push(data);
            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function () {
                tableRows += '<tr>';
                //tableRows += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
                tableRows += '<td><b>' + this.username + '<b/></td>';
                tableRows += '<td>' + this.profession + '</td>';
                tableRows += '<td>' + this.email + '</td>';
                tableRows += '<td><a href="#" class="linkDeleteUser" rel="' + this.username + '">delete?</a></td>';
                tableRows += '<td><a href="#" class="linkDetailsUser" rel="' + this.username + '">details</a></td>';
                //tableRows += '<td><a href="#" class="linkUpdateUser" rel="' + this.username + '">update</a></td>';
                tableRows += '</tr>';
            });
            
            // Tablerows toevoegen aan tbody
            $('#userList table tbody').html(tableRows);
        });
    },
        getDetail = function (event) {
            // default click neutraliseren
            event.preventDefault();
            
            //Haal username op bij het "rel" attribute
            var thisUserName = $(this).attr('rel');
            
            //Converteer json object naar array om map te kunnen toepassen
            var arrUsers = $.map(userListData, function (user) {
                return user
            })
            
            //Haal de positie op in de array voor userName
            var arrayPosition = arrUsers.map(function (arrayItem) {
                return arrayItem.username;
            }).indexOf(thisUserName);
            
            showDetail(arrUsers[arrayPosition])

        },
        showDetail = function (user) {
            $('#name').text(user.name);
            //overige velden toevoegen inc. hidden ids
        },
        addHandlers = function () {
            $('#userList table tbody').on('click', 'td a.linkDetailsUser', getDetail);
        },
        start = $(document).ready(function () {
            console.log("jQuery loaded")
            getList();
            addHandlers();
        })
    return {
        start: start, //jQuery ophalen
        getList : getList, //DOM table opvullen
        showDetail : showDetail, // toon detail ve user in html tabel
        addHandlers : addHandlers , //unobtrusive handlers toevoegen aan tabel 
        userListData : userListData // bijhouden van de users
    }
})();

client.api.start;
