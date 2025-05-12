import unittest
import HtmlTestRunner


from Tests import unoDe50_test_selenium_python

if __name__ == "__main__":
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromTestCase(unoDe50_test_selenium_python.TestSelenium)

    runner = HtmlTestRunner.HTMLTestRunner(
        output='Reports_HTML',
        report_name='TestReport',
        combine_reports=True,
        add_timestamp=True
    )

    runner.run(suite)