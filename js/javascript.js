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
      var dataContainer = document.getElementsByClassName('results__display')[0];
      dataContainer.textContent = JSON.stringify(data, null, "  ");
        
      var sample = '{
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]
}';
      
      var xhr = new XMLHttpRequest();
      xhr.open("POST", '', true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // xhr.send(JSON.stringify({"text":slackStr}));
      xhr.send(JSON.stringify(sample));
      window.alert("The Information is not posted to Slack!");
    };

    /*
     * This is where things actually get started. We find the form element using
     * its class name, then attach the `handleFormSubmit()` function to the 
     * `submit` event.
     */
    var form = document.getElementById('cts_roc_report_submission');
    form.addEventListener('submit', handleFormSubmit);