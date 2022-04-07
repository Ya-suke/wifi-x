const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const { NM, GLib } = imports.gi;

let panelButton, panelButtonText, timeout;

function setButtonText() {
  
  var myString;
  var myFrequency;
  var myFrequencyString;
  // date
  var [ok, out, err, exit] = GLib.spawn_command_line_sync('iwlist wlo1 channel');
  myString = out.toString();

  // myFreq = (myString.split('Current Frequency:').pop().split(" ")[0]);
  myFrequencyString = (myString.split('Current Frequency:').pop().replace('\n','').trim());
  // log(myFrequencyString)
  // log(myFrequencyString.length)
  myFrequency = (myFrequencyString.split(" ")[0]);

  myFrequency.length <= 6 && myFrequencyString.length <20 ? panelButtonText.set_text( myFrequency + " GHz"): panelButtonText.set_text("");

  // log(myFrequency);

  // log('*******************');
  // const myFrequency = new NM.AccessPoint();
  // log(myFrequency.get_frequency());
  //
  // // myFrequency =  (myString.split('*:').pop().split(" ")[0]);
  //
  // panelButtonText.set_text( myFrequency.get_frequency() + " GHz" );

  return true;
}
function init() {

  panelButton = new St.Bin({
    style_class: "panel-button"
  });
  panelButtonText = new St.Label({
    style_class: "examplePanelText",
    text: "..."
  });
  panelButton.set_child(panelButtonText);

}

function enable() {
  Main.panel._rightBox.insert_child_at_index(panelButton, 1);
  timeout = Mainloop.timeout_add_seconds(1.0, setButtonText)
}

function disable() {
  Mainloop.source_remove(timeout);
  Main.panel._rightBox.remove_child(panelButton);
}
