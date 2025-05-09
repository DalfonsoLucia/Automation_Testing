package Test.utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentHtmlReporter;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.io.IOException;

public class TestReport {

    private ExtentReports extentReports;
    private ExtentTest extentTest;

    public void setupReport() {
        ExtentHtmlReporter htmlReporter = new ExtentHtmlReporter("test-report.html");
        extentReports = new ExtentReports();
        extentReports.attachReporter(htmlReporter);
        extentReports.setSystemInfo("Host Name", "Nome del tuo host");
        extentReports.setSystemInfo("Environment", "Ambiente di test");
    }

    public void startTest(String testName, String description) {
        extentTest = extentReports.createTest(testName, description);
    }

    public void pass(String message) {
        extentTest.log(Status.PASS, message);
    }

    public void fail(String messageFail) {
        try {
//            ExtentTest a = extentTest.log(Status.FAIL, messageFail, MediaEntityBuilder.createScreenCaptureFromPath(fullPath).build());
            extentTest.fail(messageFail, MediaEntityBuilder.createScreenCaptureFromBase64String(((TakesScreenshot) DriverUtils.getDriver()).getScreenshotAs(OutputType.BASE64)).build());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void tearDown() {
        extentReports.flush();
    }
}
