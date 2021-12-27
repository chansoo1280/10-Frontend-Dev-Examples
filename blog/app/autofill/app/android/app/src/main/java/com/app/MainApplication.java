package com.app;

import android.app.Application;
import android.content.Context;

import android.app.assist.AssistStructure;
import android.app.assist.AssistStructure.ViewNode;
import android.os.CancellationSignal;

import android.view.autofill.AutofillId;

import android.service.autofill.AutofillService;
import android.service.autofill.Dataset;
import android.service.autofill.FillCallback;
import android.service.autofill.FillContext;
import android.service.autofill.FillRequest;
import android.service.autofill.FillResponse;
import android.service.autofill.SaveCallback;
import android.service.autofill.SaveRequest;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  @Override
  public void onFillRequest(FillRequest request, CancellationSignal cancellationSignal, FillCallback callback) {
      // Get the structure from the request
      List<FillContext> context = request.getFillContexts();
      AssistStructure structure = context.get(context.size() - 1).getStructure();

      // Traverse the structure looking for nodes to fill out.
      ParsedStructure parsedStructure = parseStructure(structure);

      // Fetch user data that matches the fields.
      UserData userData = fetchUserData(parsedStructure);

      // Build the presentation of the datasets
      RemoteViews usernamePresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
      usernamePresentation.setTextViewText(android.R.id.text1, "my_username");
      RemoteViews passwordPresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
      passwordPresentation.setTextViewText(android.R.id.text1, "Password for my_username");

      // Add a dataset to the response
      FillResponse fillResponse = new FillResponse.Builder()
              .addDataset(new Dataset.Builder()
                      .setValue(parsedStructure.usernameId,
                              AutofillValue.forText(userData.username), usernamePresentation)
                      .setValue(parsedStructure.passwordId,
                              AutofillValue.forText(userData.password), passwordPresentation)
                      .build())
              .build();

      // If there are no errors, call onSuccess() and pass the response
      callback.onSuccess(fillResponse);
  }


  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.app.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  class ParsedStructure {
      AutofillId usernameId;
      AutofillId passwordId;
  }

  class UserData {
      String username;
      String password;
  }

}
