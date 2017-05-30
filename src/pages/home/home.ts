import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public ibeacon: IBeacon
  ) {
    this.ibeacon.requestAlwaysAuthorization();

    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();
    delegate.didRangeBeaconsInRegion().subscribe(
      (data) => { console.log('didRangeBeaconsInRegion: ', data) },
      (error) => { console.log(error) }
    );
    delegate.didStartMonitoringForRegion().subscribe(
      (data) => { console.log('didStartMonitoringForRegion: ', data) },
      (error) => { console.log(error) }
    );
    delegate.didEnterRegion().subscribe(
      (data) => { console.log('didEnterRegion: ', data) }
    );
    let beaconRegion = this.ibeacon.BeaconRegion('deskBeacon', '4F5BC675-E4FB-4BA7-B6F8-C4B26A2D8DA7');
    this.ibeacon.startMonitoringForRegion(beaconRegion)
      .then(
      () => console.log('Native layer recieved the request to monitoring'),
      error => console.error('Native layer failed to begin monitoring: ', error)
      );
  }

}
