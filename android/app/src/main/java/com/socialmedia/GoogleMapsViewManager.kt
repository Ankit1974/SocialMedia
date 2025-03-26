package com.socialmedia

import android.content.Context
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions

class GoogleMapsViewManager : SimpleViewManager<MapView>(), OnMapReadyCallback {
    
    private var googleMap: GoogleMap? = null
    private lateinit var mapView: MapView

    override fun getName(): String {
        return "GoogleMapsView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): MapView {
        mapView = MapView(reactContext)
        mapView.onCreate(null)
        mapView.onResume()
        mapView.getMapAsync(this)
        return mapView
    }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map
        val delhiLocation = LatLng(28.6139, 77.2090)
        googleMap?.addMarker(MarkerOptions().position(delhiLocation).title("Marker in Delhi"))
        googleMap?.moveCamera(CameraUpdateFactory.newLatLngZoom(delhiLocation, 10f))
    }
}
