/* eslint-disable no-console */
import OfflinePlugin from 'offline-plugin/runtime';

function sw() {
	OfflinePlugin.install({
		onInstalled() {
			console.log('sw: installed');
		},

		onUpdating() {
			console.log('sw: updated!');
		},

		onUpdateReady() {
			OfflinePlugin.applyUpdate();
		},
		onUpdated() {
			// window.location.reload();
			console.log('sw: updated!');
		},
	});
}

export default sw;
