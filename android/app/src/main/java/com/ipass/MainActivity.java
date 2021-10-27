package com.ipass;
import android.os.Bundle; // <- add this necessary import

import com.facebook.react.ReactActivity;
import android.content.res.Configuration; // <--- import
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
    int drawableId = (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES
    ? R.drawable.bootsplash_dark
    : R.drawable.bootsplash; //Default light theme
    RNBootSplash.init(drawableId, MainActivity.this);
  }
  
   @Override
  protected String getMainComponentName() {
    return "ipass";
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    getReactInstanceManager().onConfigurationChanged(this, newConfig);
  }
}
