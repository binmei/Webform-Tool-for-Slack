    'use strict';
    
    var slackStr = "";
    
    var isValidElement = function isValidElement(element) {
      return element.name && element.value;
    };


    var isValidValue = function isValidValue(element) {
      return !['checkbox', 'radio'].includes(element.type) || element.checked;
    };

    var getSelectValues = function getSelectValues(options) {
      return [].reduce.call(options, function (values, option) {
        return option.selected ? values.concat(option.value) : values;
      }, []);
    };


    var formToJSON_deconstructed = function formToJSON_deconstructed(elements) {

      var reducerFunction = function reducerFunction(data, element) {
        data[element.name] = element.value;
        console.log(JSON.stringify(data));
        return data;
      };

      var reducerInitialValue = {};
      console.log('Initial `data` value:', JSON.stringify(reducerInitialValue));

      var formData = [].reduce.call(elements, reducerFunction, reducerInitialValue);
      return formData;
    };

    var formToJSON = function formToJSON(elements) {
        var ctr = 0;
        return [].reduce.call(elements, function (data, element) {
            if (isValidElement(element) && isValidValue(element)) {
                data[element.name] = element.value;
                if(element.name.includes('schedule')){
                    if(!slackStr.includes('Redo\'s')){
                        slackStr += '*///////Redo\'s///////* \n'
                    }
                    if(!slackStr.includes('Linear')){
                        slackStr += '*///////Linear///////* \n'
                    }
                    if(ctr === 2){
                        slackStr += '*///////VOD///////* \n'
                    }
                    if(ctr === 3){
                        slackStr += '*///////EST/QC///////* \n'
                    }
                    ctr++;
                    slackStr += '_*What\'s on the schedule for today?*_ \n'
                }
                else if(element.name.includes('issues')){
                    slackStr += '_*Issues encountered during processing:*_ \n'
                }
                else if(element.name.includes('progress')){
                    slackStr += '_*Status of work in progress:*_ \n'
                }
                else if(element.name.includes('Evertz')){
                    slackStr += '*Evertz* \n';
                }
                else if(element.name.includes('SF')){
                    slackStr += '*Salesforce* \n';
                }
                else if(element.name.includes('Team')){
                    slackStr += '*Team* \n';
                }
                slackStr += element.value + "\n";
            }
        return data;
      }, {});
    };


    var handleFormSubmit = function handleFormSubmit(event) {
      event.preventDefault();
      var data = formToJSON(form.elements);
     
      var payload = {
                                "username":"CTS-ROC-Bot",
                                "icon_emoji":":robot_face:",
                                "attachments": [
                                    {
                                        "color": "#d83b01",
                                        "title": "Redo's",
                                        "fields": [
                                            {
                                                "title": "How many redo's did we have?",
                                                "value": form.Redoamount.value
                                            },{
                                                "title": "Why did we redo the work?",
                                                "value": form.Redoreason.value
                                            },{
                                                "title": "How will we prevent this in the future?",
                                                "value": form.Redoprevention.value
                                            }                                    
                                        ]
                                    },
                                    {
                                        "color": "#ffb900",
                                        "title": "Linear",
                                        "fields": [
                                            {
                                                "title": "What's on the schedule for today?",
                                                "value": form.Linearschedule.value
                                            },{
                                                "title": "Issues encountered during processing.",
                                                "value": form.Linearissues.value
                                            },{
                                                "title": "Status of work in progress.",
                                                "value": form.Linearprogress.value
                                            }                                    
                                        ]
                                    },
                                    {
                                        "color": "#107c10",
                                        "title": "VOD",
                                        "fields": [
                                            {
                                                "title": "What's on the schedule for today?",
                                                "value": form.VODschedule.value
                                            },{
                                                "title": "Issues encountered during processing.",
                                                "value": form.VODissues.value
                                            },{
                                                "title": "Status of work in progress.",
                                                "value": form.VODprogress.value
                                            }                                   
                                        ]
                                    },
                                    {
                                        "color": "#0078d7",
                                        "title": "EST/QC",
                                        "fields": [
                                            {
                                                "title": "What's on the schedule for today?",
                                                "value": form.ESTschedule.value
                                            },{
                                                "title": "Issues encountered during processing.",
                                                "value": form.ESTissues.value
                                            },{
                                                "title": "Status of work in progress.",
                                                "value": form.ESTprogress.value
                                            }                                    
                                        ]
                                    },
                                    {
                                        "color": "#5c2e91",
                                        "fields": [
                                            {
                                                "title": "Evertz",
                                                "pretext": "",
                                                "value": form.Evertz.value
                                            },{
                                                "title": "Salesforce",
                                                "pretext": "",
                                                "value": form.SF.value
                                            },{
                                                "title": "Team",
                                                "pretext": "",
                                                "value": form.Team.value
                                            }                                    
                                        ]
                                    },
                                ]
                            };
      
        var xhr = new XMLHttpRequest();
        
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(JSON.stringify(payload));
        window.alert("The Information is now posted to Slack!");
    };

    /*
     * This is where things actually get started. We find the form element using
     * its class name, then attach the `handleFormSubmit()` function to the 
     * `submit` event.
     */
    var form = document.getElementById('cts_roc_report_submission');
    form.addEventListener('submit', handleFormSubmit);