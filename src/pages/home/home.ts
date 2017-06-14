import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EstimoteBeacons, EstimoteBeaconRegion } from '@ionic-native/estimote-beacons';

declare var evothings: any

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  uuid = [];

  constructor(
    public navCtrl: NavController,
    private eb: EstimoteBeacons
  ) {
    this.eb.requestAlwaysAuthorization();
    this.eb.enableAnalytics(true);

    // this.eb.startRangingBeaconsInRegion({ major: 57873, minor: 56884, uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d" }).subscribe(
    //   (result: any) => {
    //     this.uuid.push({ uuid: result.region.uuid });
    //     console.log('*** Beacons ranged ***')
    //     console.log(result);
    //   },
    //   (errorMessage) => {
    //     this.uuid = errorMessage;
    //     console.log('Ranging error: ' + errorMessage)
    //   }
    // );

    evothings.eddystone.startScan((beacon) => {
      let distance = evothings.eddystone.calculateAccuracy(beacon.txPower, beacon.rssi);
      let str_nid = evothings.util.typedArrayToHexString(beacon.nid); //Namespace ID
      let str_bid = evothings.util.typedArrayToHexString(beacon.bid); //Beacon ID or Instance ID
      console.log('*** Beacons ranged ***')
      console.log(this.HexToString(str_nid));
      console.log(this.HexToString(str_bid));
      console.log(distance);
    })


    // HEX Notes: 
    // CHALLENGER = 4348414c4c454e474552
    // CTLNEX = 43544c4e4558
    //let str = this.StringToHex('CHALLENGER');
    //console.log(str);
    // let str = this.StringToHex('CTLNEX');
    // console.log(str);

  }
  StringToHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
      hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
  }
  HexToString(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }


}
