package de.menne.schulheld5;

import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    final WebView wv = getBridge().getWebView();
    wv.addJavascriptInterface(new Object() {
      @JavascriptInterface
      public void print(final String title) {
        runOnUiThread(new Runnable() {
          public void run() {
            String t = (title == null || title.isEmpty()) ? "Schul-Held" : title;
            PrintManager pm = (PrintManager) getSystemService(PRINT_SERVICE);
            pm.print(t, wv.createPrintDocumentAdapter(t), new PrintAttributes.Builder().build());
          }
        });
      }
    }, "AndroidPrint");
  }
}
