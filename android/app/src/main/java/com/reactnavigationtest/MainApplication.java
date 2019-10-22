package com.reactnavigationtest;

import com.reactnavigationtest.generated.BasePackageList;

import android.app.Application;
// import android.util.Log;

import com.airbnb.android.react.lottie.LottiePackage;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
    new BasePackageList().getPackageList(),
    Arrays.<SingletonModule>asList()
  );



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    // protected List<ReactPackage> getPackages() {
    //   @SuppressWarnings("UnnecessaryLocalVariable")
    //   List<ReactPackage> packages = new PackageList(this).getPackages();

    //   // Packages that cannot be autolinked yet can be added manually here, for example:
    //   // packages.add(new MyReactNativePackage());

    //   // Add unimodules
    //   List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
    //     new ModuleRegistryAdapter(mModuleRegistryProvider)
    //   );
    //   packages.addAll(unimodules);

    //   return packages;
    // }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")

      // return Arrays.<ReactPackage>asList(
      //     new MainReactPackage(),
      //     new ReanimatedPackage(),
      //     new RNGestureHandlerPackage(),
      //     new RNScreensPackage(),
      //     new ModuleRegistryAdapter(mModuleRegistryProvider),
      //     new LottiePackage()
      // );

      List<ReactPackage> packages = new PackageList(this).getPackages();

      // Packages that cannot be autolinked yet can be added manually here, for example:
      packages.add(new MainReactPackage());
      packages.add(new ReanimatedPackage());
      packages.add(new RNGestureHandlerPackage());
      packages.add(new RNScreensPackage());
      packages.add(new LottiePackage());

        // Add unimodules
      List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
        new ModuleRegistryAdapter(mModuleRegistryProvider)
      );

      packages.addAll(unimodules);

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
  }
}
