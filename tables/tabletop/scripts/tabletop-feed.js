var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    // Key from Google sheet goes in line below
    initializeTabletopObject('0Ank6vqQeY7CJdG1CYmJ6Z2RsRk5YWGtrMXBnRGhXa3c');

});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* Swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display. Spaces are 
    stripped out of column titles. */
    var tableColumns =   [
		{'mDataProp': 'athlete', 'sTitle': 'Athlete', 'sClass': 'center'},
		{'mDataProp': 'country', 'sTitle': 'Country', 'sClass': 'center'},
		{'mDataProp': 'discipline', 'sTitle': 'Event', 'sClass': 'center'},
        {'mDataProp': 'medal', 'sTitle': 'Medal', 'sClass': 'center'}
	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
		// 'sPaginationType': 'bootstrap',
		'iDisplayLength': 50, /* this number determines how many rows are displayed */
        'aaData': dataSource,
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
        }
    });
};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};