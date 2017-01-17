if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
            document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                    )
            )
    document.querySelector('head').appendChild(msViewportStyle)
}

if (!Array.prototype.searchobj) {
    Array.prototype.searchobj = function (key, value, r /*, thisp */) {
        if (this == null)
            throw new TypeError();
        var t = Object(this);
        var len = t.length >>> 0;
        var index = -1;
        for (var i = 0; i < len; i++) {
            var obj = t[i];
            if (obj[key] == value) {
                if (r)
                    index = obj[r];
                else
                    index = i;
            }
        }
        return index
    }
}
// dashboard variables
var table2_div;

// general variables
var prospectlistChunk = undefined;
var timeout = 180; // timeout de 3 horas en javascript
var timestart;
var timeend;
var countdown_worker;
var logdataflag = true;
var edmundsKey = "xsf584zha2zrg6p4fcuhxqce";
var vinPhotoURI = "http://media.ed.edmunds-media.com";
var edmundURI = "http://api.edmunds.com";
var WSS_URL = "./Model/handler.php";
var iconPath = "./Content/icons/";
var iconPathProspect = "./Content/icons/";
var testphonenumber = '';
var nophotolink = {photoID: "nophoto", big: "/Content/images/getphoto.png", title: "ENTER VIN AND CLICK DECODE", description: "To retrieve photos from Edmunds.com", url: ".", source: "edmunds"};
var tradeinConditionsOpt = [{condition: "Outstanding", description: "<p>Exceptional mechanical, exterior and interior condition; requires no reconditioning.</b></p><p>Vehicle is in exceptional mechanical, exterior and interior condition with no visible wear; it requires no reconditioning. Paint will have a glossy appearance. Vehicle has no mechanical and/or cosmetic problems and has a clean engine compartment. Exterior and interior are free of any damage. Tires are in nearly new condition. Vehicle has a clean title and has the ability to pass an emissions inspection.</p>"},
    {condition: "Clean", description: "<p><b>Some normal wear but no major mechanical or cosmetic problems; may require limited reconditioning.</b></p><p>Vehicle shows some normal wear but has no major mechanical and/or cosmetic problems. Paint still has a glossy finish and may have slight scratches or dings. Some reconditioning may be needed. Interior will have minimal fading and wear. Tires have substantial tread remaining. Vehicle has a clean title and has the ability to pass an emissions inspection.</p>"},
    {condition: "Average", description: "<p><b>May have a few mechanical and/or cosmetic problems and may require a considerable amount of reconditioning</b></p><p>Vehicle may have a few mechanical and/or cosmetic problems and may require a considerable amount of reconditioning. Exterior paint has some dullness. Vehicle may have a considerable amount of scratches or dings. Interior material is slightly worn and faded. Tires have some useable tread remaining. Vehicle has a clean title and has the ability to pass an emissions inspection.</p>"},
    {condition: "Rough", description: "<p><b>Several mechanical and/or cosmetic problems requiring significant repairs.</b></p><p>Vehicle has several mechanical and/or cosmetic problems. Exterior and interior need significant repairs. Tires may need to be replaced. Vehicle may need minor repairs to pass an emissions inspection, but has a clean title.</p>"},
    {condition: "Damaged", description: "<p><b>Major mechanical and/or body damage that may render it in non-safe running condition.</b></p><p>Vehicle has major mechanical and/or body damage that may render it in non-safe running condition. Exterior and interior is damaged or worn. Tires need to be replaced. Vehicle may have a branded title (i.e. salvaged, flooded, frame damaged, etc.). Vehicle may require significant repairs to pass an emissions inspection.</p>"}];

// appbar command options
var prospect_DfltViewAppBar = [{caption: 'More Data', cmdid: 'cmdmoredata', icon: 'more-48.png', role: 1},
    {caption: 'Comments', cmdid: 'cmdcomment', icon: 'comments.png', role: 1},
    {caption: 'Add Event', cmdid: 'cmdEvent', icon: 'tear_of_calendar.png', role: 1},
    {caption: 'Delete', cmdid: 'cmddelete', icon: 'delete.png', role: 2},
    {caption: 'Edit', cmdid: 'cmdedit', icon: 'edit.png', role: 1}];
var prospect_editViewAppBar = [{caption: 'More Data', cmdid: 'cmdmoredata', icon: 'more-48.png', role: 1},
    {caption: 'Cancel', cmdid: 'cmdcancel', icon: 'cancel.png', role: 1},
    {caption: 'Save', cmdid: 'cmdsave', icon: 'save.png', role: 1}];
var prospectlist_DfltViewAppBar = [{caption: 'New', cmdid: 'cmdnew', icon: 'new.png', role: 1}];

var basic_DfltViewAppBar = [
    {caption: 'Delete', cmdid: 'cmddelete', icon: iconPath + 'delete.png', seclevel: 10, role: 3, active: false},
    {caption: 'Edit', cmdid: 'cmdedit', icon: iconPath + 'edit.png', seclevel: 4, role: 1, active: false},
    {caption: 'New', cmdid: 'cmdnew', icon: iconPath + 'new.png', seclevel: 10, role: 3, active: true}];

var salesman_DfltViewAppBar = [
    {caption: 'Change password', cmdid: 'cmdchangepss', icon: iconPath + 'password1-48.png', seclevel: 4, role: 1, active: true},
    {caption: 'Reset password', cmdid: 'cmdresetpss', icon: iconPath + 'password2-48.png', seclevel: 10, role: 3, active: false},
    {caption: 'Activate', cmdactive: 1, cmdid: 'cmdactive', icon: iconPath + 'approve-48.png', seclevel: 10, role: 3, active: false},
    {caption: 'Deactivate', cmdactive: 0, cmdid: 'cmddeactive', icon: iconPath + 'disapprove-48.png', seclevel: 10, role: 3, active: false},
    {caption: 'Edit', cmdid: 'cmdedit', icon: iconPath + 'edit.png', seclevel: 4, role: 1, active: false},
    {caption: 'New', cmdid: 'cmdnew', icon: iconPath + 'new.png', seclevel: 10, role: 3, active: true}];

var salesman_editViewAppBar = [{caption: 'Cancel', cmdid: 'cmdcancel', icon: iconPath + 'cancel.png', seclevel: 4, role: 1, active: true},
    {caption: 'Save', cmdid: 'cmdsave', icon: iconPath + 'save.png', seclevel: 4, role: 1, active: true}];
// combo options
var genderdata = ["Male", "Female"];
var salesman_roles = [{name: 'Salesman', id: '1'}, {name: 'Manager', id: '2'}, {name: 'Administrator', id: '3'}, {name: 'CRM Support', id: '4'}];
// page navigation menu
var topmenu = [{name: "Dashboard", page: "dashboard", mobile: 1, seclevel: '0', role: 1, dropdown: null},
    {name: "Prospects", page: "prospect", mobile: 1, seclevel: '0', role: 1, dropdown: null},
    {name: "Calendar of Events", page: "calendar", mobile: 1, seclevel: 0, role: '1', dropdown: null},
    {name: "Reports", page: "reports", mobile: 0, seclevel: '0', role: 1, dropdown: null},
    {
        name: "Options", page: "adminpanel", mobile: 0, seclevel: '0', role: 1, dropdown:
                [{name: "Vehicle List", page: "modal-vehicleListWindow", seclevel: '0', role: 1, dropdown: null},
                    {name: "Trade-in Pricing", page: "modal-tradeinWindow", seclevel: '0', role: 1, dropdown: null},
                    {name: "divider", page: "divider", seclevel: '0', role: 1, dropdown: null},
                    {name: "Add/Edit User", page: "user", seclevel: '0', role: 3, dropdown: null},
                    {name: "Dropdowns", page: "dropdowns", seclevel: '0', role: 2, dropdown: null},
                    {name: "divider", page: "divider", seclevel: '0', role: 2, dropdown: null},
                    {name: "About LTS", page: "modal-aboutlts", seclevel: '0', role: 1, dropdown: null},
                    {name: "Help", page: "help", seclevel: '0', role: 1, dropdown: null}]
    }];
var mesesdelano = [{name: 'JANUARY', month: 1}, {name: 'FEBRUARY', month: 2}, {name: 'MARCH', month: 3},
    {name: 'APRIL', month: 4}, {name: 'MAY', month: 5}, {name: 'JUNE', month: 6},
    {name: 'JULY', month: 7}, {name: 'AUGUST', month: 8}, {name: 'SEPTEMBER', month: 9},
    {name: 'OCTOBER', month: 10}, {name: 'NOVEMBER', month: 11}, {name: 'DECEMBER', month: 12}];
var yearsssssss = [moment().years() - 4, moment().years() - 3, moment().years() - 2, moment().years() - 1, moment().years()];
var yesorno = [{id: 0, name: 'No'}, {id: 1, name: 'Yes'}];
var maritalstatus = [{id: 0, name: 'Married'}, {id: 1, name: 'Single'}, {id: 2, name: 'Divorced'}, {id: 3, name: 'Widowed'}, {id: 4, name: 'Cohabiting'}];
// charts


ko.bindingHandlers.context = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        viewModel.__context__ = element.getContext("2d");
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var callback = ko.utils.unwrapObservable(allBindingsAccessor().contextCallback);
        callback.call(viewModel, viewModel.__context__);
    }
};
//wrapper to an observable that requires accept/cancel
ko.protectedObservable = function (initialValue) {
    //private variables
    var _actualValue = ko.observable(initialValue),
            _tempValue = initialValue;

    //computed observable that we will return
    var result = ko.computed({
        //always return the actual value
        read: function () {
            return _actualValue();
        },
        //stored in a temporary spot until commit
        write: function (newValue) {
            _tempValue = newValue;
        }
    }).extend({notify: "always"});

    //if different, commit temp value
    result.commit = function () {
        if (_tempValue !== _actualValue()) {
            _actualValue(_tempValue);
        }
    };

    //force subscribers to take original
    result.reset = function () {
        _actualValue.valueHasMutated();
        _tempValue = _actualValue();   //reset temp value
    };

    return result;
};

//windows responsive helper
var width_offset = 0;
var height_offset = 0;
var widgetsHeight = 0;
var widgetsCHeight = 0;
var topMenuHeight = 0;
var topfilterHeight = 0;
var topfilterTop = 0;
var lastactiveview = '';
var widgetsWidth = {'salesContainer': 0, 'performanceContainer': 0, 'eventContainer': 0, 'table1Container': 0, 'table2Container': 0, 'table3Container': 0};
$(window).resize(function () {
    sizeRefresh();
});
$(window).scroll(function () {
    $('#coord').text($('#pd').css('bottom'));
});
function sizeRefresh(dashboard) {

    width_offset = $('body').width();
    height_offset = $('body').outerHeight();
    topMenuHeight = $('#topmenuid').outerHeight();
    topfilterHeight = $('#topfilter').outerHeight();
    topfilterTop = $('#topfilter').offset().top;

    if (width_offset < 768)
        iconPathProspect = "./Content/icons-xs/";
    else
        iconPathProspect = "./Content/icons/";

    if (topMenuHeight > 75)
        topMenuHeight = $('#topmenuid .navbar-header').outerHeight();

    widgetsHeight = (height_offset - topMenuHeight - topfilterHeight) / 2;
    widgetsCHeight = widgetsHeight - 26;

    dashboard = dashboard ? dashboard : lastactiveview;
    if (dashboard) {
        if (width_offset < 768) {
            $(".form-control").addClass('input-sm');
            $(".control-label").addClass('input-sm');
            $(".checkbox").addClass('input-sm');
        }
        else {
            $(".form-control").removeClass('input-sm');
            $(".control-label").removeClass('input-sm');
            $(".checkbox").removeClass('input-sm');
        }
        lastactiveview = dashboard;
        switch (dashboard) {
            case 'prospect_detail':
                var footheight = $(".navbar-fixed-bottom").outerHeight();
                footheight = footheight ? footheight - 10 : 120;
                footheight = footheight < 115 ? 115 : footheight;
                var panelsHeight = (height_offset - topMenuHeight - footheight) / 2;
                //$("#eventspanel").css('max-height', height_offset - topMenuHeight - footheight);
                //$("#eventspanel .panel-primary").css('max-height', height_offset - topMenuHeight - footheight);
                //$("#eventspanel .panel-primary .list-group").css('max-height', height_offset - topMenuHeight - footheight - 60);

                $("#commetsandevents").height(height_offset - topMenuHeight - footheight);
                $("#commetsandevents .panel").css('max-height', panelsHeight);
                $("#commetsandevents .panel .list-group").css('max-height', panelsHeight - 60);

                if (width_offset < 768) {
                    $("#eventdetail").removeClass('in');
                    $("#commentdetail").removeClass('in');
                }
                else {
                    $("#eventdetail").addClass('in');
                    $("#commentdetail").addClass('in');
                }
                break;
            case 'prospect':
                $(".prospect_listscroller").css('max-height', height_offset - topMenuHeight - topfilterHeight);
                break;
            case 'calendar':
                console.log('body width', width_offset, 'body height', height_offset);
                console.log('body topMenuHeight', topMenuHeight, 'body topfilterHeight', topfilterHeight);
                $(".calendar_scroller").css('max-height', height_offset - topMenuHeight - topfilterHeight - 10);
                if (width_offset < 768) {
                    $('#calendar').fullCalendar('changeView', 'agendaDay');
                    $('#calendar').fullCalendar('option', 'height', height_offset - topMenuHeight - topfilterHeight - 20);
                }
                break;
            case 'dashboard':
                widgetsWidth['salesContainer'] = $('#salesContainer').outerWidth();
                widgetsWidth['performanceContainer'] = $('#performanceContainer').outerWidth();
                widgetsWidth['eventContainer'] = $('#eventContainer').outerWidth();
                widgetsWidth['table1Container'] = $('#table1Container').outerWidth() - 10;
                widgetsWidth['table2Container'] = $('#table2Container').outerWidth() - 10;
                widgetsWidth['table3Container'] = $('#table3Container').outerWidth() - 10;
                $(".widget").height(widgetsHeight);
            case 'reportView':
                //objPDF
                $("#divPDF").height(height_offset - topMenuHeight);
                $("#objPDF").height(height_offset - topMenuHeight);
                break;
            case 'help':
                //objPDF
                $("#manualPDF").height(height_offset - topMenuHeight);
                $("#manualOBJ").height(height_offset - topMenuHeight);
                break;
            case 'user':
                var footheight = $(".navbar-fixed-bottom").outerHeight();
                footheight = footheight ? footheight - 10 : 120;
                footheight = footheight < 120 ? 120 : footheight;
                $(".list-scroller").css('max-height', height_offset - topMenuHeight - footheight);
                break;
        }
    }
}

// data structures 
var struct_prospect_moredetail = function (data) {
    more = this;
    if (data === undefined) {
        more.neededaction = 'INSERT';
        more.idprospects = 0;
        more.dob = ko.protectedObservable();
        more.maritalstatus = ko.protectedObservable();
        more.address1 = ko.protectedObservable();
        more.address2 = ko.protectedObservable();
        more.city = ko.protectedObservable();
        more.state = ko.protectedObservable();
        more.zip = ko.protectedObservable();
    } else {
        more.neededaction = data.neededaction;
        more.idprospects = data.idprospects;
        more.dob = ko.protectedObservable(data.dob == "0000-00-00" ? '' : data.dob);
        more.maritalstatus = ko.protectedObservable(data.maritalstatus);
        more.address1 = ko.protectedObservable(data.address1);
        more.address2 = ko.protectedObservable(data.address2);
        more.city = ko.protectedObservable(data.city);
        more.state = ko.protectedObservable(data.state);
        more.zip = ko.protectedObservable(data.zip);
    }
    more.commitAll = function () {
        more.dob.commit();
        more.maritalstatus.commit();
        more.address1.commit();
        more.address2.commit();
        more.city.commit();
        more.state.commit();
        more.zip.commit();
    };
    more.resetAll = function () {
        more.dob.reset();
        more.maritalstatus.reset();
        more.address1.reset();
        more.address2.reset();
        more.city.reset();
        more.state.reset();
        more.zip.reset();
    };
};
var struct_prospect_detail = function (data) {
    detail = this;
    if (data === undefined) {
        detail.idprospects = 0;
        detail.salesmanid = ko.protectedObservable(0);
        detail.salesperson = ko.protectedObservable('');
        detail.oldsalesmanid = 0;
        detail.timestamp = null;
        detail.gender = ko.protectedObservable();
        detail.age = ko.protectedObservable();
        detail.firstname = ko.protectedObservable();
        detail.middlename = ko.protectedObservable();
        detail.lastname = ko.protectedObservable();
        detail.homephone = ko.protectedObservable();
        detail.cellphone = ko.protectedObservable();
        detail.workphone = ko.protectedObservable();
        detail.donotcall = ko.protectedObservable();
        detail.email = ko.protectedObservable();
        detail.email2 = ko.protectedObservable();
        detail.donotemail = ko.protectedObservable();
        detail.firstcontact = ko.protectedObservable();
        detail.nextcontact = ko.protectedObservable();
        detail.status = ko.protectedObservable();
        detail.statusdesc = '';
        detail.udstatus = ko.protectedObservable();
        detail.udstatusdesc = '';
        detail.uptype = ko.protectedObservable();
        detail.adsource = ko.protectedObservable();
        detail.adsourcedetail = ko.protectedObservable();
        detail.vehicles = new Object({
            'P': new struct_vehicle_detail(),
            'S': new struct_vehicle_detail(),
            'T': new struct_vehicle_detail()
        });
        detail.more = new struct_prospect_moredetail();
    }
    else {
        detail.idprospects = data.idprospects;
        detail.salesmanid = ko.protectedObservable(data.salesmanid);
        detail.salesperson = ko.protectedObservable(data.salesperson);
        detail.oldsalesmanid = data.salesmanid;
        detail.timestamp = null;
        detail.gender = ko.protectedObservable(data.gender);
        detail.age = ko.protectedObservable(data.age);
        detail.firstname = ko.protectedObservable(data.firstname);
        detail.middlename = ko.protectedObservable(data.middlename);
        detail.lastname = ko.protectedObservable(data.lastname);
        detail.homephone = ko.protectedObservable(data.homephone);
        detail.cellphone = ko.protectedObservable(data.cellphone);
        detail.workphone = ko.protectedObservable(data.workphone);
        detail.donotcall = ko.protectedObservable(data.donotcall == 0 ? false : true);
        detail.email = ko.protectedObservable(data.email);
        detail.email2 = ko.protectedObservable(data.email2);
        detail.donotemail = ko.protectedObservable(data.donotemail == 0 ? false : true);
        detail.firstcontact = data.firstcontact == "0000-00-00" ? ko.protectedObservable() : ko.protectedObservable(stdDateFormat(data.firstcontact));
        detail.nextcontact = data.nextcontact == "0000-00-00" ? ko.protectedObservable() : ko.protectedObservable(stdDateFormat(data.nextcontact));
        detail.status = ko.protectedObservable(data.status);
        detail.statusdesc = data.statusdesc;
        detail.udstatus = ko.protectedObservable(data.udstatus);
        detail.udstatusdesc = data.udstatusdesc;
        detail.uptype = ko.protectedObservable(data.uptype);
        detail.adsource = ko.protectedObservable(data.adsource);
        detail.adsourcedetail = ko.protectedObservable(data.adsourcedetail);
        detail.vehicles = new Object({
            'P': new struct_vehicle_detail(data.vehicles.P),
            'S': new struct_vehicle_detail(data.vehicles.S),
            'T': new struct_vehicle_detail(data.vehicles.T)
        });
        detail.more = new struct_prospect_moredetail(data.more);
    }
    detail.commitAll = function () {
        detail.salesmanid.commit();
        detail.salesperson.commit();
        detail.gender.commit();
        detail.age.commit();
        detail.firstname.commit();
        detail.middlename.commit();
        detail.lastname.commit();
        detail.homephone.commit();
        detail.cellphone.commit();
        detail.workphone.commit();
        detail.donotcall.commit();
        detail.email.commit();
        detail.email2.commit();
        detail.donotemail.commit();
        detail.firstcontact.commit();
        detail.nextcontact.commit();
        detail.status.commit();
        detail.udstatus.commit();
        detail.uptype.commit();
        detail.adsource.commit();
        detail.adsourcedetail.commit();
        detail.vehicles.P.commitAll();
        detail.vehicles.S.commitAll();
        detail.vehicles.T.commitAll();
    };
    detail.resetAll = function () {
        detail.salesmanid.reset();
        detail.salesperson.reset();
        detail.gender.reset();
        detail.age.reset();
        detail.firstname.reset();
        detail.middlename.reset();
        detail.lastname.reset();
        detail.homephone.reset();
        detail.cellphone.reset();
        detail.workphone.reset();
        detail.donotcall.reset();
        detail.email.reset();
        detail.email2.reset();
        detail.donotemail.reset();
        detail.firstcontact.reset();
        detail.nextcontact.reset();
        detail.status.reset();
        detail.udstatus.reset();
        detail.uptype.reset();
        detail.adsource.reset();
        detail.adsourcedetail.reset();
        detail.vehicles.P.resetAll();
        detail.vehicles.S.resetAll();
        detail.vehicles.T.resetAll();
    };
};
var struct_prospect_list = function (data) {
    list = this;
    list.id = data.id;
    list.fullname = data.fullname;
    list.tel = data.tel;
    list.email = data.email;
    list.firstcontact = data.firstcontact;
    //list.venicle1 = data.vehicle1;
    //list.vehicle2 = data.vehicle2;
    list.uptype = data.uptype;
    list.adsource = data.adsource;
    list.status = data.status;
    list.statusdesc = ko.observable(data.statusdesc);
    list.udstatus = data.udstatus;
    list.udstatusdesc = ko.observable(data.udstatusdesc);
    list.salesman = data.salesman;
    list.comments = data.comments;
    list.actions = ko.observableArray(data.actions);
    list.vehicles = data.vehicles;
    if (typeof list.actions == 'Object') {
        list.actions.sort(function (left, right) {
            return left.action_datetime == right.action_datetime ? 0 : (left.action_datetime < right.action_datetime ? -1 : 1);
        });
    }
};
var struct_salesman_detail = function (data) {
    var user = this;
    user.firstname = ko.observable();
    user.lastname = ko.observable();
    user.middlename = ko.observable();
    user.id = 0;
    user.email = ko.observable();
    user.oldemail = ko.observable();
    user.securitylevel = ko.observable(1);
    user.role = ko.observable(1);
    user.iddealer = ko.observable();
    user.dlrname = ko.observable();
    user.rolename = '';
    user.password = '';
    user.reenter = '';
    user.homephone = '';
    user.smsnumber = '';
    user.gender = ko.observable(null);
    user.active = ko.observable(1);
    if (data) {
        user.firstname(data.firstname);
        user.lastname(data.lastname);
        user.middlename(data.middlename);
        user.id = data.id;
        user.email(data.email);
        user.oldemail(data.email);
        user.securitylevel(data.securitylevel);
        user.role(data.role);
        user.iddealer(data.iddealer);
        user.dlrname(data.dlrname);
        user.rolename = data.rolename;
        user.homephone = data.homephone;
        user.smsnumber = data.smsnumber;
        user.gender(data.gender);
        user.active(data.active);
    }

};
var struct_vehicle_detail = function (data) {
    var veh = this;
    if (data === undefined) {
        veh.idvehicles = 0;
        veh.idprospects = 0;
        veh.idtradein = 0;
        veh.post_id = ko.protectedObservable(0);
        veh.position = 'P';

        veh.type = ko.protectedObservable('U');
        veh.stocknumber = ko.protectedObservable('');
        veh.make = ko.protectedObservable('');
        veh.model = ko.protectedObservable('');
        veh.year = ko.protectedObservable('');
        veh.vin = ko.protectedObservable('');
        veh.color = ko.protectedObservable('');

        veh.appraisal = ko.protectedObservable(0.00);
        veh.condition = ko.protectedObservable('');
        veh.msrp = ko.protectedObservable(0.00);
    }
    else {
        veh.idvehicles = data.idvehicles;
        veh.idprospects = data.idprospects;
        veh.idtradein = data.idtradein;
        veh.post_id = ko.protectedObservable(data.post_id);
        veh.position = data.position;

        veh.type = ko.protectedObservable(data.type);
        veh.stocknumber = ko.protectedObservable(data.stocknumber);
        veh.make = ko.protectedObservable(data.make);
        veh.model = ko.protectedObservable(data.model);
        veh.year = ko.protectedObservable(data.year);
        veh.vin = ko.protectedObservable(data.vin);
        veh.color = ko.protectedObservable(data.color);

        veh.appraisal = ko.protectedObservable(data.appraisal);
        veh.condition = ko.protectedObservable(data.condition);
        veh.msrp = ko.protectedObservable(data.msrp);
    }
    veh.commitAll = function () {
        veh.post_id.commit();
        veh.type.commit();
        veh.stocknumber.commit();
        veh.make.commit();
        veh.model.commit();
        veh.year.commit();
        veh.vin.commit();
        veh.color.commit();
        veh.appraisal.commit();
        veh.condition.commit();
        veh.msrp.commit();
    };
    veh.resetAll = function () {
        veh.post_id.reset();
        veh.type.reset();
        veh.stocknumber.reset();
        veh.make.reset();
        veh.model.reset();
        veh.year.reset();
        veh.vin.reset();
        veh.color.reset();
        veh.appraisal.reset();
        veh.condition.reset();
        veh.msrp.reset();
    };
};
var struct_dropdown = function (data, para) {
    var dd = this;
    dd.name = ko.observable(data ? data.name : '');
    dd.id = ko.observable(data ? data.id : 0);
    dd.editable = ko.observable(data ? data.editable : 0);

    if (para === 'cl-dealership') {
        dd.groupname = 'dealership';
        dd.addr1 = ko.observable(data ? data.addr1 : '');
        dd.addr2 = ko.observable(data ? data.addr2 : '');
        dd.city = ko.observable(data ? data.city : '');
        dd.state = ko.observable(data ? data.state : '');
        dd.zip = ko.observable(data ? data.zip : '');
        dd.tel = ko.observable(data ? data.tel : '');
        dd.squota = ko.observable(data ? data.squota : '');
        dd.dquota = ko.observable(data ? data.dquota : '');
    }
    else {
        dd.active = ko.observable(data ? data.active == 1 : false);
        dd.attachenable = ko.observable(data ? data.attachenable : 0);
        dd.attachevent = ko.observable(data ? data.attachevent == 1 : false);
        dd.attachevent_id = ko.observable(data ? data.attachevent_id : undefined);
        dd.attachevent_unq = ko.observable(data ? data.attachevent_unq == 1 : false);
        dd.chartid = 0;
        dd.color = ko.observable(data ? data.color : "#FFFFFF");
        dd.description = ko.observable(data ? data.description : null);
        dd.groupname = ko.observable(data ? data.groupname : 'newdrop');
        dd.idgroup = ko.observable(data ? data.active : 0);
        dd.showincalendar = "0";
    }
};
var pages;

// main function
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function messagealert(message, type, callback, timeout) {
    $('.msg_overlay').css('display', 'block');

    $('#innermessagebox').removeClass("alert-success alert-info alert-warning alert-danger");
    $('#messagebox').removeClass("alert-success alert-info alert-warning alert-danger");

    type ? $('#messagebox').addClass("alert-" + type) : $('#messagebox').addClass("alert-info");
    type ? $('#innermessagebox').addClass("alert-" + type) : $('#innermessagebox').addClass("alert-info");

    $('#messagebox').css('display', 'block');
    $('#messagecontent').html(message);

    var h = ((($("#messagebox").height()) / 2) * -1) + 'px';
    var hmsg = $("#innermessagebox").height();
    var hmsgcnt = $("#messagecontent").height();
    var pad = (hmsg / 2) - (hmsgcnt / 2);

    $('#innermessagebox').css('padding-top', pad + 'px');
    $('#messagebox').css('margin-top', h);

    if (callback && typeof (callback) === "function") {
        $(".prompt-opt").css('display', 'inline-block');
        $(".msg-opt").css('display', 'none');

        $("#prompt-YES, #prompt-NO").one("click", function () {
            $('#messagebox').css('display', 'none');
            $('.msg_overlay').css('display', 'none');
            callback($(this).text(), message);
        });
    } else {
        $(".prompt-opt").css('display', 'none');
        $(".msg-opt").css('display', 'inline-block');
        $("#prompt-CLOSE").one("click", function () {
            $('#messagebox').css('display', 'none');
            $('.msg_overlay').css('display', 'none');
        });
        if (timeout && timeout > 0) {
            setTimeout(function () {
                $('#messagebox').css('display', 'none');
                $('.msg_overlay').css('display', 'none');
            }, timeout);
        }
    }
}

jQuery.validator.addMethod("year", function (value, element) {
    return setvalidationclass(element, this.optional(element) || /^[0-9]{4}$/.test(value));
}, "This field must be 4 Digit (2009)");
jQuery.validator.addMethod("alphachar", function (value, element) {
    return setvalidationclass(element, this.optional(element) || /^[a-zA-Z][a-zA-Z0-9-óúíñÑáé¡¿?!_\.,# ]{0,50}$/.test(value));
}, "First letter can not be a number and only alphanumeric character allowed");
jQuery.validator.addMethod("addr", function (value, element) {
    return setvalidationclass(element, this.optional(element) || /^[a-zA-Z0-9-óúíñÑáé¡¿?!_\.,# ]{0,30}$/.test(value));
}, "Only alphanumeric character allowed");
jQuery.validator.addMethod("zipcode", function (value, element) {
    return setvalidationclass(element, this.optional(element) || /\d{5}([\-]\d{4})?/.test(value));
}, "format is nnnnn or nnnnn-nnnn");
jQuery.validator.addMethod("currency", function (value, element) {
    return setvalidationclass(element, this.optional(element) || /^(\d*\.\d{1,2}|\d+)$/.test(value));
}, "Digits only allowed (1.00)");
jQuery.validator.addMethod("telephone", function (value, element) {
    return setvalidationclass(element, this.optional(element) || /\d{3}[\-]\d{3}[\-]\d{4}/.test(value));
}, "format is nnn-nnn-nnnn");
function setvalidationclass(e, valid) {
    var elementId = $(e).attr("id");
    var elementErrorId = elementId + "-error";
    if (valid == true) {
        $(e).removeClass('invalidinput');
    } else {
        if (!$(e).val()) {
            if ($(e).attr('required')) {
                $(e).addClass('invalidinput');
                setValidationPosition(elementErrorId, elementId);
            }
        } else {
            $(e).addClass('invalidinput');
            setValidationPosition(elementErrorId, elementId);
        }
    }
    return valid;
}
function setValidationPosition(messageID, anchorID) {
    var anchorTop = (($("#" + anchorID).outerHeight() + 5) * -1) + "px";
    $("#" + messageID).offset({top: anchorTop});
    ;
}
jQuery.validator.addClassRules("telephone", {
    telephone: true
});
jQuery.validator.addClassRules("year", {
    year: true
});
jQuery.validator.addClassRules("zipcode", {
    zipcode: true
});
jQuery.validator.addClassRules("alphachar", {
    alphachar: true
});
jQuery.validator.addClassRules("addr", {
    addr: true
});
jQuery.validator.addClassRules("currency", {
    currency: true
});

function lightCRM() {
    self = this;

    self.closeViabutton = false;
    self.dataValidator = function (formElement) {
        if ($("#" + formElement.id).valid()) {
            switch (formElement.id) {
                case 'prospectform':
                    self.prospectDetail_save();
                    break;
                default:
                    break;
            }
        }
    };
    sizeRefresh();
    self.activeView = ko.observable('');
    self.activeReport = ko.observable();
    self.activeView_resize = function () {
        var active = self.activeView();
        switch (active) {
            case 'prospect_detail':
                var footheight = $(".navbar-fixed-bottom").outerHeight();
                footheight = footheight ? footheight - 10 : 120;
                $("#eventspanel").css('max-height', height_offset - topMenuHeight - footheight);
                $("#eventspanel .panel-primary").css('max-height', height_offset - topMenuHeight - footheight);
                $("#eventspanel .panel-primary .list-group").css('max-height', height_offset - topMenuHeight - footheight - 60);
                break;
            case 'prospect':
                $(".prospect_listscroller").css('max-height', height_offset - topMenuHeight - topfilterHeight);
                break;
            case 'calendar':
                $(".calendar_scroller").css('max-height', height_offset - topMenuHeight - topfilterHeight - 10);
                break;
        }
    };
    // menu command trigger action
    self.topmenubar = ko.observableArray([]);
    self.topmenuTriggers_salesman = function (data, e) {
        var filterSelected = e.currentTarget.id;
        var menuselected = e.currentTarget.id;
        var filtervalue = 0;
        self.page_set(1);
        $('#cmdedit').attr('disabled', 'disabled');
        $('#cmdresetpss').attr('disabled', 'disabled');


        cleanpopups();

        var splitpos = filterSelected.search("-");
        if (splitpos > 0) {
            filtervalue = filterSelected.substr(splitpos + 1);
            menuselected = filterSelected.substr(0, splitpos);
            switch (menuselected) {
                case 'userid':
                    self.salesman_name(data.username);
                    //sessionStorage.userid = data.idusers;
                    sessionStorage.initials = data.initials;
                    sessionStorage.fullname = data.username;

                    self.salesman_id(data.idusers);
                    self.salesman_initials(data.initials);
                    break;
                case 'month':
                    self.dashboard_month(data.month);
                    self.dashboard_monthName(data.name);
                    break;
                case 'year':
                    self.dashboard_year(data);
                    break;
            }
            //$('#dashboard').addClass('invisible');


            if (self.activeView() === 'calendar') {
                self.activeView('blank');
                self.activeView('calendar');
                $("#calendar").fullCalendar('refetchEvents');
            }
            if (self.activeView() === 'prospect') {
                self.prospect_listRefresh(self.salesman_id());

                self.page_specialbutton();
            }
            if (self.activeView() === 'dashboard') {
                //$('#dashboard').removeClass('invisible');
                google.load("visualization", "1", {packages: ["corechart", "table", "gauge"], "callback": drawChart});
            }
        }
    };
    self.topmenuTriggers = function (data, e) {
        var menumasterid = e.currentTarget.id;
        var menuselected = e.currentTarget.id;
        var submenuselected = '';
        var gotomenu = data.page;
        for (var i = 0; i < self.topmenubar().length; i++) {
            var menuid = self.topmenubar()[i].page + 'li';
            var menua = self.topmenubar()[i].page + 'a';
            $('#' + menuid).removeClass("active");
            var dropcount = self.topmenubar()[i].dropdown ? self.topmenubar()[i].dropdown.length : 0;
            for (var drop = 0; drop < dropcount; drop++) {
                var dropmenu = self.topmenubar()[i].dropdown[drop];
                if (menumasterid == (dropmenu.page + 'a'))
                    menuselected = menuid;
            }
            if (menumasterid == menua)
                menuselected = menuid;
        }
        $('#' + menuselected).addClass("active");
        if (data.name)
            $('#topprefix').text(data.name);
        if (gotomenu) {
            var submenu = gotomenu.search("-");
            if (submenu > 0) {
                submenuselected = gotomenu.substr(submenu + 1);
                gotomenu = gotomenu.substr(0, submenu);

                if (gotomenu === 'userid') {
                    sessionStorage.userid = data.idusers;
                    sessionStorage.initials = data.initials;

                    self.salesman_id(data.idusers);
                    self.salesman_initials(data.initials);

                }
            }
        } else
            gotomenu = menumasterid;

        $('#cmdedit').attr('disabled', 'disabled');
        $('#cmdresetpss').attr('disabled', 'disabled');

        cleanpopups();

        switch (gotomenu) {
            case 'modal':
                //$('#topfilter').addClass('hidden');

                self.vehicle_source = 'G';

                $('#' + submenuselected).modal('show');

                $('.phototag').removeClass('photoselected');
                break;
            case 'userid':
                $('#topfilter').addClass('hidden');

                if (self.activeView() === 'calendar') {
                    self.activeView('blank');
                    self.activeView('calendar');
                    $("#calendar").fullCalendar('refetchEvents');
                }
                if (self.activeView() === 'prospect')
                    self.prospect_listRefresh(self.salesman_id());
                if (self.activeView() === 'dashboard') {
                    google.load("visualization", "1", {packages: ["corechart", "table", "gauge"], "callback": drawChart});
                }

                break;
            case 'usrlogout':
            case 'cmdlogout':
                $('#topfilter').addClass('hidden');
                logoff_usr();
                break;
            case 'usrprofile':
                $('#topfilter').addClass('hidden');

                AJAX_requests('GET', 'salesman', 'detail', {id: self.user_id()}, function (cldata) {
                    for (var i = 0; i < cldata.length; i++) {
                        self.salesman_detail(new struct_salesman_detail(cldata[i]));
                    }
                    self.salesman_opt(1);
                    self.activeView('user');
                });
                break;
            case 'user':
                $('#topfilter').addClass('hidden');
                self.salesman_opt(0);
                self.activeView('user');
                break;
            case 'reports':
                $('#topfilter').addClass('hidden');
                self.report_sel(data.subpage);
                AJAX_requests('GET', 'reports', 'load', {titleid: self.report_sel()}, function (responsedata) {
                    var report = responsedata[0];
                    self.propt_options(JSON.parse(report.prompt_options));
                    self.reporttitle(report.title);


                    self.activeView(gotomenu);

                    if (self.propt_options().length > 0)
                        $('#reportOptions').modal('show');
                    else {
                        self.activeView('reportView');
                    }
                });
                break;
            case 'prospect':
                $('#topfilter').removeClass('hidden');
                self.filterby_resets();
                self.activeView(gotomenu);
                self.page_specialbutton();
                self.prospect_listRefresh(self.salesman_id());

                break;
            case 'calendar':
                $('#topfilter').removeClass('hidden');
                self.activeView(gotomenu);
                break;
            case 'dropdowns':
                self.dropdown_appbar(basic_DfltViewAppBar);
            default:
                $('#topfilter').addClass('hidden');
                self.activeView(gotomenu);
                break;

        }
        if (gotomenu === 'dashboard') {
            $('#topfilter').removeClass('hidden');
            google.load("visualization", "1", {packages: ["corechart", "table", "gauge"], "callback": drawChart});
        }
    };
    self.topmenuTriggersFilters = function (data, e) {
        var commandid = e.currentTarget.id;
        var commandtop = $(e.currentTarget).offset().top + $(e.currentTarget).outerHeight();
        var commandleft = $(e.currentTarget).offset().left - ($(e.currentTarget).outerWidth()) - e.offsetY;
        var footheight = $(".navbar-fixed-bottom").outerHeight();

        var filterpopup = e.currentTarget.dataset.toggle;

        var height_available = height_offset - commandtop - footheight - 10;


        if ($(filterpopup).css('display') == 'none') {
            cleanpopups();

            $(filterpopup).css('top', commandtop + 'px');
            if (commandleft < 0) {
                commandleft = $(e.currentTarget).offset().left;
            }
            $(filterpopup).css('left', commandleft + 'px');
            if ($(filterpopup).height() > (height_available)) {
                $(filterpopup).height(height_available);
                var popoverH = height_available - 20 - 35 - 18;
                $(filterpopup + ' .popover-content').height(popoverH + "px")
            }
            $(filterpopup).css('display', 'block');
        } else
            cleanpopups();
    };
    // login trigger action
    self.login_trigger = function () {
        var pwhash = CryptoJS.MD5($('#password').val());
        var exp = moment().add(timeout, 'm').format('X');

        pwhash = pwhash.toString(CryptoJS.enc.Hex);
        AJAX_requests('POST', 'login', 'login', {username: $('#username').val(), password: pwhash, time: exp}, function (responsedata) {
            if (responsedata && responsedata.userverified) {

                sessionStorage.username = responsedata.user.firstname + ' ' + responsedata.user.lastname;
                sessionStorage.fullname = responsedata.user.firstname + ' ' + responsedata.user.lastname;
                sessionStorage.role = parseInt(responsedata.user.role);
                sessionStorage.gender = responsedata.user.gender ? responsedata.user.gender : 'Male';
                sessionStorage.level = responsedata.user.level;
                sessionStorage.userid = responsedata.user.id;
                sessionStorage.userlist = JSON.stringify(responsedata.userlist);
                sessionStorage.dealername = responsedata.user.dlrname;
                sessionStorage.expirationdate = exp;
                sessionStorage.sec = responsedata.user.sec;
                sessionStorage.image = sessionStorage.role === 1 ? './Content/icons/user.png' : './Content/icons/administrator.png';

                sessionStorage.initials = responsedata.user.initials;
                sessionStorage.zip = responsedata.user.zip;
                sessionStorage.salesman_quota = responsedata.user.squota;
                sessionStorage.dealer_quota = responsedata.user.dquota;

                self.reportuserid(responsedata.user.id);
                self.salesman_list(responsedata.userlist);
                self.user_id(responsedata.user.id);
                self.salesman_initials(responsedata.user.initials);
                self.salesman_role(parseInt(responsedata.user.role));
                self.user_login(true);
                if (self.salesman_role() > 1) {
                    self.salesman_name("All Salesperson");
                    self.salesman_id('ALL');
                } else {
                    self.salesman_name(sessionStorage.fullname);
                    self.salesman_id(responsedata.user.id);
                }

                startWorker();
                $("#userlogin").html(sessionStorage.username);
                $("#dealer").html(sessionStorage.dealername);

                $(".topfilterOptions").css("display", "block");
                self.activeView('dashboard');
                //google.load("visualization", "1.0", { packages: ["corechart", "table", "gauge", "controls"], "callback": drawChart });
                google.load("visualization", "1.1", {packages: ["controls"], "callback": drawChart});

                $(".topfilterOptions").css("display", "block");
                self.getDropdowns();
                $(".loading_overlay").css('display', 'none');
                $("#loadingwrapper").css('display', 'none');
                $('#topfilter').removeClass('hidden');
                //self.dashboard_filterset();
                //self.prospect_listRefresh();
                location.reload(true);
            }
            else {
                messagealert('<b>Wrong credentials entered. <br/> Please try again</b>', 'danger');
            }
        });
    };

    // dashboard variables
    self.dashboard_monthName = ko.observable(moment().format("MMMM"));
    self.dashboard_month = ko.observable(moment().format("M"));
    self.dashboard_year = ko.observable(moment().format("YYYY"));

    // prospect list and detail variables
    self.prospect_list = ko.observableArray([]);
    self.prospect_viewevent = ko.observable(false);
    self.prospect_viewevent_toggle = function (data, toggle) {
        var commandid = toggle.currentTarget.id;
        self.prospect_viewevent(commandid.replace("view_", "") == "on" ? false : true);
    };
    self.prospect_actiondetail = ko.observableArray([]);
    self.prospect_commentsdetail = ko.observableArray([]);
    self.prospect_detail = ko.observableArray([]);
    self.prospect_iseditable = ko.observable(false);
    self.prospect_add = ko.observable(false);
    self.prospect_edit = ko.observable(false);
    self.prospect_change = false;
    self.prospect_id = 0;
    self.prospect_selname = ko.observable('');
    self.prospect_newcount = ko.observable(0);
    self.prospect_newcomments = ko.observable(0);
    self.prospect_tradein = ko.observableArray([]);

    self.prospect_statuschange = 0;
    self.prospect_statuschangeindex = 0;
    self.prospect_status = 0;
    self.prospect_statustrigger = function (action) {
        if (self.prospect_statuschange != 0 && self.prospect_id != 0) {
            AJAX_requests('POST', 'prospect', action, {id: self.prospect_id, status: self.prospect_statuschange}, function (response) {
                self.prospect_statuschange = 0;
                //$('#' + self.prospect_statuschangeid).text(response.detail[0].statusdesc);
                self.prospect_list.splice(self.prospect_statuschangeindex, 1, response.detail[0]);
            });
        }
    }
    self.prospect_statuscheck = function (action_type, status_atached, oldstatus_atached, statussource) {
        //console.log("new status", status_atached);
        //console.log("old status", oldstatus_atached);
        //console.log("new action_type", action_type);
        AJAX_requests('GET', 'events', 'CHECK', {action_type: action_type, idprospects: self.prospect_id, oldactionid: oldstatus_atached.attachevent_id, newactionid: status_atached.attachevent_id}, function (responsedata) {
            if (responsedata.oldaction && oldstatus_atached.attachevent_unq == 1) {
                var oldactiondata = responsedata.oldaction[0];
                var eventname = new String(self.eventtype().searchobj('id', oldstatus_atached.attachevent_id, 'name'));
                var message = "<p>El <b>" + (statussource == 'changestatus' ? "'STATUS'" : "'SUB-STATUS'") + "</b> del prospecto es <b>" + (oldstatus_atached.name).toUpperCase() +
                        "</b>, para cambiarlo debe cancelar el <b>EVENTO " + eventname.toUpperCase() +
                        "</b> primero.<br/>¿Desea cancelar el <b>EVENTO " + eventname.toUpperCase() + "</b>?</p>";
                messagealert(message, 'danger', function (opt) {
                    self.prospect_statuschange = 3;
                    if (opt == 'YES') {
                        self.event_new(false);
                        cleanEventWindow();
                        setEventWindow(oldactiondata);
                        setEventStatus(status_atached, oldstatus_atached, statussource);
                        $('#eventsWindow').modal('show');
                    }
                });
            } else {
                if (status_atached.attachevent != 0) {
                    if (responsedata.newaction && status_atached.attachevent_unq) {
                        var newactiondata = responsedata.newaction[0];
                        var eventname = new String(self.eventtype().searchobj('id', action_type, 'name'));
                        var message = "<p>Ya existe un evento <b>" + eventname.toUpperCase() + "</b> y solo puede haber un evento <b>" + eventname.toUpperCase() + "</b> por prospecto.<br/>Desea editar el mismo?</p>";
                        messagealert(message, 'warning', function (opt) {
                            if (opt == 'YES') {
                                $("#addevent").removeAttr("disabled");
                                self.event_new(false);
                                cleanEventWindow();
                                setEventWindow(newactiondata);
                                setEventStatus(status_atached, oldstatus_atached, statussource);
                                $('#eventsWindow').modal('show');
                            } else {
                                $("#addevent").removeAttr("disabled");
                                $('#eventsWindow').modal('hide');
                            }
                        });
                    } else {
                        if (responsedata.prospectsalesman) {
                            $("#action_selowner").prop("checked", responsedata.prospectsalesman.salesmanid == self.user_id() ? true : false);
                            $("#ownername").text(responsedata.prospectsalesman.salesperson);
                            $('#ownerid').val(responsedata.prospectsalesman.salesmanid);
                            self.prospect_selname(responsedata.prospectsalesman.prospect);
                            self.event_salesmanid = responsedata.prospectsalesman.salesmanid;
                        }
                        cleanEventWindow();

                        if (self.prospect_status == status_atached.id) {
                            self.prospect_statuschange = 0;
                            self.event_triggerSave('add', self.event_datatosave, statussource);
                        }
                        else {
                            if (self.event_datatosave) {
                                self.event_triggerSave('add', self.event_datatosave, statussource);
                            } else {
                                self.event_new(true);
                                $('#action_date').val(moment().format('l'));
                                $('#action_time').val(moment().format('hh:mm A'));
                                $("#action_duration_type").val('NONE');
                                setDurationStep()
                                // console.log("new action_type", action_type);
                                $("#action_type").val(action_type);
                                setEventStatus(status_atached, oldstatus_atached, statussource);
                                $('#eventsWindow').modal('show');
                            }
                        }
                    }
                } else {
                    self.prospect_statuschange = status_atached.id;
                    self.prospect_statustrigger(statussource);
                }
            }
        });
    };
    self.prospect_statuscheck2 = function (action_type, status_atached, oldstatus_atached, statussource) {
        self.prospect_statuschange = status_atached.id;
        var eventname = new String(self.eventtype().searchobj('id', oldstatus_atached.attachevent_id, 'name'));
        console.log('prospect_statuscheck2', status_atached);
        if (oldstatus_atached.attachevent == 1 && oldstatus_atached.attachevent_unq == 1) {
            var message = "<p>El <b>" + (statussource == 'changestatus' ? "'STATUS'" : "'SUB-STATUS'") + "</b> del prospecto es <b>" + (oldstatus_atached.name).toUpperCase() +
                    "</b>, para cambiarlo debe cancelar el <b>EVENTO " + eventname.toUpperCase() +
                    "</b> primero.<br/>¿Desea cancelar el <b>EVENTO " + eventname.toUpperCase() + "</b>?</p>";
            messagealert(message, 'danger', function (opt) {
                self.prospect_statuschange = 3;
                if (opt == 'YES') {
                    AJAX_requests('GET', 'events', 'GET', {action_type: oldstatus_atached.attachevent_id, idprospects: self.prospect_id}, function (responsedata) {
                        if (responsedata && responsedata[0]) {
                            self.event_new(false);
                            //cleanEventWindow();
                            setEventWindow(responsedata[0]);

                            setEventStatus(status_atached, oldstatus_atached, statussource);
                            $('#eventsWindow').modal('show');

                        } else {
                            self.event_new(true);
                            //cleanEventWindow();
                            $('#action_date').val(moment().format('l'));
                            $('#action_time').val(moment().format('hh:mm A'));
                            $("#action_duration_type").val('NONE');
                            setDurationStep();
                            $("#action_type").val(oldstatus.attachevent_id);

                            setEventStatus(status_atached, oldstatus_atached, statussource);
                            $('#eventsWindow').modal('show');
                        }
                    });
                }
            });
        } else {
            if (self.event_datatosave) {
                self.event_triggerSave('add', self.event_datatosave, statussource);
            } else {
                self.event_new(true);
                $('#action_date').val(moment().format('l'));
                $('#action_time').val(moment().format('hh:mm A'));
                $("#action_duration_type").val('NONE');
                setDurationStep()
                $("#action_type").val(action_type);
                setEventStatus(status_atached, oldstatus_atached, statussource);
                $('#eventsWindow').modal('show');
            }
        }
    };
    self.prospect_statusclick = function (data, e) {
        var commandid = e.currentTarget ? e.currentTarget.id : e;
        var n = commandid.search("_");
        if (n > 0) {
            var prospectid = commandid.substr(n + 1);
            var commandselected = commandid.substr(0, n);
            var d = commandselected.search("-");
            if (d > 0) {
                commandselected = commandselected.substr(0, d);
            }
        } else {
            var commandselected = commandid;
        }
        self.prospect_id = prospectid;
        self.prospect_selname(data.fullname ? data.fullname : $('#' + commandid).attr("data-fullname"));

        switch (commandselected) {
            case 'selected':
                var popid = $('#' + commandid).attr("data-popid");
                var oldstatus = $('#' + commandid).attr("data-oldstatus");
                self.event_datatosave = null;
                cleanpopups();

                var newstatus = JSON.parse($('#' + commandid).attr("data-status"));
                var statussource = $('#' + commandid).attr("data-statussrc");
                if (oldstatus == 'undefined') {
                    self.prospect_statuschange = newstatus.id;
                    self.prospect_statustrigger(statussource);
                } else {
                    var oldstatus = JSON.parse(oldstatus);
                    self.prospect_status = oldstatus.id;

                    if (newstatus.id !== oldstatus.id) {
                        if ((oldstatus.attachevent == 1 && oldstatus.attachevent_unq == 1) || (newstatus.attachevent == 1 && newstatus.attachevent_unq == 1)) {
                            self.prospect_statuscheck(newstatus.attachevent_id, newstatus, oldstatus, statussource);
                        } else {
                            self.prospect_statuschange = newstatus.id;
                            self.prospect_statustrigger(statussource);
                        }
                    }
                }
                break;
            case 'substatus':
            case 'status':
                if (commandselected == 'status') {
                    var oldstatus = self.statusdata()[self.statusdata().searchobj('id', data.status)];
                    var newstatus = self.statusdata();
                } else {
                    var oldstatus = self.udstatusdata()[self.udstatusdata().searchobj('id', data.udstatus)];
                    var newstatus = self.udstatusdata();
                }

                cleanpopups();
                self.prospect_statuschangeindex = $('#' + commandid).attr("data-index");

                var popOverSettings = {
                    placement: 'left', container: '#prospectwindow', html: true, title: commandselected == 'status' ? 'Status Change' : 'Sub-Status Change',
                    content: function () {
                        var li = '';
                        for (var p = 0; p < newstatus.length; p++) {
                            var liid = "selected-" + newstatus[p].id + "_" + prospectid;
                            li = li + '<a href="#" ' +
                                    "data-fullname='" + self.prospect_selname() + "' " +
                                    "data-statussrc='" + (commandselected == 'status' ? 'changestatus' : 'changesubstatus') + "' " +
                                    "data-oldstatus='" + JSON.stringify(oldstatus) + "' " +
                                    "data-popid='" + commandid + "' " +
                                    "data-index='" + self.prospect_statuschangeindex + "' " +
                                    "data-status='" + JSON.stringify(newstatus[p]) + "' " +
                                    "class='list-group-item' id='" + liid + "' " +
                                    "onclick='self.prospect_statusclick(" + newstatus[p].id + ',' + '"' + liid + '"' + ")'>" +
                                    newstatus[p].name + "</a>";
                        }
                        return '<div class="list-group" style="height: 100%;overflow-y: auto;">' + li + '</div>';
                    }
                };
                $('#' + commandid).popover(popOverSettings);
                $('#' + commandid).on('shown.bs.popover', function (e) {
                    if (parseInt($('#prospectwindow .popover').css('top')) < 0 || $('#prospectwindow .popover').height() > (height_offset - 110)) {
                        $('#prospectwindow .popover').css('top', '10px');
                        if ($('#prospectwindow .popover').height() > (height_offset - 110)) {
                            $('#prospectwindow .popover').height(height_offset - 110);
                            var popoverH = height_offset - 110 - 20 - 35 - 18;
                            $('#prospectwindow .popover .popover-content').height(popoverH + "px")
                        }
                    }
                });
                $('#' + commandid).popover('show');
                if (commandselected != 'status')
                    $('#prospectwindow .popover .arrow').css('top', e.clientY - 12 + 'px');
                break;
        }
    };

    self.setzipcodes = function (data, e) {
        var municipality = $("#ccity").val();
        var zipcodes = municipios.searchobj('municipio', municipality, 'zipcodes');
        var state = municipios.searchobj('municipio', municipality, 'state');
        self.zipcodes(zipcodes);

        $("#cstate").val(state);
        self.prospect_detail()[0].more.state($("#cstate").val());

        if (zipcodes.length > 1) {
            $("#czipselect").removeClass('hidden');
            $("#czip").addClass('hidden');
        } else {
            $("#czipselect").addClass('hidden');
            $("#czip").removeClass('hidden');
            $("#czip").val(zipcodes[0]);
            self.prospect_detail()[0].more.zip(sqlDateFormat($('#czip').val()));
        }
    };
    self.zipcodes = ko.observableArray([]);

    // prospect detail command trigger action
    self.appbarTriggerCmd = ko.observableArray(prospect_DfltViewAppBar);
    self.prospectDetail_trigger = function (data, e) {
        var commandselected = e.currentTarget.id;
        switch (commandselected) {
            case 'okMoreDetail':
                if ($("#moredetailForm").valid() == true) {
                    self.closeViabutton = true;
                    self.prospect_detail()[0].more.commitAll();
                    $('#moredetailWindow').modal('hide');
                }
                break;
            case 'cmdmoredata':
                $('#moredetailWindow').modal('show');
                break;
            case 'cmdsave':
                $("#submitprospect").click();
                break;
            case 'cmdS':
            case 'cmdP':
            case 'cmdPS':
                if (commandselected == 'cmdP')
                    self.vehicle_source = 'P';
                else
                    self.vehicle_source = 'S';
                $('.phototag').removeClass('photoselected');
                $('#photo' + data.post_id()).addClass('photoselected');
                $('#vehicleListWindow').modal('show');
                break;
            case 'cmdT':
                self.vehicle_source = 'T';
                self.prospect_tradein([]);
                AJAX_requests('GET', 'tradein', 'get', {idprospect: data.idprospects, idvehicle: data.idvehicles, idtradein: data.idtradein}, function (tradein) {
                    self.prospect_tradein.push(tradein);
                    $('#tradeinWindow').modal('show');
                });

                break;
            case 'cmdcomment':
                self.comment_trigger(data, e);
                break;
            case 'cmdBackTrigger':
                $('#topfilter').removeClass('hidden');
                self.activeView('prospect');
                self.topmenubar(topmenu);
                self.prospect_listRefresh();
                self.page_specialbutton();
                self.prospect_change = false;
                break;
            case 'cmdlogout':
                //self.activeView('login');
                logoff_usr();
                break;
            case 'cmdcancel':
                self.prospect_detail()[0].resetAll();
                $("#prospectform").valid();
                self.appbarTriggerCmd(prospect_DfltViewAppBar);
                if (self.prospect_add() == true) {
                    $('#topfilter').removeClass('hidden');
                    self.activeView('prospect');
                    self.topmenubar(topmenu);
                    self.page_setpagination();
                }
                self.prospect_iseditable(false);
                self.prospect_add(false);
                self.prospect_edit(false);
                visibleEventPanel(true);
                break;
            case 'cmdedit':
                self.appbarTriggerCmd(prospect_editViewAppBar);

                self.prospect_edit(true);
                self.prospect_add(false);
                self.prospect_iseditable(true);
                visibleEventPanel(false);
                break;
            case 'cmddelete':
                if (self.prospect_actiondetail() && self.prospect_actiondetail().length > 0) {
                    var message = "No se puede borrar prospecto(" + self.prospect_selname() + ") que tienen eventos.";
                    messagealert(message, 'danger');
                }
                else {
                    var message = "Esta seguro que quiere borrar el prospecto(" + self.prospect_selname() + ")?";
                    messagealert(message, 'danger', function (opt) {
                        if (opt == 'YES') {
                            AJAX_requests('GET', 'trashbin', 'delete_prospect', {id: self.prospect_id}, function (data) {
                                if (data && data.msg) {
                                    messagealert(data.msg);
                                    if (data.errorcode == -1) {
                                        self.prospect_listRefresh(self.salesman_id());
                                        self.activeView('prospect');
                                        self.topmenubar(topmenu);
                                        self.page_specialbutton();
                                    }
                                }
                            });
                        }
                    });
                }
                break;
        }

        self.validDateFieldCSS($("#firstcontact").get(0));
        self.validDateFieldCSS($("#nextcontact").get(0));

    };
    self.prospectDetail_save = function () {

        self.appbarTriggerCmd(prospect_DfltViewAppBar);
        self.prospect_detail()[0].firstcontact(sqlDateFormat($('#firstcontact').val()));
        self.prospect_detail()[0].nextcontact(sqlDateFormat($('#nextcontact').val()));
        self.prospect_detail()[0]['tradein'] = ko.toJS(self.prospect_tradein());
        self.prospect_detail()[0]['timestamp'] = moment().format("YYYY-MM-DD HH:mm:ss");
        self.prospect_detail()[0].more.dob(sqlDateFormat($('#cdob').val()));

        self.prospect_detail()[0].more.commitAll();
        self.prospect_detail()[0].commitAll();

        var dataToSend = ko.toJSON(self.prospect_detail());
        var action = self.prospect_edit() ? 'update' : 'add';
        AJAX_requests('POST', 'prospect', action, dataToSend, function (returnedData) {
            if (returnedData.code == 100) {
                messagealert(returnedData.msg, 'info', 0, 3000);
                visibleEventPanel(true);
                if (self.prospect_add() === true) {
                    $('#topfilter').removeClass('hidden');
                    self.activeView('prospect');
                    self.topmenubar(topmenu);
                    self.prospect_listRefresh();

                }
                self.prospect_add(false);
                self.prospect_edit(false);
                self.prospect_change = true;

                self.validDateFieldCSS($("#firstcontact").get(0));
                self.validDateFieldCSS($("#nextcontact").get(0));

            } else
                messagealert("Error saving prospect", "danger");
        });
        self.prospect_iseditable(false);
    };

    // prospect list trigger action
    self.appbarTriggerCmd_plist = ko.observableArray(prospectlist_DfltViewAppBar);
    self.prospectList_trigger = function (p, data, e) {
        var commandid = e.currentTarget.id;
        var n = commandid.search("_");
        if (n > 0) {
            var prospectid = commandid.substr(n + 1);
            var commandselected = commandid.substr(0, n);
            var d = commandselected.search("-");
            if (d > 0) {
                commandname = commandselected.substr(0, d);
                commandselected = commandselected.substr(d + 1);
            }
        } else {
            var commandselected = commandid;
        }
        self.prospect_id = data.id ? data.id : data.idprospects;
        self.prospect_status = data.status ? data.status : 3;
        self.prospect_selname(data.fullname ? data.fullname : p);

        switch (commandselected) {
            case 'cmdViewDetail':
                self.topmenubar([]);
                self.prospect_detail([]);
                AJAX_requests('GET', 'prospect', 'detail', {id: prospectid}, function (cldata) {

                    for (var i = 0; i < cldata.detail.length; i++) {
                        var detailToAdd = new struct_prospect_detail(cldata.detail[i]);
                        self.prospect_detail.push(detailToAdd);
                    }
                    self.prospect_edit(false);
                    self.prospect_add(false);
                    self.prospect_iseditable(false);

                    self.refresh_events(cldata.actions);
                    self.refresh_comments(cldata.comments.data);

                    $('#topfilter').addClass('hidden');
                    self.activeView('prospect_detail');

                    visibleEventPanel(true);

                });
                break;
            case 'cmdnew':
                self.prospect_id = 0;
                self.prospect_status = 0;
                self.appbarTriggerCmd(prospect_editViewAppBar);
                self.prospect_detail([]);
                self.prospect_actiondetail([]);
                self.prospect_commentsdetail([]);

                self.event_empty(true);

                self.topmenubar([]);
                var detailToAdd = new struct_prospect_detail(undefined);
                self.prospect_detail.push(detailToAdd);
                self.prospect_detail()[0].firstcontact(moment().format('l'));
                self.appbarTriggerCmd(prospect_editViewAppBar);

                $('#topfilter').addClass('hidden');
                self.activeView('prospect_detail');

                self.prospect_edit(false);
                self.prospect_add(true);
                self.prospect_iseditable(true);
                visibleEventPanel(false);
                $('#firstcontact').val(moment().format('l'));

                break;
        }
    };

    // prospect list and detail filters
    self.filterby_togglelist = function () {
        $('#myCollapsible').collapse('toggle');

    };
    self.filterby_toggle = function (data, e) {
        var commandid = e.currentTarget.id; //byuptype-ToogleOff
        var commandselected = commandid;
        var n = commandid.search("-");
        if (n > 0) {
            commandname = commandselected.substr(0, n);
            commandselected = commandselected.substr(n + 1);
        }
        if (commandselected == 'ToogleOff') {
            $('#' + commandid).removeClass('show').addClass('hidden');
            $('#' + commandname).removeClass('hidden').addClass('show');
        } else {
            $('#' + commandid).removeClass('show').addClass('hidden');
            $('#' + commandid + '-ToogleOff').removeClass('hidden').addClass('show');
            self.filterby_trigger(data, e);
        }
    };
    self.filterby_uptype = ko.observable(0);
    self.filterby_adsource = ko.observable(0);
    self.filterby_status = ko.observable(0);
    self.filterby_udstatus = ko.observable(0);
    self.filterby_event = ko.observable(0);
    self.filterby_events = function (eventos, value /*, thisp */) {
        if (value == 'All')
            return true;
        if (eventos != null) {
            var index = false;
            for (var i = 0; i < eventos.length; i++) {
                var obj = eventos[i];
                if (obj['action_type'] == value) {
                    index = true;
                }
            }
        } else {
            return false;
        }
        return index
    };
    self.filterby_model = ko.observable(0);
    self.filterby_newleads = ko.observable(false);
    self.filterby_comments = ko.observable(false);
    self.filterby_fullname = ko.observable(0);
    self.filterby_resets = function () {
        self.filterby_newleads(false);
        self.filterby_comments(false);
        self.filterby_fullname(0);
        self.filterby_model(0);
        self.filterby_uptype(0);
        self.filterby_adsource(0);
        self.filterby_status(0);
        self.filterby_udstatus(0);
        self.filterby_event(0);
    };
    self.filterby_trigger = function (data, e) {
        var filterselected = (e.currentTarget.className).split(' ')[0];
        var filteridselected = e.currentTarget.id;
        self.page_set(1);

        switch (filterselected) {
            case 'newleads':
                self.filterby_newleads(!self.filterby_newleads());
                self.page_specialbutton();
                break;
            case 'toreview':
                self.filterby_comments(!self.filterby_comments());
                self.page_specialbutton();
                break;
            default:

                //$("." + filterselected).dropdown('toggle');
                cleanpopups();

                if (data.id) {
                    $("#" + filterselected).addClass('fs');
                    $("#" + filteridselected).removeClass('fs');
                    $("#" + filteridselected).addClass('fs');
                } else {
                    $("#" + filterselected).removeClass('fs');
                    $("." + filterselected).removeClass('fs');
                    $("#" + filteridselected).removeClass('fs');
                }

                switch (filterselected) {
                    case 'bymodel':
                        self.filterby_model(($('.bymodel').val()).toLowerCase());
                        if (($('.bymodel').val()).length > 0)
                            $("#" + filteridselected).addClass('fs');
                        else
                            $("#" + filteridselected).removeClass('fs');
                        break;
                    case 'byuptype':
                        self.filterby_uptype(data.id ? data.id : 0);
                        break;
                    case 'byadsource':
                        self.filterby_adsource(data.id ? data.id : 0);
                        break;
                    case 'bystatus':
                        self.filterby_status(data.id ? data.id : 0);
                        break;
                    case 'byudstatus':
                        self.filterby_udstatus(data.id ? data.id : 0);
                        break;
                    case 'byevent':
                        self.filterby_event(data.id ? data.id : 0);
                        break;

                    case 'byfullname':
                        self.filterby_fullname(($('.byfullname').val()).toLowerCase());
                        if (($('.byfullname').val()).length > 0)
                            $("#" + filteridselected).addClass('fs');
                        else
                            $("#" + filteridselected).removeClass('fs');
                        break;
                }
                break;
        }
        self.prospect_listRefresh(self.salesman_id());
    };
    self.filterby_salesmen = function (data, e) {
        self.page_set(1);
        var idx = self.salesman_list().searchobj('idusers', self.salesman_id());
        if (idx != -1) {
            sessionStorage.initials = self.salesman_list()[idx].initials;
            self.salesman_initials(self.salesman_list()[idx].initials);
        }
        self.prospect_listRefresh(self.salesman_id());
    };
    self.filterby_datefrom = ko.observable(moment().subtract('year', 1).format("YYYY-MM-DD"));
    self.filterby_dateto = ko.observable(moment().endOf('month').format("YYYY-MM-DD"));
    self.filterby_date = function () {
        self.page_set(1);
        self.prospect_listRefresh(self.salesman_id());

    };

    // user-salesperson variables and function
    self.salesman_opt = ko.observable(0);
    self.salesman_chgpasswd = ko.observable(false);
    self.salesman_list = ko.observableArray([]);
    self.salesman_iseditable = ko.observable(false);
    self.salesman_detail = ko.observable(new struct_salesman_detail(null));
    self.salesman_edit = ko.observable(false);
    self.salesman_add = ko.observable(false);
    self.salesman_id = ko.observable(0);
    self.salesman_initials = ko.observable('');
    self.salesman_triggercommands = ko.observableArray(salesman_DfltViewAppBar);
    self.salesman_trigger = function (data, e) {
        var commandid = e.currentTarget.id;
        var commandselected = undefined;
        var n = commandid.search("_");
        if (n > 0) {
            commandselected = commandid.substr(0, n);
        } else {
            commandselected = commandid;
        }
        $('#triggercmd').val(commandselected);
        switch (commandselected) {
            case 'cmddeactive':
            case 'cmdactive':
                var action = data.caption;
                var dataToSend = {id: self.user_editid, active: data.cmdactive, user: ko.toJS(self.salesman_detail())};
                AJAX_requests('POST', 'salesman', action, JSON.stringify(dataToSend), function (returnedData) {
                    if (returnedData.code && returnedData.code == 100) {
                        messagealert(returnedData.msg, 'success');
                        if (returnedData.active == 0 || returnedData.active == '0' || returnedData.active === 0) {
                            $('#cmdactive').removeAttr('disabled');
                            $('#cmddeactive').attr('disabled', 'disabled');
                            $('#cmdedit').attr('disabled', 'disabled');
                            $('#cmdresetpss').attr('disabled', 'disabled');
                            $('#sendsms').attr('disabled', 'disabled');
                        } else {
                            $('#cmdactive').attr('disabled', 'disabled');
                            $('#cmddeactive').removeAttr('disabled');
                            $('#cmdedit').removeAttr('disabled');
                            $('#cmdresetpss').removeAttr('disabled');
                            $('#sendsms').removeAttr('disabled');
                        }
                    } else
                        messagealert(returnedData.msg, 'danger');
                });
                break;
            case 'salesman':
                self.user_editid = data.idusers;

                for (var i = 0; i < self.salesman_list().length; i++) {
                    var sid = 'salesman_' + self.salesman_list()[i].idusers;
                    $('#' + sid).removeClass("active");
                }
                $('#' + commandid).addClass("active");
                AJAX_requests('GET', 'salesman', 'detail', {id: self.user_editid}, function (cldata) {
                    for (var i = 0; i < cldata.length; i++) {
                        self.salesman_detail(new struct_salesman_detail(cldata[i]));
                    }
                    if (cldata[0].active == 0 || cldata[0].active == '0' || cldata[0].active === 0) {
                        $('#cmdactive').removeAttr('disabled');
                        $('#cmddeactive').attr('disabled', 'disabled');
                        $('#cmdedit').attr('disabled', 'disabled');
                        $('#cmdresetpss').attr('disabled', 'disabled');
                        $('#sendsms').attr('disabled', 'disabled');
                    } else {
                        $('#cmdactive').attr('disabled', 'disabled');
                        $('#cmddeactive').removeAttr('disabled');
                        $('#cmdedit').removeAttr('disabled');
                        $('#cmdresetpss').removeAttr('disabled');
                        $('#sendsms').removeAttr('disabled');
                    }
                });
                break;
            case 'cmdcancel':
                self.salesman_triggercommands(salesman_DfltViewAppBar);
                self.topmenubar(topmenu);
                self.salesman_iseditable(false);
                self.salesman_add(false);
                self.salesman_edit(false);
                self.salesman_chgpasswd(false);
                break;
            case 'cmdnew':
                for (var i = 0; i < self.salesman_list().length; i++) {
                    var sid = 'salesman_' + self.salesman_list()[i].idusers;
                    $('#' + sid).removeClass("active");
                }
                self.topmenubar([]);
                self.salesman_triggercommands(salesman_editViewAppBar);
                self.salesman_chgpasswd(false);
                self.salesman_edit(false);
                self.salesman_add(true);
                self.salesman_iseditable(true);
                self.salesman_detail(new struct_salesman_detail(null));
                break;
            case 'cmdedit':
            case 'cmdresetpss':
            case 'cmdchangepss':
                self.salesman_chgpasswd(commandselected == 'cmdedit' ? false : true);
                self.topmenubar([]);
                self.salesman_triggercommands(salesman_editViewAppBar);
                self.salesman_edit(commandselected == 'cmdedit' ? true : false);
                self.salesman_add(false);
                self.salesman_iseditable(commandselected == 'cmdedit' ? true : false);
                break;
        }
    };
    self.salesman_role = ko.observable(1);
    self.salesman_name = ko.observable('');
    self.user_login = ko.observable(false);
    self.user_id = ko.observable(0);
    self.user_editid = 0;
    self.user_trigger = function (e) {
        if ($('#triggercmd').val() == 'cmdchangepss' || $('#triggercmd').val() == 'cmdresetpss') {
            var pwhash = CryptoJS.MD5($('#password').val());
            var pwnewhash = CryptoJS.MD5($('#newpassd').val());
            var renewhash = CryptoJS.MD5($('#newpassconfirm').val());
            $('#password').val('');
            $('#newpassd').val('');
            $('#newpassconfirm').val('');

            pwhash = pwhash.toString(CryptoJS.enc.Hex);
            pwnewhash = pwnewhash.toString(CryptoJS.enc.Hex);
            renewhash = renewhash.toString(CryptoJS.enc.Hex);
            if (pwnewhash === renewhash) {
                var dataToSend = {password: pwhash, newpassword: pwnewhash, user: ko.toJS(self.salesman_detail())};
                var action = $('#triggercmd').val() == 'cmdchangepss' ? 'changep' : 'resetp';

                AJAX_requests('POST', 'salesman', action, JSON.stringify(dataToSend), function (returnedData) {
                    if (returnedData.code && returnedData.code == 100) {
                        messagealert(returnedData.msg, 'success');
                    } else
                        messagealert(returnedData.msg, 'danger');

                    self.salesman_iseditable(false);
                    self.salesman_add(false);
                    self.salesman_edit(false);
                    self.salesman_triggercommands(salesman_DfltViewAppBar);
                    self.topmenubar(topmenu);
                    self.salesman_chgpasswd(false);

                });
            } else
                messagealert('<b>password and confirmation password must be equal.</b>', 'warning');
        } else {
            var pwhash = CryptoJS.MD5($('#password').val());
            var rehash = CryptoJS.MD5($('#reenter').val());
            $('#password').val('');
            $('#reenter').val('');

            pwhash = pwhash.toString(CryptoJS.enc.Hex);
            rehash = rehash.toString(CryptoJS.enc.Hex);

            if (pwhash === rehash) {
                self.salesman_detail().password = pwhash;
                var dataToSend = ko.toJSON(self.salesman_detail());
                var action = self.salesman_edit() ? 'update' : 'add';

                AJAX_requests('POST', 'salesman', action, dataToSend, function (returnedData) {
                    if (returnedData.code && returnedData.code === '100') {
                        for (var i = 0; i < returnedData.userlist.length; i++) {
                            var dt = returnedData.userlist[i];
                            var index = self.salesman_list().searchobj('idusers', dt.idusers);
                            if (index !== -1) {
                                self.salesman_list()[index].username = dt.username;
                                self.salesman_list()[index].role = dt.role;
                            } else
                                self.salesman_list.push(dt);
                        }
                        sessionStorage.userlist = JSON.stringify(self.salesman_list());
                        if (returnedData.user) {
                            sessionStorage.email = returnedData.user.email;
                            sessionStorage.username = returnedData.user.firstname + ' ' + returnedData.user.lastname;
                            sessionStorage.role = parseInt(returnedData.user.role);
                            sessionStorage.level = returnedData.user.level;
                            sessionStorage.userid = returnedData.user.id;
                            sessionStorage.dealername = returnedData.user.dlrname;
                            sessionStorage.image = sessionStorage.role === "1" ? './Content/icons/user.png' : './Content/icons/administrator.png';
                        }
                        logdataflag ? console.log(" sessionStorage user_trigger function", sessionStorage, "info") : '';
                        $("#userlogin").html(sessionStorage.username);
                        $("#dealer").html(sessionStorage.dealername);
                        messagealert('<b>' + returnedData.msg + '</b>', 'success');
                    }
                    else {
                        if (returnedData.msg)
                            messagealert('<b>' + returnedData.msg + '</b>', 'danger');
                        else
                            messagealert('<b>Unknown error occured.</b>', 'danger');
                    }
                    self.salesman_iseditable(false);
                    self.salesman_add(false);
                    self.salesman_edit(false);
                    self.salesman_triggercommands(salesman_DfltViewAppBar);
                    self.topmenubar(topmenu);
                    self.salesman_chgpasswd(false);
                });
            } else
                messagealert('<b>password and confirmation password must be equal.</b>', 'warning');
        }
    };

    // reports functions and variables
    self.reportselected = ko.observable('');
    self.reporttitle = ko.observable('');
    self.reportfilename = '';
    self.reportuserid = ko.observable(0);

    self.propt_options = ko.observableArray([]);
    self.report_options = ko.observable('');
    self.report_sel = ko.observable('');
    self.report_action = ko.observable('');
    self.report_link = ko.computed(function () {
        var platform = navigator.platform;
        return WSS_URL + '?page=reports&action=' + self.report_action() + '&sec=' + sessionStorage.sec + '&plt=' + platform + '&titleid=' + self.report_sel() + '&debug=' + logdataflag + self.report_options();
    });
    self.report_context = ko.computed(function () {
        //<iframe src="PDFFiles/cover.pdf"></iframe>
        var platform = navigator.platform;

        if (platform == 'iPad')
            return "<iframe id='objPDF' src='" + self.report_link() + "' width='100%' height='100%' seamless></iframe>";
        else
            return "<object id='objPDF' data='" + self.report_link() + "' type='application/pdf' width='100%' height='100%'></object>";
    });
    self.report_command = '';
    self.report_prompttrigger = function (data, e) {
        var pra = e.currentTarget.id;
        var parameters = $("#report_promptopt").serialize();
        $('#reportOptions').modal('hide');
        self.report_options("&params=1&" + parameters);
        self.report_action((pra).toLowerCase());

        self.activeView('report' + pra);
    };

    // modals trigger 
    // modals trigger events
    self.event_empty = ko.observable(true);
    self.event_salesmanid = 0;
    self.event_comments = ko.observableArray([]);
    self.event_addcomment = ko.observable(false);
    self.event_new = ko.observable(false);
    self.event_datatosave = '';
    self.event_trigger = function (data, e) {
        // trigger es accesado desde detail , list , calendar
        var currentTarget = e.currentTarget ? e.currentTarget : e;
        var commandid = currentTarget.id;
        var dataset = currentTarget.dataset ? currentTarget.dataset : e;
        var n = commandid.search("_");
        if (n > 0) {
            var commandselected = commandid.substr(0, n);
        } else {
            var commandselected = commandid;
        }
        self.prospect_id = data.id ? data.id : (dataset.id ? dataset.id : 0);
        self.prospect_selname(data.fullname ? data.fullname : (dataset.pname ? dataset.pname : self.prospect_selname()));
        self.prospect_status = data.status ? data.status : dataset.status;
        self.prospect_statuschangeindex = dataset.index ? dataset.index : 0;
        self.event_salesmanid = data.salesmanid ? data.salesmanid : (dataset.salesmanid ? dataset.salesmanid : 0);
        $("#addevent").attr("data-call", "event");
        switch (commandselected) {
            case 'cmdEvent':
                var oldstatus = self.statusdata()[self.statusdata().searchobj('id', self.prospect_status)];

                self.event_new(true);
                cleanEventWindow();
                $('#eventsWindow').modal('show');

                $("#addevent").attr("data-oldstatus", encodeURI(JSON.stringify(oldstatus)));
                $("#action_selowner").prop("checked", data.salesmanid == self.user_id() ? true : false);
                $("#ownername").text(data.salesperson ? data.salesperson : (dataset.salesman ? dataset.salesman : 0));
                $('#ownerid').val(self.event_salesmanid);
                break;
            case 'cmdEditEvent':
                if (data.action_type != 'No se encontro') {
                    self.event_new(false);
                    cleanEventWindow();
                    AJAX_requests('GET', 'events', 'GET', {idprospects: self.prospect_id, idactions: data.actionid}, function (data) {
                        setEventWindow(data[0]);
                        $('#eventsWindow').modal('show');
                    });
                }
                break;
        }
    };
    self.event_triggerSubmit = function (formElement) {
        if ($("#eventsform").valid()) {
            $("#addevent").attr("disabled", "disabled");

            var tosend = new Object();
            var action = $("#idactions").val() === '0' ? 'add' : 'update';
            var today = moment().format('l');
            var cancelSave = false;
            var action_date = moment($("#action_date").val(), 'MM/DD/YYYY').format('YYYY-MM-DD');
            var action_time = moment($("#action_time").val(), 'HH:mm A').format('HH:mm:ss');
            var action_datetime = moment(action_date + ' ' + action_time, "YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD HH:mm:ss");

            if (action_date == 'Invalid date' || action_time == 'Invalid date') {
                if (action_date == 'Invalid date')
                    $('#action_date').popover('show');
                if (action_time == 'Invalid date')
                    $('#action_time').popover('show');
                cancelSave = true;
            }

            if ($("#action_selowner").is(":checked")) {
                if ($("#ownerid").val() && $("#ownerid").val() != 0)
                    tosend['iduser'] = $("#ownerid").val();
                else
                    tosend['iduser'] = self.user_id();
            }
            else
                tosend['iduser'] = self.user_id();

            tosend['idprospects'] = self.prospect_id;
            tosend['idactions'] = $("#idactions").val();

            tosend['action_complete'] = $("#action_complete").is(":checked") ? 1 : 0;
            if ($("#action_complete:checked").val()) {
                if ($("#action_complete_date").val() > today && $("#action_complete_date").val() < $("#action_date").val()) {
                    cancelSave = true;
                    $('#action_complete_date').popover('show');
                }
                tosend['action_complete_time'] = moment(sqlDateFormat($("#action_complete_date").val()) + ' ' + $("#action_complete_time").val(), "YYYY-MM-DD hh:mm A").format("YYYY-MM-DD HH:mm:ss");
            }

            tosend['action_canceled'] = $("#action_canceled").is(":checked") ? 1 : 0;
            if ($("#action_canceled:checked").val() && $("#action_cancel_date").val() < $("#action_date").val()) {
                if ($("#action_cancel_date").val() > today) {
                    cancelSave = true;
                    $('#action_cancel_date').popover('show');
                }
                tosend['action_cancel_time'] = moment(sqlDateFormat($("#action_cancel_date").val()) + ' ' + $("#action_cancel_time").val(), "YYYY-MM-DD hh:mm A").format("YYYY-MM-DD HH:mm:ss");
                if (self.prospect_statuschange == 0)
                    self.prospect_statuschange = 3;
            }

            tosend['action_name'] = $("#action_name").val();
            tosend['action_type'] = $("#action_type").val();
            tosend['action_datetime'] = action_datetime;
            tosend['action_date'] = action_date;
            tosend['action_duration'] = $("#action_duration").val();
            tosend['action_duration_type'] = $("#action_duration_type").val();

            tosend['action_content'] = $("#action_content").val();
            if ($("#action_content").val() || (self.event_addcomment() === true && $("#action_comment").val())) {
                var comentario = '';
                if (self.event_addcomment() === true)
                    comentario = $("#action_comment").val();
                else
                    comentario = $("#action_content").val();

                tosend['comments'] = {idprospect: self.prospect_id, comment: comentario, userid: self.user_id(), sourceid: $("#action_type").val(), eventid: $("#idactions").val()}
            } else
                tosend['comments'] = null;

            tosend['remind'] = $("#remind:checked").val() ? 1 : 0;
            if ($("#remind:checked").val()) {
                var remind_date = moment($("#remind_date").val(), 'MM/DD/YYYY').format('YYYY-MM-DD');
                var remind_time = moment($("#remind_time").val(), 'HH:mm A').format('HH:mm:ss');
                var remind_datetime = moment(remind_date + ' ' + remind_time, "YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD HH:mm:ss");

                if (remind_date != 'Invalid date' && remind_time != 'Invalid date') {
                    tosend['remind_datetime'] = remind_datetime;
                    tosend['remind_content'] = $("#remind_content").val();
                    tosend['remind_type'] = $("#remind_type").val();
                    tosend['remind_inclphone'] = $("#remind_inclphone").is(":checked") ? 1 : 0;
                    tosend['remind_inclemail'] = $("#remind_inclemail").is(":checked") ? 1 : 0;
                } else {
                    if (remind_date == 'Invalid date')
                        $('#remind_date').popover('show');
                    if (remind_time == 'Invalid date')
                        $('#remind_time').popover('show');
                    cancelSave = true;
                }
            }

            if (cancelSave === false) {
                var statussource = $("addevent").attr("data-statussrc");
                var eventfromcall = $("addevent").attr("data-call");
                statussource = statussource ? null : 'changestatus';
                if (statussource == 'changesubstatus') {
                    var idxatach = self.udstatusdata().searchobj('attachevent_id', $("#action_type").val());
                    var atachdata = idxatach == -1 ? null : self.udstatusdata()[idxatach];
                } else {
                    var idxatach = self.statusdata().searchobj('attachevent_id', $("#action_type").val());
                    if (idxatach == -1) {
                        var idxatach = self.udstatusdata().searchobj('attachevent_id', $("#action_type").val());
                        statussource = idxatach == -1 ? null : 'changesubstatus';
                        var atachdata = idxatach == -1 ? null : self.udstatusdata()[idxatach];
                    } else
                        var atachdata = idxatach == -1 ? null : self.statusdata()[idxatach];
                }

                //console.log("atachdata", atachdata);
                if (atachdata && atachdata.attachenable == 1)
                    self.prospect_statuschange = atachdata.id;
                if (atachdata && atachdata.attachenable == 1 && atachdata.attachevent_unq == 1 && self.event_new() && eventfromcall == 'event') {
                    cancelSave = true;
                    self.event_datatosave = JSON.stringify(tosend);
                    var oldstatus_atached = $("#addevent").attr("data-oldstatus");
                    if (oldstatus_atached) {
                        oldstatus_atached = JSON.parse(decodeURI(oldstatus_atached));
                    }
                    //console.log("oldstatus_atached", oldstatus_atached);
                    self.prospect_statuscheck($("#action_type").val(), atachdata, oldstatus_atached, statussource);
                } else {
                    tosend = JSON.stringify(tosend);
                    self.event_triggerSave(action, tosend, statussource);
                }
            } else {
                $("#addevent").removeAttr("disabled");
            }
        }
    };
    self.event_triggerSave = function (action, tosend, statussource) {
        AJAX_requests('POST', 'events', action, tosend, function (data) {
            if (self.activeView() === 'dashboard') {
                if ($("#action_complete").is(":checked")) {
                    dataTable.removeRow(rowSelected);
                    table2_div.draw();
                }
            }
            self.prospect_change = true;
            cleanEventWindow();
            $("#addevent").removeAttr("disabled");
            if (self.activeView() === 'calendar') {
                $("#calendar").fullCalendar('refetchEvents');
            }
            $('#eventsWindow').modal('hide');
            self.prospect_eventrefresh(data);
            if (self.activeView() == 'prospect_detail') {
                $("#nextcontact").val(data.nextdate);
                self.prospect_detail()[0].nextcontact(data.nextdate);
            }
            if (self.prospect_statuschange === undefined || self.prospect_statuschange == 0) {
                self.prospect_statuschange = 0;
            } else {
                self.prospect_statustrigger(statussource);
            }
        });
    };
    self.prospect_eventrefresh = function (data) {
        if (self.activeView() === 'prospect') {
            //self.prospect_listRefresh();
            self.prospect_list.splice(self.prospect_statuschangeindex, 1, data.detail[0]);
        } else {
            var eventdata = data.data;
            self.event_empty(false);
            if (data.action == 'add') {
                if (self.prospect_actiondetail()[0].deleteme)
                    self.prospect_actiondetail.splice(0, 1, eventdata);
                else
                    self.prospect_actiondetail.unshift(eventdata);
            }
            else {
                var idxpage = self.prospect_actiondetail().searchobj('idactions', eventdata.idactions);
                if (idxpage != -1) {
                    self.prospect_actiondetail.splice(idxpage, 1);
                    self.prospect_actiondetail.splice(idxpage, 0, eventdata);
                }
            }
            if (data.comments) {
                if (self.prospect_commentsdetail()[0].deleteme)
                    self.prospect_commentsdetail.splice(0, 1, data.comments[0]);
                else
                    self.prospect_commentsdetail.unshift(data.comments[0]);
            }
            sizeRefresh('prospect_detail');
        }
    };
    self.refresh_events = function (data) {
        self.prospect_actiondetail([]);
        if (data && data !== null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                self.prospect_actiondetail.push(data[i]);
            }
        } else {
            self.prospect_actiondetail.push({
                deleteme: "yes", action_name: "No event was found.",
                action_type: null, action_datetime: null, actionid: 0,
                action_complete: 0, action_canceled: 0
            });
        }
        // self.prospect_actiondetail.sort(function (left, right) {
        //     return left.timestamp == right.timestamp ? 0 : (left.timestamp < right.timestamp ? -1 : 1);
        // });
    };

    // modals trigger comments
    self.comment_trigger = function (data, e) {
        var commandselected = e.currentTarget.id;
        var classArray = e.currentTarget.classList;

        if (classArray.length > 1 && classArray[1] === "comment-review") {
            commandselected = "comment-review";
        }
        switch (commandselected) {
            case 'comment-review':
                console.log(data);
                console.log(e);

                if (data.mycomment == 0 && data.revised == 0) {
                    messagealert(data.comment, "info");
                    AJAX_requests('POST', 'comments', 'reviewed', {commentid: data.idcomments, prospectid: data.idprospect, comment: data, index: e.currentTarget.dataset.index}, function (data) {
                        if (data && data.code == 100) {
                            self.prospect_newcomments(self.prospect_newcomments() - 1);
                            self.prospect_commentsdetail.splice(data.index, 1, data.comment);
                            if (data.opcount == 0 && prospectlistChunk.index) {
                                if (self.activeView() === 'prospect') {
                                    var userimage = "#imguser" + (prospectlistChunk.index);
                                    var talkimage = "#imgtalk" + (prospectlistChunk.index);

                                    $(talkimage).css("display", "none");
                                    $(userimage).css("display", "block");

                                    //prospectlistChunk.opccounts = "0";
                                    //self.prospect_list.splice(prospectlistChunk.index, 1, prospectlistChunk);
                                }
                            }
                        }
                    });
                } else {
                    if (data.eventid != 0) {

                    }
                }
                break;
            case 'event_newcomment':
                self.event_addcomment(true);
                $("#action_comment").val("");
                break;
            case 'event_cancelcomment':
                self.event_addcomment(false);
                $("#action_comment").val("");
                break;
            case 'event_addcomment':
                var commenttoadd = $("#action_comment").val();
                if (commenttoadd && commenttoadd.length > 10) {
                    commenttoadd = strip(commenttoadd);
                    commenttoadd = commenttoadd.replace("'", "");
                    commenttoadd = commenttoadd.replace('"', "");
                    commenttoadd = commenttoadd.replace(/(\r\n|\n|\r)/g, "<br />");
                    var commentdata = new Object({comment: commenttoadd, idprospect: self.prospect_id, userid: self.user_id(), eventid: $("#idactions").val(), sourceid: $("#action_type").val()});
                    AJAX_requests('POST', 'comments', 'addComment', JSON.stringify(commentdata), function (data) {
                        $("#action_comment").val("");
                        if (data.code == 100) {
                            self.event_addcomment(false);
                            self.event_comments.push({comment: data.RecvData[0].comment, timestamp: data.RecvData[0].timestamp});
                            self.event_comments.reverse();
                            if (self.prospect_commentsdetail()[0].deleteme)
                                self.prospect_commentsdetail.splice(0, 1, data.RecvData[0]);
                            else
                                self.prospect_commentsdetail.unshift(data.RecvData[0]);
                        }
                    });
                } else
                    messagealert('El comentario no puede estar vacio, y debe de ser de mas de 10 letras');
                break;
            case 'commentsWindow':
            case 'addcomment':
                var commenttoadd = $("#comments").val();
                if (commenttoadd && commenttoadd.length > 10) {
                    commenttoadd = strip(commenttoadd);
                    commenttoadd = commenttoadd.replace("'", "");
                    commenttoadd = commenttoadd.replace('"', "");
                    commenttoadd = commenttoadd.replace(/(\r\n|\n|\r)/g, "<br />");
                    var commentdata = new Object({comment: commenttoadd, idprospect: self.prospect_id, userid: self.user_id(), sourceid: 0});
                    AJAX_requests('POST', 'comments', 'addComment', JSON.stringify(commentdata), function (data) {
                        $("#comments").val('');
                        $('#commentsWindow').modal('hide');

                        if (data.code == 100) {
                            if (self.prospect_commentsdetail()[0].deleteme)
                                self.prospect_commentsdetail.splice(0, 1, data.RecvData[0]);
                            else
                                self.prospect_commentsdetail.unshift(data.RecvData[0]);
                        }

                    });
                } else
                    messagealert('El comentario no puede estar vacio, y debe de ser de mas de 10 letras');
                break;
            default:
                prospectlistChunk = data;
                if (e.currentTarget.dataset && e.currentTarget.dataset.index) {
                    prospectlistChunk['index'] = e.currentTarget.dataset.index;
                }
                self.prospect_id = data.id ? data.id : self.prospect_id;
                self.prospect_selname(data.fullname ? data.fullname : self.prospect_selname());
                AJAX_requests('GET', 'comments', 'get', {prospectid: self.prospect_id}, function (responsedata) {
                    if (responsedata.code == 500)
                        messagealert(responsedata.msg, 'danger');
                    else {
                        self.refresh_comments(responsedata.data);
                        $('#commentsWindow').modal('show');
                    }
                });
                break;
        }
    };
    self.refresh_comments = function (data) {
        self.prospect_commentsdetail([]);
        if (data && data !== null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                self.prospect_commentsdetail.push(data[i]);
            }
        } else {
            self.prospect_commentsdetail.push({
                deleteme: "yes", comment: "No comment was found.", username: null,
                timestamp: null, eventid: 0, idcomments: 0, mycomment: 1, revised: 0
            });
        }
        self.prospect_commentsdetail.sort(function (left, right) {
            return left.timestamp == right.timestamp ? 0 : (left.timestamp > right.timestamp ? -1 : 1);
        });
        sizeRefresh('prospect_detail');
    };

    self.vehicle_source = 'P';
    self.vehicle_trigger = function (data, e) {
        var makemodel = ((data.post_title).trim()).split(" ");
        if (self.vehicle_source === 'P') {
            self.prospect_detail()[0].vehicles.P.make(makemodel[0]);
            self.prospect_detail()[0].vehicles.P.model(makemodel[1]);
            self.prospect_detail()[0].vehicles.P.year(data.year);
            self.prospect_detail()[0].vehicles.P.color(data.color);
            self.prospect_detail()[0].vehicles.P.post_id(data.ID);
            self.prospect_detail()[0].vehicles.P.position = 'P';
            self.prospect_detail()[0].vehicles.P.idprospects = self.prospect_id;
            self.prospect_detail()[0].vehicles.P.vin(data.vin);
            self.prospect_detail()[0].vehicles.P.commitAll();
        } else {
            self.prospect_detail()[0].vehicles.S.make(makemodel[0]);
            self.prospect_detail()[0].vehicles.S.model(makemodel[1]);
            self.prospect_detail()[0].vehicles.S.year(data.year);
            self.prospect_detail()[0].vehicles.S.color(data.color);
            self.prospect_detail()[0].vehicles.S.post_id(data.ID);
            self.prospect_detail()[0].vehicles.S.position = 'S';
            self.prospect_detail()[0].vehicles.S.idprospects = self.prospect_id;
            self.prospect_detail()[0].vehicles.S.vin(data.vin);
            self.prospect_detail()[0].vehicles.S.commitAll();
        }

        $('#vehicleListWindow').modal('hide');
    };

    // modals trigger vehicle decode
    self.decode_reset = function (data) {
        $('#dmake').val(data && data.make ? data.make : '');
        $('#dmodel').val(data && data.model ? data.model : '');
        $('#dyear').val(data && data.year ? data.year : '');
        $('#ddoor').val(data && data.doors ? data.doors : '');
        $('#d_note').val(data && data.notes ? data.notes : '');
        $('#d_mileage').val(data && data.mileage ? data.mileage : '');
        $('#ddesc').val(data && data.stylename ? data.stylename : '');
        self.decoded_photoTradein([]);
        self.decoded_data(data && data.fullresponse ? data.fullresponse : '');

        if (data && data.photolinks) {
            var photos = JSON.parse(data.photolinks);
            for (var p = 0; p < photos.length; p++) {
                self.decoded_photoTradein.push(photos[p]);
            }
        }
        else
            self.decoded_photoTradein.push(nophotolink);

        self.decoded_colorlist(data && data.colorlist ? JSON.parse(data.colorlist) : []);
        self.decoded_colors(data && data.colorsname ? data.colorsname : []);
        //self.decoded_color(data && data.colorname ? data.colorname : '');
        //self.decoded_condition(data && data.condition ? data.condition : '');
        self.decoded_conditions(data && data.conditions ? JSON.parse(data.conditions) : '');
        self.decoded_styleID(data && data.styleid ? data.styleid : '');
        self.decoded_styles(data && data.stylelist ? JSON.parse(data.stylelist) : []);
        self.decoded_style('');
        self.decode_TMV({
            nationalBasePrice: ko.observable(data && data.baseprice ? data.baseprice : '-'),
            regionalAdjustment: ko.observable(data && data.regional_adj ? data.regional_adj : '-'),
            colorAdjustment: ko.observable(data && data.color_adj ? data.color_adj : '-'),
            conditionAdjustment: ko.observable(data && data.condition_adj ? data.condition_adj : '-'),
            mileageAdjustment: ko.observable(data && data.mileage_adj ? data.mileage_adj : '-'),
            appraisal: ko.observable(data && data.appraisal ? data.appraisal : '0.00')
        });
        $('#btnsubmitvin').removeAttr('disabled');
        $('#vintodecode').removeAttr('readonly');

    };
    self.decoded_styles = ko.observableArray([]);
    self.decoded_style = ko.observable();
    self.decoded_photoTradein = ko.observableArray([]);
    self.decoded_photoTradein.push(nophotolink);
    self.decode_trigger = function (formElement) {
        var vinToDecode = $('#vintodecode').val();
        var maketodecode = $('#maketodecode').val();
        var modeltodecode = $('#modeltodecode').val();
        var yeartodecode = $('#yeartodecode').val();
        self.decode_reset();
        //$('#btnsubmitvin').attr('disabled', 'disabled');
        //$('#vintodecode').attr('readonly', 'readonly');
        if (vinToDecode)
            vinDecode(vinToDecode);
        else
            makeModelYearDecode(maketodecode, modeltodecode, yeartodecode);
    };
    self.decode_TMV = ko.observable({
        nationalBasePrice: ko.observable('-'),
        regionalAdjustment: ko.observable('-'),
        colorAdjustment: ko.observable('-'),
        conditionAdjustment: ko.observable('-'),
        mileageAdjustment: ko.observable('-'),
        appraisal: ko.observable('0.00')
    });
    self.decoded_tmvtext = ko.observable('Edmunds.com TMV® (dealer trade-in)');
    self.decoded_data = ko.observable('');
    self.decoded_colorlist = ko.observableArray([]);
    self.decoded_colors = ko.observableArray([]);
    self.decoded_color = ko.observable('');
    self.decoded_condition = ko.observable('');
    self.decoded_conditions = ko.observable();
    self.decoded_styleID = ko.observable('');
    self.decoded_trigger = function (data, e) {
        var commandselected = e.currentTarget.id;

        switch (commandselected) {
            case 'dealerretail':
            case 'private':
            case 'tradein':
                var buttonLabel = $("#" + commandselected).text();
                $("#gettmvfrom").val(commandselected);
                self.decoded_tmvtext(buttonLabel);
                self.decode_TMV({
                    nationalBasePrice: ko.observable('-'),
                    regionalAdjustment: ko.observable('-'),
                    colorAdjustment: ko.observable('-'),
                    conditionAdjustment: ko.observable('-'),
                    mileageAdjustment: ko.observable('-'),
                    appraisal: ko.observable('0.00')
                });
                $("#submittmv").click();
                break;
            case 'ddesc':
                if (self.decoded_styleID())
                    getColors(self.decoded_styleID());
                break;
            case 'updtprospect':
                var dd = self.decoded_data();
                container = self.prospect_detail()[0].vehicles.T;

                container.position = 'T';
                container.type('U');
                container.vin($('#vintodecode').val());
                container.stocknumber(($('#vintodecode').val()).slice(11, 8));
                container.make($('#dmake').val());
                container.model($('#dmodel').val());
                container.year($('#dyear').val());
                container.appraisal(cleanCurrentcy(self.decode_TMV().appraisal()));
                container.condition(self.decoded_conditions()[0].condition);
                container.color(self.decoded_colors().length > 0 ? self.decoded_colors()[0].name : $("#d_color").val());
                container.commitAll();

                self.prospect_tradein()[0].vin = $('#vintodecode').val();
                self.prospect_tradein()[0].make = $('#dmake').val();
                self.prospect_tradein()[0].model = $('#dmodel').val();
                self.prospect_tradein()[0].year = $('#dyear').val();
                self.prospect_tradein()[0].doors = $("#ddoor").val();

                self.prospect_tradein()[0].styleid = self.decoded_styleID();
                self.prospect_tradein()[0].stylename = self.decoded_styles().length > 0 ? self.decoded_styles()[0].name : $("#ddesc").val();
                self.prospect_tradein()[0].stylesname = ko.toJSON(self.decoded_style());
                self.prospect_tradein()[0].stylelist = ko.toJSON(self.decoded_styles());

                self.prospect_tradein()[0].colorid = self.decoded_colors().length > 0 ? self.decoded_colors()[0].id : null;
                self.prospect_tradein()[0].colorname = self.decoded_colors().length > 0 ? self.decoded_colors()[0].name : $("#d_color").val();
                self.prospect_tradein()[0].colorsname = ko.toJSON(self.decoded_colors());
                self.prospect_tradein()[0].colorlist = ko.toJSON(self.decoded_colorlist());

                self.prospect_tradein()[0].mileage = $("#d_mileage").val();
                self.prospect_tradein()[0].zip = $("#d_zip").val();

                self.prospect_tradein()[0].baseprice = cleanCurrentcy(self.decode_TMV().nationalBasePrice());
                self.prospect_tradein()[0].regional_adj = cleanCurrentcy(self.decode_TMV().regionalAdjustment());
                self.prospect_tradein()[0].color_adj = cleanCurrentcy(self.decode_TMV().colorAdjustment());
                self.prospect_tradein()[0].condition_adj = cleanCurrentcy(self.decode_TMV().conditionAdjustment());
                self.prospect_tradein()[0].mileage_adj = cleanCurrentcy(self.decode_TMV().mileageAdjustment());
                self.prospect_tradein()[0].appraisal = cleanCurrentcy(self.decode_TMV().appraisal());

                self.prospect_tradein()[0].fullresponse = ko.toJSON(self.decoded_data());

                self.prospect_tradein()[0].notes = $("#d_note").val();
                self.prospect_tradein()[0].photolinks = ko.toJSON(self.decoded_photoTradein());

                //self.prospect_tradein()[0].condition = self.decoded_condition();
                self.prospect_tradein()[0].condition = self.decoded_conditions()[0].condition;
                self.prospect_tradein()[0].conditions = ko.toJSON(self.decoded_conditions());
                //console.log(ko.toJS(self.prospect_tradein()));
                $('#tradeinWindow').modal('hide');
                break;
            case 'searchbyvin':
            case 'searchbymmy':
                $('#vintodecode').val('');
                $('#maketodecode').val('');
                $('#modeltodecode').val('');
                $('#yeartodecode').val('');
                $(".btnsubmitvin").dropdown('toggle');
                $('.todecode').toggleClass('hidden');
                if (commandselected === 'searchbymmy') {
                    $('#maketodecode').attr('required', 'required');
                    $('#modeltodecode').attr('required', 'required');
                    $('#yeartodecode').attr('required', 'required');
                    $('#vintodecode').removeAttr('required');
                } else {
                    $('#maketodecode').removeAttr('required');
                    $('#modeltodecode').removeAttr('required');
                    $('#yeartodecode').removeAttr('required');
                    $('#vintodecode').attr('required', 'required');
                }
                break;
            case 'd_color':
                var selectedColor = self.decoded_colors()[0];
                if (selectedColor && selectedColor.colorChips) {
                    $(".d_color").css("background-color", "#" + selectedColor.colorChips.primary.hex);
                    $(".d_color").css("border-color", "#" + selectedColor.colorChips.primary.hex);
                }
                break;
            case 'd_condition':
                var selectedCondition = self.decoded_conditions()[0];
                $("#conditiondescr").parent().removeClass('alert-danger').addClass('alert-info');

                if (selectedCondition)
                    $("#conditiondescr").html(selectedCondition.description);
                else
                    $("#conditiondescr").html('');
                break;
        }
    };
    self.decode_triggerTMV = function () {
        var colorid = self.decoded_colors().length > 0 ? self.decoded_colors()[0].id : null;
        var condition = self.decoded_conditions()[0] ? self.decoded_conditions()[0].condition : null;
        var mileage = isNaN($("#d_mileage").val()) ? null : $("#d_mileage").val();
        var zip = isNaN($("#d_zip").val()) ? null : $("#d_zip").val();
        if (condition && mileage && zip)
            retrieveEDTMV(self.decoded_styleID(), condition, mileage, zip, colorid);
        else {
            $("#conditiondescr").parent().removeClass('alert-info').addClass('alert-danger');
            $("#conditiondescr").html('<p><b>ERROR, required parameters are incorrect</b></p><p>Verify that condition, mileage and zip are not empty and with valid values.</p>');
        }
    };

    // initialize data and prospect paging
    self.page_specialbutton = function () {
        if (self.filterby_newleads()) {
            $('#prospectlabel').text('Unasigned');
            $('#newleadslabel').text('PROSPECT LIST ');
        }
        else {
            $('#prospectlabel').text('Prospects');
            $('#newleadslabel').text('NEW LEAD ');
        }
        if (self.filterby_comments()) {
            $('#prospectlabel').text('TO REVIEW');
            $('#toreviewlabel').text('PROSPECT LIST ');
        }
        else {
            $('#prospectlabel').text('Prospects');
            $('#toreviewlabel').text('TO REVIEW ');
        }
    };
    self.page_groupof = width_offset >= 1200 ? 10 : (width_offset >= 992 ? 8 : (width_offset >= 768 ? 5 : 1));
    self.page_start = 1;
    self.page_end = width_offset >= 1200 ? 10 : (width_offset >= 992 ? 8 : (width_offset >= 768 ? 5 : 1));
    self.page_current = ko.observable(1);
    self.page_pages = ko.observable(10);
    self.page_setpagination = function () {

        for (var p = self.page_start; p <= self.page_end; p++) {
            var clone_p = $(".pages").clone(true);
            clone_p.children().html(p);
            clone_p.children().attr("id", "page" + p);
            clone_p.children().attr("data-page", p);
            clone_p.attr("class", "cloned pmark page" + p);

            $(".nextpage").before(clone_p);
        }
        if (self.page_current() > self.page_groupof && self.page_groupof > 1) {
            var clone_p = $(".pages").clone(true);
            clone_p.children().html("Prev(" + self.page_groupof + ")");
            clone_p.children().attr("id", "less");
            clone_p.children().attr("data-page", "l");
            clone_p.attr("class", "cloned pmark less");

            $(".nextpage").before(clone_p);
        }
        if (self.page_pages() > self.page_end && self.page_groupof > 1) {
            var clone_p = $(".pages").clone(true);
            clone_p.children().html("Next(" + self.page_groupof + ")");
            clone_p.children().attr("id", "more");
            clone_p.children().attr("data-page", "m");
            clone_p.attr("class", "cloned pmark more");

            $(".nextpage").before(clone_p);
        }
        //self.page_trigger('', { page: "page" + currentpage });
    };
    self.page_mark = function () {
        if (self.page_current() > 1)
            $(".prevpage").removeClass("disabled");
        if (self.page_current() == 1)
            $(".prevpage").addClass("disabled");
        if (self.page_current() == self.page_pages())
            $(".nextpage").addClass("disabled");
        if (self.page_current() < self.page_pages())
            $(".nextpage").removeClass("disabled");

        $(".pmark").removeClass("active");
        $(".page" + self.page_current()).addClass("active");

    };
    self.page_trigger = function (data, e) {
        var cmdpage = e.currentTarget.id;
        var pageid = self.page_current();
        var page = e.currentTarget.dataset.page;
        if (self.page_pages() == 1) {
            self.page_current(1);
        }
        else {
            switch (page) {
                case 'p':
                    pageid = self.page_current() == 1 ? 1 : parseInt(self.page_current()) - 1;
                    if (pageid < self.page_start) {
                        self.page_start = (self.page_start - self.page_groupof) < 0 ? 1 : self.page_start - self.page_groupof;
                        self.page_end = self.page_start + self.page_groupof - 1;
                        self.page_end = self.page_end > self.page_pages() ? self.page_pages() : self.page_end;
                    }
                    break;
                case 'n':
                    pageid = self.page_current() == self.page_pages() ? self.page_current() : (parseInt(self.page_current()) + 1);
                    if (pageid > self.page_end) {
                        self.page_start = self.page_start + self.page_groupof;
                        self.page_end = (self.page_end + self.page_groupof) > self.page_pages() ? self.page_pages() : self.page_end + self.page_groupof;
                    }
                    break
                case 'm':
                    pageid = self.page_end == self.page_pages() ? self.page_end : (self.page_end + 1);
                    self.page_start = self.page_start + self.page_groupof;
                    self.page_end = (self.page_end + self.page_groupof) > self.page_pages() ? self.page_pages() : self.page_end + self.page_groupof;
                    break;
                case 'l':
                    self.page_start = (self.page_start - self.page_groupof) < 0 ? 1 : self.page_start - self.page_groupof;
                    self.page_end = self.page_start + self.page_groupof - 1;
                    self.page_end = self.page_end > self.page_pages() ? self.page_pages() : self.page_end;
                    pageid = self.page_start;
                    break;
                default:
                    pageid = page;
                    break;
            }
            self.page_current(pageid);
        }
        self.prospect_listRefresh();
    };
    self.page_set = function (pageno) {
        self.page_current(pageno);
        self.page_start = 1;

        $(".cloned").remove();
    };
    self.prospect_listRefresh = function (salesmanid) {
        self.prospect_list([]);

        $(".cloned").remove();

        var filters = {
            'salesman': self.salesman_id(), 'datefrom': self.filterby_datefrom(), 'dateto': self.filterby_dateto(),
            'newleads': self.filterby_newleads() == true ? 1 : 0,
            'vehicle': self.filterby_model(), 'fullname': self.filterby_fullname(),
            'uptype': self.filterby_uptype(), 'adsource': self.filterby_adsource(),
            'status': self.filterby_status(), 'udstatus': self.filterby_udstatus(),
            'idactions': self.filterby_event(),
            'selectedpage': self.page_current(),
            'toreview': self.filterby_comments() == true ? 1 : 0
        };
        AJAX_requests('GET', 'prospect', 'list', filters, function (cldata) {
            var newcount = 0;
            logdataflag ? timestart = moment() : false;
            if (cldata) {
                var plen = cldata.length;
                self.prospect_newcount(cldata[plen - 1].newleads);
                self.prospect_newcomments(cldata[plen - 1].commentscount);
                self.prospect_list(cldata);

                self.page_pages(cldata[plen - 1].pages);
                if (self.page_pages() > 1) {
                    if (self.page_start == 1)
                        self.page_end = self.page_pages() > self.page_groupof ? self.page_groupof : self.page_pages();

                    self.page_setpagination();
                    self.page_mark();
                }
            }
            logdataflag ? console.log("stop rendering prospect", timestart.diff(moment()), "ms") : false;

        });
    };

    // helper functions

    self.prospect_seek = function (id) {
        for (var i = 0; i < self.prospect_list().length; i++) {
            if (self.prospect_list()[i].id == id)
                return self.prospect_list()[i];
        }
        return null;
    };
    self.page_postProcessingLogic = function () {
        if (self.activeView() !== 'error') {
            $("#userlogin").html(sessionStorage.username);
            $("#dealer").html(sessionStorage.dealername);

            if (self.activeView() === 'calendar' || self.activeView() === 'prospect' || self.activeView() === 'reports') {
                $('.dateobj').datetimepicker({
                    pickTime: false,
                    defaultDate: "",
                    useCurrent: false
                });
                $(".dateobj").on("dp.change", function (e) {
                    self.validDateFieldCSS(e.currentTarget);
                });

                $('.timeobj').datetimepicker({pickDate: false});
                $(".timeobj").on("dp.change", function (e) {
                    self.validTimeFieldCSS(e.currentTarget);
                });
                if (self.activeView() === 'prospect') {
                    self.filterby_datefrom(moment().subtract('years', 1).format("YYYY-MM-DD"));
                    self.filterby_dateto(moment().endOf('month').format("YYYY-MM-DD"));
                    $("#set1stConctactDatefrom").on("dp.change", function (e) {
                        $('#set1stConctactDateto').data("DateTimePicker").setMinDate(e.date);
                        self.filterby_datefrom(e.date.format("YYYY-MM-DD"));
                        self.filterby_date();
                    });
                    $("#set1stConctactDateto").on("dp.change", function (e) {
                        $('#set1stConctactDatefrom').data("DateTimePicker").setMaxDate(e.date);
                        self.filterby_dateto(e.date.format("YYYY-MM-DD"));
                        self.filterby_date();
                    });
                }


            }
            if (self.activeView() === 'calendar') {
                self.prospect_statuschange = 0;
                $('#calendar').fullCalendar({
                    header: {left: 'prev, next, today', center: 'title', right: 'month,agendaWeek,agendaDay'},
                    events: {
                        url: WSS_URL + '?page=calendar' + '&sec=' + sessionStorage.sec + '&salesman=' + self.salesman_id(),
                        type: 'GET',
                        allDayDefault: false,
                        ignoreTimezone: true,
                        error: function (x, s, t) {
                            logdataflag ? console.log("Error", {x: x, s: s, t: t}, "error") : '';
                            if (t === 'Timeout') {
                                logoff_usr();
                                $("#password").attr('readonly', 'readonly');
                                $("#cmdlogin").attr('disabled', 'disabled');
                                messagealert("Session timeout", "warning");
                            }
                        }
                    },
                    dayClick: function (date, allDay, jsEvent, view) {
                        var formattime = moment();
                        var formatdate = moment(date);
                        if (formatdate.hour() !== 0)
                            formattime = formatdate;

                        self.event_new(true);

                        cleanEventWindow();
                        self.prospect_selname('CALENDAR');
                        self.prospect_id = 0;
                        $('#eventsWindow').modal('show');
                        $('#action_date').val(formatdate.format('l'));
                        $('#action_time').val(formattime.format('hh:mm A'));
                        $("#action_duration_type").val('NONE');
                        $("#action_type").val('28');
                        setDurationStep();
                    },
                    eventClick: function (event, jsEvent, view) {
                        self.prospect_statuschange = 0;
                        self.event_new(false);
                        cleanEventWindow();
                        setEventWindow(event);
                        self.prospect_selname(event.fullname ? event.fullname : "CALENDAR");
                        $('#eventsWindow').modal('show');
                    },
                    eventMouseover: function (event, jsEvent, view) {
                        $("#popcalendar").css('top', jsEvent.clientY / 2);
                        $("#popcalendar").css('left', jsEvent.clientX);
                        $("#popcalendar").css('display', 'block');
                        var dc = '';
                        var ac = "<p>Prospect: " + event.fullname + "</p>" +
                                "<p>Title: " + event.action_name + "</p>" +
                                "<p>Type: " + event.name + "</p>" +
                                "<p>DateTime: " + event.action_datetime + "</p>";
                        for (var i = 0; i < event.comments.length; i++)
                            dc = dc + "<li>" + event.comments[i].comment + "(" + event.comments[i].timestamp + ")</li>";
                        if (dc) {
                            dc = "<ul>" + dc + "</ul>";
                            ac = ac + "<p>Comments:</p>" + dc;
                        }
                        $("#popcalendarcontent").html(ac);
                    },
                    eventMouseout: function (event, jsEvent, view) {
                        $("#popcalendar").css('display', 'none');
                    }
                });
            }
            if (self.activeView() === 'prospect') {
                //$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover', 'placement': 'right' });
                //$('#set1stConctactDatefrom').val(moment().subtract('year', 1).format("l"));
                //$('#set1stConctactDateto').val(moment().endOf('month').format("l"));

                $('[data-toggle="event_popover"]').popover({
                    content: 'Invalid Date', placement: 'top',
                    container: '#eventsWindow', trigger: 'manual'
                });
                $('[data-toggle="event_popover"]').on('shown.bs.popover', function () {
                    setTimeout(function () {
                        $('[data-toggle="event_popover"]').popover('hide');
                    }, 3000);
                });

            }
            if (self.activeView() === 'prospect_detail') {
                $('#firstcontact').datetimepicker({
                    pickTime: false,
                    defaultDate: "",
                    useCurrent: false,
                    useStrict: false
                });
                $("#firstcontact").on("dp.change", function (e) {
                    self.validDateFieldCSS(e.currentTarget);
                });
                /*$('#nextcontact').datetimepicker({
                 pickTime: false, useStrict: false,
                 defaultDate: "",
                 useCurrent: false,
                 useStrict: false
                 });
                 $("#nextcontact").on("dp.change", function (e) {
                 self.validDateFieldCSS(e.currentTarget);
                 });*/
                $('#cdob').datetimepicker({pickTime: false, useStrict: false});
                $("#prospectform").validate({debug: false, errorClass: "validationErrors", errorElement: "span"});
                $("#moredetailForm").validate({debug: false, errorClass: "validationErrors", errorElement: "span"});

                //self.validDateFieldCSS($("#firstcontact").get(0));
                //self.validDateFieldCSS($("#nextcontact").get(0));

                visibleEventPanel(!self.prospect_add());
            }

            if (self.activeView() === 'reportView') {
                logdataflag ? console.log('reportView', self.report_context(), "warn") : '';
                $("#divPDF").html(self.report_context());
            }
            if (self.activeView() === 'reportExport') {
                AJAX_requests('GET', self.report_link(), 'reportExport', [], function (responseData) {
                    JSONToCSVConvertor(responseData, self.reporttitle());
                });
            }
            if (self.activeView() === 'login') {
                $(".loading_overlay").css('display', 'none');
                $("#loadingwrapper").css('display', 'none');
            }
            if (self.activeView() === 'user') {
                $('#sendsms').attr('disabled', 'disabled');
            }
        }
        sizeRefresh(self.activeView());

    };

    //dropdowns ini
    self.dealerships = ko.observableArray([]);
    self.eventtype = ko.observableArray([]);
    self.adsourcedata = ko.observableArray([]);
    self.statusdata = ko.observableArray([]);
    self.statusdataAtach = ko.observableArray([]);
    self.udstatusdata = ko.observableArray([]);
    self.udstatusdataAtach = ko.observableArray([]);
    self.uptypedata = ko.observableArray([]);
    self.webVehicleList = ko.observableArray([null]);
    self.getDropdowns = function () {
        AJAX_requests('GET', 'dropdowns', 'GET', null, function (responsedata) {
            self.dealerships(responsedata.dealerships);
            self.eventtype(responsedata.events);
            self.adsourcedata(responsedata.adsource);

            self.statusdata(responsedata.status);
            for (var i = 0; i < responsedata.status.length; i++) {
                if (responsedata.status[i].attachevent_unq == 0)
                    self.statusdataAtach.push(responsedata.status[i]);
            }

            self.udstatusdata(responsedata.udfstatus);
            for (var i = 0; i < responsedata.udfstatus.length; i++) {
                if (responsedata.udfstatus[i].attachevent_unq == 0)
                    self.udstatusdataAtach.push(responsedata.udfstatus[i]);
            }

            self.uptypedata(responsedata.uptype);

            self.webVehicleList(responsedata.vehiclelist);

            topmenu[3].dropdown = responsedata.reports;
            self.topmenubar(topmenu);

            $(function () {
                $(".portalphotos").one("load", function () {
                    $(this).show();
                }).each(function () {
                    if (this.complete)
                        $(this).load();
                }).error(function () {
                    $(this).unbind("error").attr("src", "./Content/images/no_image_large.png");
                }).hide();
            });
        });
    };
    self.dropdown_appbar = ko.observableArray(basic_DfltViewAppBar);
    self.dropdown_list = ko.observableArray([]);
    self.dropdown_detail = ko.observable(null);
    self.dropdown_class = ko.observable('');
    self.dropdowns_trigger = function (data, e) {
        var commandselected = e.currentTarget.id;
        self.salesman_edit(false);
        self.salesman_add(false);

        if (commandselected.search("dd_") != -1) {
            self.dropdown_detail(null);
            var n = commandselected.search("-");
            if (n > 0) {
                var dropdowngroup = commandselected.substr(n + 1);
                self.dropdown_class('cl-' + dropdowngroup);
                AJAX_requests('GET', 'dropdowns', 'list', {groupid: dropdowngroup}, function (returnedData) {
                    if (returnedData.code && returnedData.code == 500)
                        messagealert(returnedData.msg);
                    else {
                        self.dropdown_detail(null);
                        $('.dropdowndsel').text('');
                        $("#cmdedit").attr("disabled", "disabled");
                        $('#cmddelete').attr("disabled", "disabled");
                        self.dropdown_detail(null);
                        $('.dropdownsel').text(e.currentTarget.text);

                        self.dropdown_list(returnedData);

                        self.dropdown_appbar(basic_DfltViewAppBar);
                        self.topmenubar(topmenu);
                    }
                });
            }
        } else {
            switch (commandselected) {
                case 'cmdcancel':
                    self.dropdown_appbar(basic_DfltViewAppBar);
                    self.topmenubar(topmenu);
                    self.salesman_add(false);
                    self.salesman_edit(false);
                    self.dropdown_detail(null);
                    break;
                case 'cmdedit':
                    self.topmenubar([]);
                    self.dropdown_appbar(salesman_editViewAppBar);
                    self.salesman_edit(true);
                    self.salesman_add(false);
                    break;
                case 'cmdnew':
                    var ddclass = self.dropdown_class();
                    var n = ddclass.search("-");
                    if (n > 0) {
                        $('.dropdowndsel').text($('.dropdownsel').text() + ' - Detail');
                        var dropdowngroup = ddclass.substr(n + 1);
                        self.topmenubar([]);
                        self.dropdown_appbar(salesman_editViewAppBar);
                        self.salesman_edit(true);
                        self.salesman_add(true);

                        self.dropdown_detail(new struct_dropdown(null, self.dropdown_class()));
                        if (self.dropdown_class() !== 'cl-dealership') {
                            self.dropdown_detail().idgroup(dropdowngroup);
                            self.dropdown_detail().attachenable(dropdowngroup == 2 || dropdowngroup == 6 ? 1 : 0);
                        }
                    }
                    break;
                case 'cmddelete':
                    var ddclass = self.dropdown_class();
                    var n = ddclass.search("-");
                    if (n > 0) {
                        var dropdowngroup = ddclass.substr(n + 1);
                        var datarequest = {id: self.dropdown_detail().id, groupid: dropdowngroup};
                        AJAX_requests('GET', 'dropdowns', 'delete', datarequest, function (responsedata) {
                            if (responsedata.code && responsedata.code == 500)
                                messagealert(responsedata.msg, 'danger');
                            else {
                                messagealert(responsedata.msg, 'success');
                                self.dropdown_list(responsedata.newlist);
                                self.dropdown_detail(null);
                            }
                        });
                    }
                    break;
                default:

                    var ddclass = self.dropdown_class();
                    var n = ddclass.search("-");
                    if (n > 0) {
                        var dropdowngroup = ddclass.substr(n + 1);
                        var datarequest = {id: data.id, groupid: dropdowngroup};
                        AJAX_requests('GET', 'dropdowns', 'detail', datarequest, function (responsedata) {
                            if (responsedata.code && responsedata.code == 500)
                                messagealert('Error Retrieving detail', 'alert');
                            else {
                                self.dropdown_detail(new struct_dropdown(responsedata[0], self.dropdown_class()));
                                $('#cmdedit').removeAttr('disabled');
                                if (responsedata[0].editable == 0)
                                    $('#cmddelete').removeAttr('disabled');
                                else
                                    $('#cmddelete').attr('disabled', 'disabled');

                                $('.dropdowndsel').text($('.dropdownsel').text() + ' - Detail');
                            }
                        });
                    }
                    break;
            }
        }
    };
    self.dropdown_save = function () {
        var dataToSend = ko.toJSON(self.dropdown_detail());
        var action = self.salesman_add() ? 'add' : 'update';
        AJAX_requests('POST', 'dropdowns', action, dataToSend, function (returnedData) {
            messagealert(returnedData.msg);
            if (returnedData.code == 500)
                self.dropdown_detail(null);
            else {
                if (action == 'add')
                    self.dropdown_list(returnedData.newlist);
            }

            self.dropdown_appbar(basic_DfltViewAppBar);
            self.topmenubar(topmenu);
            self.salesman_add(false);
            self.salesman_edit(false);
        });
    };

    // sms
    self.sendmessage = function (data, e) {
        var tosend = new Object();
        tosend['salesperson'] = $('#firstname').val() + " " + $('#lastname').val();
        tosend['smsphone'] = testphonenumber;
        tosend['smsmessage'] = $("#smsbody").val();

        $("#sendnotifications").modal('hide');
        AJAX_requests('POST', 'sendnotifications', 'SEND', JSON.stringify(tosend), function (returnedData) {
            messagealert(returnedData.msg);
        });
    };
    self.validDateFieldCSS = function (e) {
        var datevalue = $(e).val();
        setvalidationclass(e, /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(datevalue) ||
                /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/.test(datevalue));
    };
    self.validTimeFieldCSS = function (e) {
        var datevalue = $(e).val();
        setvalidationclass(e, /^((0?[1-9]|1[012])(:[0-5]\d){0,2}(\ [AP]M))$|^([01]\d|2[0-3])(:[0-5]\d){0,2}$/.test(datevalue));
    };

    $('#moredetailWindow').on('hide.bs.modal', function (e) {
        if (self.prospect_iseditable() == true && self.closeViabutton == false) {
            self.prospect_detail()[0].more.resetAll();
            $("#moredetailForm").valid();
        }
    });
    $('#moredetailWindow').on('show.bs.modal', function (e) {
        self.closeViabutton = false;
    });
    $('#tradeinWindow').on('shown.bs.modal', function (e) {
        self.decode_reset();
        $('#vintodecode').val('');
        $('#maketodecode').val('');
        $('#modeltodecode').val('');
        $('#yeartodecode').val('');

        $("#d_zip").val(sessionStorage.zip);
        $("#appraisal-date").text(moment().format('lll'));
        if (self.vehicle_source == 'T') {
            $("#updtprospect").removeAttr("disabled");
            self.decode_reset(self.prospect_tradein()[0]);
        } else
            $("#updtprospect").attr("disabled", "disabled");


    });
    $('#commentsWindow').on('hidden.bs.modal', function (e) {
        logdataflag ? console.log("<p>Se selecciono <b>CLOSE<b/> sin haber salvado el comentario <b><i>( " + $('#comments').val() + " )<b><i><br/>Desea salvar el comentario?</p>") : '';

        if (($('#comments').val()).length > 3) {
            messagealert("<p>Se selecciono <b>CLOSE</b> sin haber salvado el comentario <b><i>( " + $('#comments').val() + " )</b></i><br/>Desea salvar el comentario?</p>", "warning", function (ans) {
                if (ans == 'YES')
                    self.comment_trigger('nada', e);
            });
        }
    });
    $('#commentsWindow').on('show.bs.modal', function (e) {
        $('#comments').val('');
    });
    $('#reportOptions').on('show.bs.modal', function (e) {
        $('.dateobj').datetimepicker({pickTime: false});
        $('.timeobj').datetimepicker({pickDate: false});
        $('.rDatefrom').val(moment().startOf('month').format("l"));
        $('.rDateto').val(moment().endOf('month').format("l"));
    });
    $('#eventsWindow').on('hidden.bs.modal', function () {
        $("#action_type").removeAttr("readonly");
    });

    $('#eventsWindow').on('shown.bs.modal', function () {
        //self.validDateFieldCSS($("#remind_date").get(0));
        //self.validTimeFieldCSS($("#remind_time").get(0));
        //self.validDateFieldCSS($("#action_date").get(0));
        //self.validTimeFieldCSS($("#action_time").get(0));
        $("#eventsform").validate({debug: false, errorClass: "validationErrors", errorElement: "span"});
    });
    $('#sendnotifications').on('shown.bs.modal', function (e) {
        testphonenumber = "+1" + ($('#smsnumber').val()).replace(/-/g, '')
        $('#smsphonenumber').html('<b>' + $('#firstname').val() + " " + $('#lastname').val() + ' - ' + testphonenumber + '</b>');
    });

    //refresh fix
    if (webStorageEnabled() && cookiesEnabled() && are_cookies_enabled()) {

        if (typeof Storage !== 'undefined' && sessionStorage.fullname) {
            var timestamp = moment().format('X');
            // if (sessionStorage.expirationdate !== 'undefined' && sessionStorage.expirationdate >= timestamp && sessionStorage.fullname) {
            startWorker();
            sessionStorage.expirationdate = moment().add(timeout, 'm').format('X');
            self.activeView('dashboard');

            $("#userlogin").html(sessionStorage.username);
            $("#dealer").html(sessionStorage.dealername);

            sessionStorage.image = sessionStorage.role === "1" ? './Content/icons/user.png' : './Content/icons/administrator.png';

            self.salesman_list(JSON.parse(sessionStorage.userlist));
            self.reportuserid(sessionStorage.userid);
            self.user_id(sessionStorage.userid);
            self.salesman_initials(sessionStorage.initials);
            self.salesman_role(sessionStorage.role);

            self.user_login(true);

            if (self.salesman_role() > 1) {
                self.salesman_name("All Salesperson");
                self.salesman_id('ALL');
            } else {
                self.salesman_name(sessionStorage.username);
                self.salesman_id(sessionStorage.userid);
            }

            google.load("visualization", "1.1", {packages: ["controls"], "callback": drawChart});
            // google.setOnLoadCallback(drawChart);

            self.filterby_uptype(0);
            self.filterby_adsource(0);
            self.filterby_status(0);
            self.filterby_udstatus(0);
            self.filterby_event(0);
            self.filterby_model(0);
            self.filterby_newleads(false);
            self.filterby_fullname(0);
            self.page_specialbutton();

            $(".topfilterOptions").css("display", "block");

            self.getDropdowns();
            $(".loading_overlay").css('display', 'none');
            $("#loadingwrapper").css('display', 'none');
            // } else {
            //   logoff_usr();
            // }
        } else {
            self.activeView('login');
            if (self.user_login() === true) {
                logoff_usr();
            }
        }
    }
    else {
        self.activeView('error');
    }
}
;

var oLightCRM = new lightCRM();
ko.applyBindings(oLightCRM);

//helper functions
function startWorker() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (countdown_worker == "undefined")) {
            countdown_worker = new Worker("./Scripts/countdown_worker.js");
        }
        countdown_worker.onmessage = function (event) {

            console.log(event.data);
            //document.getElementById("countdown_result").innerHTML = event.data + " Minutes";
            if (event.data == 0) {
                $('#messagebox').css('display', 'none');
                $('.msg_overlay').css('display', 'none');

                $("#password").attr('readonly', 'readonly');
                $("#cmdlogin").attr('disabled', 'disabled');
                messagealert("<p>The server session timed out</p>", "danger", 0, 6000);
                logoff_usr();
            }
            if (event.data == 5) {
                messagealert("<p>WARNING</p><p>Your session is about to end.Your session will end in <span class='badge' style='font-size: 16px;background: red;'><span id='time_countdown'>5 Minutes</span></span></p>"
                        + "Would you like more time?", "warning", function (optselected) {
                            if (optselected == 'YES') {
                                location.reload(true);
                            } else {
                                $("#password").attr('readonly', 'readonly');
                                $("#cmdlogin").attr('disabled', 'disabled');
                                messagealert("<p>The server session timed out</p>", "danger", 0, 6000);
                                logoff_usr();
                            }
                        }, 6000);
            }
            if (event.data < 5) {
                $("#time_countdown").html(event.data + " Minutes");
            }
            if (event.data < 10) {
                $("#last_refresh").html("Your session will expire in " + event.data + " Minutes");
            }

            if (event.data > 10) {
                $("#last_refresh").html("Last inquiry was " + last_refresh);
            }
        };
    } else {
        document.getElementById("countdown_result").innerHTML = "-1";
    }
}
function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}
function cleanpopups() {
    if ($(".adminpanel").parent().hasClass('open'))
        $(".adminpanel").dropdown('toggle');
    if ($(".reports").parent().hasClass('open'))
        $(".reports").dropdown('toggle');
    if ($("#userlink").parent().hasClass('open'))
        $("#userlink").dropdown('toggle');
    if ($("#initials").parent().hasClass('open'))
        $("#initials").dropdown('toggle');

    if ($("#byevent").parent().hasClass('open'))
        $("#byevent").dropdown('toggle');
    if ($("#byuptype").parent().hasClass('open'))
        $("#byuptype").dropdown('toggle');
    if ($("#byadsource").parent().hasClass('open'))
        $("#byadsource").dropdown('toggle');
    if ($("#bystatus").parent().hasClass('open'))
        $("#bystatus").dropdown('toggle');
    if ($("#byudstatus").parent().hasClass('open'))
        $("#byudstatus").dropdown('toggle');
    if ($("#lts-topmenu").hasClass('in'))
        $("#lts-topmenu").collapse('hide');

    $('[data-popid="popover"]').popover('hide');
    $('[data-popid="popover"]').popover('destroy');
    $('.popover').css('display', 'none');
}
;
function sqlDateFormat(current) {
    var today = new Date(current);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd
    return today;
}
function stdDateFormat(current) {
    if (current && current != '0000-00-00')
        var today = moment(current).format('L');
    else
        today = '';
    return today;
}
function setDurationStep() {
    switch ($("#action_duration_type").val()) {
        case 'MINUTE':
            $("#action_duration").attr("step", "15");
            $("#action_duration").attr("max", "60");
            $("#action_duration").attr("min", "15");
            $("#action_duration").val("15");
            break;
        case 'HOUR':
            $("#action_duration").attr("step", "1");
            $("#action_duration").attr("max", "24");
            $("#action_duration").attr("min", "1");
            $("#action_duration").val("1");
            break;
        case 'DAY':
            $("#action_duration").attr("step", "1");
            $("#action_duration").attr("max", "30");
            $("#action_duration").attr("min", "1");
            $("#action_duration").val("1");
            break;
        case 'ALLDAY':
            $("#action_duration").attr("step", "1");
            $("#action_duration").attr("max", "1");
            $("#action_duration").attr("min", "1");
            $("#action_duration").val("1");
            break;
        case 'NONE':
            $("#action_duration").attr("step", "0");
            $("#action_duration").attr("max", "0");
            $("#action_duration").attr("min", "0");
            $("#action_duration").val("0");
            break;
    }
}
function copyContent() {
    if ($("#remind_contentFlag").is(":checked"))
        $("#remind_content").val($("#action_name").val());
}
function requireReminder() {
    if ($("#remind:checked").val()) {
        $("#remind_date").attr("required", "required");
        $("#remind_time").attr("required", "required");
        $("#remind_content").attr("required", "required");
    }
    else {
        $("#remind_date").removeAttr("required");
        $("#remind_time").removeAttr("required");
        $("#remind_content").removeAttr("required");
    }
}
function cleanEventWindow() {
    if (self.event_salesmanid == self.user_id())
        $("#forsalesman").addClass('hidden');
    else
        $("#forsalesman").removeClass('hidden');

    $("#action_selowner").prop("checked", false);
    $("#ownername").text("");
    $('#ownerid').val('0');

    $("#action_complete").prop("checked", false);
    $('#action_complete_date').val('');
    $('#action_complete_time').val('');

    $("#iscancel").removeClass('show');
    $("#iscancel").addClass('hidden');
    $("#action_canceled").prop("checked", false);
    $('#action_cancel_date').val('');
    $('#action_cancel_time').val('');

    $("#action_duration_type").val("MINUTE");
    setDurationStep();
    $("#action_name").val("");
    $("#action_date").val("");
    $("#action_time").val("");
    $("#action_content").val("");
    $("#action_comment").val("");
    $("#remind_date").val("");
    $("#remind_time").val("");
    $("#remind_content").val("");
    $("#action_type").val("");
    $("#remind").prop("checked", false);
    $("#idactions").val(0);
    $("#remind_contentFlag").prop("checked", false);
    $("#eventheader").text("Add event for : ");
    $("#remind_inclphone").prop("checked", false);
    $("#remind_inclemail").prop("checked", false);
    self.event_comments([]);
    self.event_addcomment(false);
    requireReminder();
    enableEventWindow();
}
function setEventStatus(status_atached, oldstatus_atached, statussource) {
    $("#addevent").attr("data-call", "changestatus");
    $("#addevent").attr("data-statussrc", statussource);
    $("#addevent").attr("data-oldstatus", encodeURI(JSON.stringify(oldstatus_atached)));
    $("#addevent").attr("data-status", encodeURI(JSON.stringify(status_atached)));
    $("#action_type").attr("readonly", "readonly");
}
function setEventWindow(data) {
    //console.log('user login id', self.user_id());
    //console.log('Prospect salesman id', data.salesmanid);
    //console.log('Event user id', data.iduser);
    if (data.salesmanid == self.user_id())
        $("#forsalesman").addClass('hidden');
    else
        $("#forsalesman").removeClass('hidden');

    $("#action_selowner").prop("checked", data.salesmanid == data.iduser ? true : false);
    $("#ownername").text(data.salesperson);
    $('#ownerid').val(data.salesmanid);

    $("#iscomplete").removeClass('hidden');
    $("#iscomplete").addClass('show');
    if (data.action_complete === '1') {
        $("#action_complete").prop("checked", data.action_complete === '1' ? true : false);
        $('#action_complete_date').val(moment(data.action_complete_time).format('l'));
        $('#action_complete_time').val(moment(data.action_complete_time).format('hh:mm A'));
    }
    if (data.action_type == 32 || data.action_type == 34) {
        $("#iscancel").removeClass('hidden');
        $("#iscancel").addClass('show');
        if (data.action_canceled === '1') {
            $("#action_canceled").prop("checked", data.action_canceled === '1' ? true : false);
            $('#action_cancel_date').val(moment(data.action_cancel_time).format('l'));
            $('#action_cancel_time').val(moment(data.action_cancel_time).format('hh:mm A'));
        }
    }

    $("#action_duration_type").val(data.action_duration_type);
    setDurationStep();
    $("#action_duration").val(data.action_duration);
    $("#action_name").val(data.action_name);
    $("#action_date").val(moment(data.action_datetime).format('l'));
    $("#action_time").val(moment(data.action_datetime).format('hh:mm A'));
    //$("#action_content").val(data.action_content);
    $("#action_type").val(data.action_type);
    $("#idactions").val(data.idactions);
    $("#eventheader").text("Edit event for : ");
    if (data.remind === '1') {
        $("#remind_date").val(moment(data.remind_datetime).format('l'));
        $("#remind_time").val(moment(data.remind_datetime).format('hh:mm A'));
        $("#remind_content").val(data.remind_content);
        $("#remind_type").val(data.remind_type);
        $("#remind_inclphone").prop("checked", data.remind_inclphone === '1' ? true : false);
        $("#remind_inclemail").prop("checked", data.remind_inclemail === '1' ? true : false);
    }
    $("#remind").prop("checked", data.remind === '1' ? true : false);
    var comentarios = data.comments
    if (comentarios && comentarios !== null) {
        for (var i = 0; i < comentarios.length; i++) {
            self.event_comments.push(comentarios[i]);
        }
    }
    requireReminder();
    enableEventWindow();
}
function setCompleteDate() {
    if ($("#action_complete").is(":checked")) {
        var formatdatetime = moment();
        $('#action_complete_date').val(formatdatetime.format('l'));
        $('#action_complete_time').val(formatdatetime.format('hh:mm A'));

    }
    else {
        $('#action_complete_date').val('');
        $('#action_complete_time').val('');
        enableEventWindow();
    }
}
function setCancelDate() {
    if ($("#action_canceled").is(":checked")) {
        var message = "<p>Estas seguro que desea <b>CANCELAR</b> el evento?. Despues de cancelado <b>NO</b> se puede cambiar, tendria que crear otro evento.<br/>Solo aplica a eventos tipo SOLD y LOST</p>";
        messagealert(message, "danger", function (opt) {
            if (opt == 'YES') {
                var formatdatetime = moment();
                $("#action_canceled").prop("checked", true);
                $('#action_cancel_date').val(formatdatetime.format('l'));
                $('#action_cancel_time').val(formatdatetime.format('hh:mm A'));
                $("#addevent").removeAttr("disabled");

                $("#action_complete").prop("checked", true);
                $('#action_complete_date').val(formatdatetime.format('l'));
                $('#action_complete_time').val(formatdatetime.format('hh:mm A'));
            } else {
                $("#action_canceled").prop("checked", false);
                enableEventWindow();
            }
        });
    } else {
        $('#action_cancel_date').val('');
        $('#action_cancel_time').val('');
        enableEventWindow();
    }
}
function enableEventWindow() {

    if (self.event_new()) {
        $("#action_type").removeAttr("disabled");
    } else
        $("#action_type").attr("disabled", "disabled");

    if ($("#action_canceled").is(":checked")) {
        $("#action_canceled").attr("disabled", "disabled");
        $("#action_complete").attr("disabled", "disabled");
    } else {
        $("#action_canceled").removeAttr("disabled");
        $("#action_complete").removeAttr("disabled");
    }

    if ($("#action_complete").is(":checked") || $("#action_canceled").is(":checked")) {
        $("#action_duration_type").attr("disabled", "disabled");
        $("#action_name").attr("disabled", "disabled");
        $("#action_date").attr("disabled", "disabled");
        $("#action_time").attr("disabled", "disabled");
        $("#action_content").attr("disabled", "disabled");
        $("#remind_date").attr("disabled", "disabled");
        $("#remind_time").attr("disabled", "disabled");
        $("#remind_content").attr("disabled", "disabled");
        //$("#action_type").attr("disabled", "disabled");
        $("#remind").attr("disabled", "disabled");
        $("#remind_contentFlag").attr("disabled", "disabled");
        $("#remind_type").attr("disabled", "disabled");
        $("#action_duration").attr("disabled", "disabled");
        $("#remind_inclphone").attr("disabled", "disabled");
        $("#remind_inclemail").attr("disabled", "disabled");
        $("#addevent").attr("disabled", "disabled");
    }
    else {
        $("#action_duration_type").removeAttr("disabled");
        $("#action_name").removeAttr("disabled");
        $("#action_date").removeAttr("disabled");
        $("#action_time").removeAttr("disabled");
        $("#action_content").removeAttr("disabled");
        $("#remind_date").removeAttr("disabled");
        $("#remind_time").removeAttr("disabled");
        $("#remind_content").removeAttr("disabled");
        //$("#action_type").removeAttr("disabled");
        $("#remind").removeAttr("disabled");
        $("#remind_contentFlag").removeAttr("disabled");
        $("#remind_type").removeAttr("disabled");
        $("#action_duration").removeAttr("disabled");
        $("#remind_inclphone").removeAttr("disabled");
        $("#remind_inclemail").removeAttr("disabled");
        $("#addevent").removeAttr("disabled");
    }
}
function visibleEventPanel(pswitch) {
    if (pswitch === true) {
        $('#eventspanel').css('display', 'block');
    } else {
        $('#eventspanel').css('display', 'none');
    }
}
function logdata(title, data, type) {
    switch (type) {
        case 'log':
            console.log(title, ". The object is: ", data);
            break;
        case 'error':
            console.error(title, ". The object is: ", data);
            break;
        case 'info':
            console.info(title, ". The object is: ", data);
            break;
        case 'warn':
            console.warn(title, ". The object is: ", data);
            break;
    }

}
function logoff_usr() {
    $('#tradeinWindow').modal('hide');
    $('#reportOptions').modal('hide');
    $('#moredetailWindow').modal('hide');
    $('#aboutlts').modal('hide');
    $('#commentsWindow').modal('hide');
    $('#vehicleListWindow').modal('hide');
    $('#eventsWindow').modal('hide');
    $('#toreviewlabel').text('TO REVIEW ');

    countdown_worker.terminate();
    self.page_groupof = width_offset >= 1200 ? 10 : (width_offset >= 992 ? 8 : (width_offset >= 768 ? 5 : 1));
    self.page_start = 1;
    self.page_end = width_offset >= 1200 ? 10 : (width_offset >= 992 ? 8 : (width_offset >= 768 ? 5 : 1));
    self.page_current(1);
    self.page_pages(10);

    self.filterby_uptype(0);
    self.filterby_adsource(0);
    self.filterby_status(0);
    self.filterby_udstatus(0);
    self.filterby_event(0);
    self.filterby_model(0);
    self.filterby_newleads(false);
    self.filterby_fullname(0);
    self.prospect_statuschange = 0;
    self.prospect_statuschangeindex = 0;
    self.prospect_status = 0;
    self.dealerships([]);
    self.eventtype([]);
    self.adsourcedata([]);
    self.statusdata([]);
    self.statusdataAtach([]);
    self.udstatusdata([]);
    self.udstatusdataAtach([]);
    self.uptypedata([]);
    self.webVehicleList([null]);
    self.salesman_opt(0);
    self.salesman_chgpasswd(false);
    self.salesman_list([]);
    self.salesman_iseditable(false);
    self.salesman_detail(new struct_salesman_detail(null));
    self.salesman_edit(false);
    self.salesman_add(false);
    self.salesman_id(0);
    self.salesman_initials('');
    self.salesman_role(1);
    self.salesman_name('');
    self.user_login(false)
    self.user_id(0);
    self.user_editid = 0;
    self.prospect_iseditable(false);
    self.prospect_add(false);
    self.prospect_edit(false);
    visibleEventPanel(true);
    self.user_login(false);
    self.topmenubar([]);
    sessionStorage.clear();
    self.activeView('login');
    AJAX_requests('GET', 'logout', 'GET');
    //$('#dashboard').addClass('invisible');
    $(".topfilterOptions").css("display", "none");
    location.reload(true);
}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "LTSReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// model connection

function validateuser() {
    var uname = CryptoJS.MD5($('#username').val());
    uname = uname.toString(CryptoJS.enc.Hex);
    var salt = $('#salt').val();
    AJAX_requests("GET", "env", "sec", {u: uname, s: salt}, function (response) {
        if (response) {
            if (response.status == 100) {
                $("#password").removeAttr('readonly');
                $("#cmdlogin").removeAttr('disabled');

                logdataflag = response.dbg == '1' ? true : false;

                document.getElementById("password").focus();
            } else {
                $("#password").attr('readonly', 'readonly');
                $("#cmdlogin").attr('disabled', 'disabled');
                messagealert(response.msg);
            }

        }
    });
}
var last_refresh = moment().format('MMMM Do YYYY, h:mm:ss a');
function AJAX_requests(type, page, action, data, callback) {
    var seckey = sessionStorage.sec ? sessionStorage.sec : null;

    var exp = moment().add(timeout, 'm').format('X');
    sessionStorage.expirationdate = exp;

    logdataflag ? console.log(type + " " + page + " " + action, data, "warn") : '';
    logdataflag ? timestart = moment() : false;

    switch (action) {
        case 'edmundapi':
            AJAX_url = page;
            dataType = 'jsonp';
            break;
        case 'reportExport':
            AJAX_url = page;
            dataType = 'json';
            break;
        default:
            AJAX_url = WSS_URL + '?page=' + page + '&action=' + action + '&sec=' + seckey + '&debug=' + logdataflag
            dataType = 'json';
            break;
    }

    $.ajax(AJAX_url,
            {
                dataType: dataType, type: type, data: data,
                beforeSend: function () {
                    $(".loading_overlay").css('display', 'block');
                    $("#loadingwrapper").css('display', 'block');
                },
                complete: function () {
                    $(".loading_overlay").css('display', 'none');
                    $("#loadingwrapper").css('display', 'none');
                },
                success: function (responsedata) {
                    $(".loading_overlay").css('display', 'none');
                    $("#loadingwrapper").css('display', 'none');

                    logdataflag ? console.log("AJAX " + page + " " + action, responsedata, "info") : '';

                    last_refresh = moment().format('MMMM Do YYYY, h:mm:ss a')
                    $("#last_refresh").html("Last inquiry was " + last_refresh);

                    if (responsedata.msg && responsedata.msg == 'timeout') {
                        $("#password").attr('readonly', 'readonly');
                        $("#cmdlogin").attr('disabled', 'disabled');
                        messagealert("<p>The server session timed out</p>", "danger", 0, 6000);
                        logoff_usr();
                    }
                    if (responsedata.msg && responsedata.msg == 'unauthorized') {
                        $("#password").attr('readonly', 'readonly');
                        $("#cmdlogin").attr('disabled', 'disabled');
                        messagealert("<p>The server session timed out</p>", "danger", 0, 6000);
                        logoff_usr();
                    }
                    if (callback && typeof (callback) === "function") {
                        callback(responsedata);
                    }
                },
                error: function (xmlRequest, errorType, expObject) {
                    $(".loading_overlay").css('display', 'none');
                    $("#loadingwrapper").css('display', 'none');

                    logdataflag ? console.log("Error", {x: xmlRequest, s: errorType, t: expObject}, "error") : '';
                    if (expObject === 'Timeout' || expObject === 'timeout') {
                        logoff_usr();
                        $("#password").attr('readonly', 'readonly');
                        $("#cmdlogin").attr('disabled', 'disabled');
                        messagealert("The server session timed out", "danger", 0, 6000);
                    }
                }
            });
}
//dashbord function

//google.setOnLoadCallback(drawChart);
function getDataSourceUrlc(action) {
    var seckey = sessionStorage.sec ? sessionStorage.sec : null;
    var year = moment().format("YYYY");
    var month = moment().format("M");
    return WSS_URL + '?page=dashboard&action=' + action + '&sec=' + seckey + '&month=' + month + '&year=' + year + '&salesman=' + self.salesman_id();
}

var dataTable;
var rowSelected;
function drawChart() {
    sizeRefresh('dashboard');
    AJAX_requests('GET', 'dashboard', 'GET', {month: self.dashboard_month(), year: self.dashboard_year(), salesman: self.salesman_id()}, function (cldata) {
        if (self.salesman_id() == 'ALL')
            var max = parseInt(sessionStorage.dealer_quota);
        else
            var max = parseInt(sessionStorage.salesman_quota);

        var redTo = max - (.5 * max);
        var yellowTo = max - (.25 * max);

        // sales widget
        var salesWidget = new google.visualization.ChartWrapper({
            'chartType': 'Gauge',
            'containerId': 'salesWidget',
            'dataTable': cldata.solds,
            'options': {
                'height': widgetsCHeight,
                'width': widgetsWidth['salesContainer'],
                'redFrom': 0, 'redTo': redTo,
                'yellowFrom': redTo, 'yellowTo': yellowTo,
                'greenFrom': max * 1.10, 'greenTo': max * 2,
                'max': max * 2,
                'minorTicks': 5
            },
        });
        salesWidget.draw();

        // end sales widget
        // performance dashbord //
        if (cldata.performance) {
            var metricPicker = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'metricPicker',
                'options': {
                    'filterColumnLabel': 'Indicator',
                    'ui': {
                        'caption': 'Choose a metric...',
                        'label': 'Performance by ',
                        'labelStacking': 'horizontal',
                        'allowTyping': false,
                        'allowMultiple': false,
                        'cssClass': 'widget-text'
                    }
                },
                'state': {'selectedValues': ['Adsource']}
            });
            var performanceWrapper = new google.visualization.ChartWrapper({
                'chartType': 'PieChart',
                'containerId': 'performanceWrapper',
                'options': {
                    'backgroundColor': '#d9edf7',
                    'chartArea': {
                        'width': widgetsWidth['performanceContainer'],
                        'height': '85%'
                    },
                    'width': widgetsWidth['performanceContainer'],
                    'height': widgetsCHeight,
                    'pieSliceText': 'percentage'
                },
                'view': {'columns': [1, 2]}
            });

            var performanceWidget = new google.visualization.Dashboard(document.getElementById('performanceWidget'));
            performanceWidget.bind([metricPicker], [performanceWrapper]).draw(cldata.performance);
        }
        else {
            $("#performanceWrapper").html('<div class="emptydata" style="height:' + widgetsHeight + 'px;"><p class="text-info">No performance metrics for selected month<p></div>');
            $("#metricPicker").html('');
        }
        /// end performance dashboard //

        // event widget
        var eventWidget = new google.visualization.ChartWrapper({
            'chartType': 'ColumnChart',
            'containerId': 'eventWidget',
            'dataTable': cldata.events,
            'options': {
                'height': widgetsCHeight,
                'width': widgetsWidth['eventContainer'],
                'backgroundColor': '#dff0d8',
                'titlePosition': 'none',
                'chartArea': {
                    'top': 5,
                    'height': "75%"
                }
            }
        });
        eventWidget.draw();
        // end event widget
        // new prospect table widget
        if (cldata.openOportunities) {
            $("#table1_text").html('New Prospects');
            var table1_div = new google.visualization.ChartWrapper({
                'chartType': 'Table',
                'containerId': 'table1_div',
                'dataTable': cldata.openOportunities,
                'options': {
                    'allowHtml': true,
                    'cssClassNames': {
                        'headerRow': 'tr-muted',
                        'tableRow': 'bg-muted',
                        'oddTableRow': '',
                        'selectedTableRow': '',
                        'hoverTableRow': '',
                        'headerCell': 'tablecells',
                        'tableCell': 'tablecells',
                        'rowNumberCell': ''
                    },
                    'height': widgetsCHeight,
                    'width': widgetsWidth['table1Container'],
                    'showRowNumber': true, 'pageSize': 10, 'page': 'enable',
                    'alternatingRowStyle': false
                }
            });
            table1_div.draw();
        }
        else {
            $("#table1_div").html('<div class="emptydata" style="height:' + widgetsHeight + 'px;"><p class="text-muted">No new prospect for selected month<p></div>');
            $("#table1_text").html('');
        }
        // end prospect table widget
        // new cldata.openEvents table widget
        if (cldata.openEvents) {
            $("#table2_text").html('Pending Activities');
            table2_div = new google.visualization.ChartWrapper({
                'chartType': 'Table',
                'containerId': 'table2_div',
                'dataTable': cldata.openEvents,
                'options': {
                    'allowHtml': true,
                    'cssClassNames': {
                        'headerRow': 'tr-danger',
                        'tableRow': 'bg-danger',
                        'oddTableRow': '',
                        'selectedTableRow': '',
                        'hoverTableRow': 'tr-danger',
                        'headerCell': 'tablecells',
                        'tableCell': 'tablecells',
                        'rowNumberCell': ''
                    },
                    'height': widgetsCHeight,
                    'width': widgetsWidth['table2Container'],
                    'showRowNumber': true, 'pageSize': 10, 'page': 'enable',
                    'alternatingRowStyle': false
                }
            });
            table2_div.draw();

            google.visualization.events.addListener(table2_div, 'select', function () {
                var selection = table2_div.getChart().getSelection();
                console.log(table2_div);
                dataTable = table2_div.getDataTable();
                if (selection.length > 0) {
                    rowSelected = selection[0].row;
                    var eventSelected = dataTable.getValue(rowSelected, 1);
                    self.prospect_id = dataTable.getValue(rowSelected, 0);
                    self.prospect_selname(dataTable.getValue(rowSelected, 2));
                    self.event_new(false);
                    cleanEventWindow();
                    AJAX_requests('GET', 'events', 'GET', {idprospects: self.prospect_id, idactions: eventSelected}, function (data) {
                        setEventWindow(data[0]);
                        $('#eventsWindow').modal('show');
                    });
                }
            });

        }
        else {
            $("#table2_div").html('<div class="emptydata" style="height:' + widgetsHeight + 'px;"><p class="text-danger">No Pending Activities for selected month<p></div>');
            $("#table2_text").html('');
        }
        // end cldata.openEvents table widget
        // new cldata.salesManRank table widget
        if (cldata.salesManRank) {
            var rankPicker = new google.visualization.ControlWrapper({
                'controlType': 'CategoryFilter',
                'containerId': 'table3_text',
                'options': {
                    'filterColumnLabel': 'RankName',
                    'ui': {
                        'caption': 'Choose a ranking...',
                        'label': 'Salesperson Ranking by ',
                        'labelStacking': 'horizontal',
                        'allowTyping': false,
                        'allowMultiple': false,
                        'cssClass': 'widget-text'
                    }
                },
                'state': {'selectedValues': ['Ups']}
            });
            //$("#table3_text").html('Salesperson Ranking');
            var table3_div = new google.visualization.ChartWrapper({
                'chartType': 'Table',
                'containerId': 'table3_div',
                'options': {
                    'allowHtml': true,
                    'cssClassNames': {
                        'headerRow': 'tablewidths tr-primary',
                        'tableRow': 'bg-primary',
                        'oddTableRow': '',
                        'selectedTableRow': 'tr-selected',
                        'hoverTableRow': 'tr-selected',
                        'headerCell': 'tablecells',
                        'tableCell': 'tablecells',
                        'rowNumberCell': 'label label-rank'
                    },
                    'height': widgetsCHeight,
                    'width': widgetsWidth['table3Container'],
                    'showRowNumber': true, 'pageSize': 10, 'page': 'enable',
                    'alternatingRowStyle': false
                }
            });
            var table3_divWidget = new google.visualization.Dashboard(document.getElementById('table3_divWidget'));
            table3_divWidget.bind([rankPicker], [table3_div]).draw(cldata.salesManRank);
            //table3_div.draw();
        } else {
            $("#table3_div").html('<div class="emptydata" style="height:' + widgetsHeight + 'px;"><p class="text-primary">No Salesperson Ranking for selected month<p></div>');
            $("#table3_text").html('');
        }
    });
}
function perfevents() {
    console.log(this);
}
//vin decoder edmund
//var photoTradein;
var vinDecodeURL = function (vin, key) {
    return edmundURI + "/api/vehicle/v2/vins/" + vin + "?fmt=json&api_key=" + key;
};
var makemodelyearDecodeURL = function (make, model, year, key) {
    return edmundURI + "/api/vehicle/v2/" + make + "/" + model + "/" + year + "?fmt=json&api_key=" + key;
};
var vinColorUrl = function (styleid, key) {
    return edmundURI + "/api/vehicle/v2/styles/" + styleid + "/colors?category=Exterior&fmt=json&api_key=" + key;
};
var vinTMVUrl = function (styleid, condition, mileage, zip, colorid, key) {
    return edmundURI + "/v1/api/tmv/tmvservice/calculateusedtmv?styleid=" + styleid +
            "&condition=" + condition + "&mileage=" + mileage + "&zip=" + zip +
            (colorid ? "&colorid=" + colorid : "") + "&fmt=json&api_key=" + key;
};
var vinPhotoURL = function (styleID, key) {
    return edmundURI + "/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=" + styleID + "&fmt=json&api_key=" + key;
};

function getColors(styleid) {
    var vinColorServer = vinColorUrl(styleid, edmundsKey);
    AJAX_requests('GET', vinColorServer, 'edmundapi', '', function (colordata) {
        if (colordata && colordata.status) {
            messagealert(colordata.message, 'warning');
        } else {
            self.decoded_colorlist([]);
            if (colordata.colorsCount > 0)
                self.decoded_colorlist(colordata.colors);
        }
        setTimeout(function () {
            retrieveEDPhoto(self.decoded_styleID());
        }, 1000);
    });
}
function makeModelYearDecode(make, model, year) {
    var vinDecodeServer = makemodelyearDecodeURL(make, model, year, edmundsKey);
    var vinDECODED = false;
    AJAX_requests('GET', vinDecodeServer, 'edmundapi', '', function (data) {
        if (data && data.status) {
            messagealert(data.message, 'warning');
            self.decode_reset();
        } else {
            self.decoded_styles(data.styles);
            $('#dmake').val(make);
            $('#dmodel').val(model);
            $('#dyear').val(year);
            self.decoded_data(data);
            vinDECODED = true;
        }

    });
}
function vinDecode(vinToDecode) {
    var vinDecodeServer = vinDecodeURL(vinToDecode, edmundsKey);
    var vinDECODED = false;
    AJAX_requests('GET', vinDecodeServer, 'edmundapi', '', function (data) {
        if (data && data.status) {
            //messagealert(data.message, 'warning');
            self.decode_reset();
            $('#vintodecode').val('');
            $('#maketodecode').val('');
            $('#modeltodecode').val('');
            $('#yeartodecode').val('');
            $('.todecode').toggleClass('hidden');
            $('#maketodecode').attr('required', 'required');
            $('#modeltodecode').attr('required', 'required');
            $('#yeartodecode').attr('required', 'required');
            $('#vintodecode').removeAttr('required');
            $("#conditiondescr").parent().removeClass('alert-info').addClass('alert-danger');
            $("#conditiondescr").html('<p>' + data.message + '</p>' + '<p>To get the style details for a specific vehicle, please enter make/mode/year and hit decode.</p>');

        } else {
            if (data.years && data.years.length > 0 && data.years[0].styles && data.years[0].styles.length > 0) {
                $('#ddesc').val(data.years[0].styles[0].name);
                self.decoded_styleID(data.years[0].styles[0].id);
                getColors(self.decoded_styleID());
            }
            $('#dmake').val(data.make ? data.make.name : '');
            $('#dmodel').val(data.model ? data.model.name : '');
            $('#dyear').val(data.years ? data.years[0].year : 0);
            $('#ddoor').val(data.numOfDoors ? data.numOfDoors : 0);
            self.decoded_data(data);
            vinDECODED = true;
        }
    });
} // llama servidor para decodificar VIN
function retrieveEDPhoto(styleID) {
    var loPhotoJSONLink = vinPhotoURL(styleID, edmundsKey);
    AJAX_requests('GET', loPhotoJSONLink, 'edmundapi', '', function (photoArray) {
        if (photoArray && photoArray.error) {
            messagealert(photoArray.error.message, 'warning');
        }
        else {
            if (photoArray && photoArray.status) {
                messagealert(photoArray.message, 'danger');
            } else {
                self.decoded_photoTradein([]);
                logdataflag ? console.log("photoData", photoArray, "info") : '';
                for (var i = 0; i < photoArray.length; i++) {
                    var photoData = photoArray[i];
                    var thumb, image, big;
                    var resThumb = 200, resImage = 300, resBig = 300;
                    var photoSrc = photoData.photoSrcs
                    for (var j = 0; j < photoSrc.length; j++) {
                        var n = photoSrc[j].split("_");
                        var r = parseInt(n[n.length - 1]);
                        if (r >= 87 && r <= 150) {
                            thumb = r < resThumb ? photoSrc[j] : thumb;
                            resThumb = r < resThumb ? r : resThumb;
                        }
                        if (r >= 300 && r <= 600) {
                            image = r > resImage ? photoSrc[j] : image;
                            resImage = r > resImage ? r : resImage;
                        }
                        if (r >= 300) {
                            big = r > resBig ? photoSrc[j] : big;
                            resBig = r > resBig ? r : resBig;
                        }

                    }
                    var photoString = {photoID: photoData.shotTypeAbbreviation + i, thumb: thumb, image: image, big: big, title: photoData.type + " " + photoData.subType, description: photoData.captionTranscript, url: vinPhotoURI, source: "edmunds"};
                    //photoTradein[i] = photoString;
                    self.decoded_photoTradein.push(photoString);
                }
                logdataflag ? console.log("self.decoded_photoTradein", self.decoded_photoTradein(), "info") : '';
            }

        }
    });
}
function retrieveEDTMV(styleID, condition, mileage, zip, colorid) {
    var vinTMVServer = vinTMVUrl(styleID, condition, mileage, zip, colorid, edmundsKey);
    AJAX_requests('GET', vinTMVServer, 'edmundapi', '', function (tmvdata) {
        if (tmvdata && tmvdata.status) {
            messagealert(tmvdata.message, 'warning');
        } else {
            if (tmvdata.tmv) {
                var tmv = tmvdata.tmv;

                self.decode_TMV().nationalBasePrice(Currency(tmv.nationalBasePrice));
                self.decode_TMV().regionalAdjustment(Currency(tmv.regionalAdjustment));
                self.decode_TMV().colorAdjustment(Currency(tmv.colorAdjustment));
                self.decode_TMV().conditionAdjustment(Currency(tmv.conditionAdjustment));
                self.decode_TMV().mileageAdjustment(Currency(tmv.mileageAdjustment));
                self.decode_TMV().appraisal(Currency(tmv.totalWithOptions));

                $("#appraisal-date").text(moment().format('lll'));
            }
        }
    });
}
function Currency(amount) {
    var gettmvfrom = $("#gettmvfrom").val();
    if (amount) {
        var value = 0.00;
        switch (gettmvfrom) {
            case 'tradein':
                value = amount.usedTradeIn ? parseFloat(amount.usedTradeIn) : 0.00;
                break;
            case 'dealerretail':
                value = amount.usedTmvRetail ? parseFloat(amount.usedTmvRetail) : 0.00;
                break;
            case 'private':
                value = amount.usedPrivateParty ? parseFloat(amount.usedPrivateParty) : 0.00;
                break;
        }
        if (isNaN(value)) {
            return '-';
        } else {
            var currency = ' ' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            return currency;
        }
    } else
        return '-';
}
function cleanCurrentcy(amount) {
    amount = amount.replace(/\,/g, '');
    amount = amount.replace(/\s+/g, '');
    return parseFloat(amount);
}

var googleLink_cookies = "https://support.google.com/accounts/answer/61416?hl=en";
var firefoxLink_cookies = "http://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences";
function are_cookies_enabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
}

function cookiesEnabled() {
    // generate a cookie to probe cookie access
    document.cookie = '__cookieprobe=0;path=/';
    return document.cookie.indexOf('__cookieprobe') != -1;
}

function webStorageEnabled() {
    if (typeof webStorageEnabled.value == 'undefined') {
        try {
            localStorage.setItem('__webstorageprobe', '');
            localStorage.removeItem('__webstorageprobe');
            webStorageEnabled.value = true;
        }
        catch (e) {
            webStorageEnabled.value = false;
        }
    }

    return webStorageEnabled.value;
}

function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255)
        r = 255;
    else if (r < 0)
        r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255)
        b = 255;
    else if (b < 0)
        b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255)
        g = 255;
    else if (g < 0)
        g = 0;

    //return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}
