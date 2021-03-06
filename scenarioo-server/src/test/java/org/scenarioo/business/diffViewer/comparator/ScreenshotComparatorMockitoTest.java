package org.scenarioo.business.diffViewer.comparator;

import static org.junit.Assert.*;
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.im4java.core.CompareCmd;
import org.im4java.core.IMOperation;
import org.im4java.process.ArrayListOutputConsumer;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.scenarioo.dao.diffViewer.impl.DiffFiles;
import org.scenarioo.model.configuration.ComparisonConfiguration;
import org.scenarioo.model.configuration.Configuration;
import org.scenarioo.repository.RepositoryLocator;
import org.scenarioo.utils.TestFileUtils;

@RunWith(MockitoJUnitRunner.class)
public class ScreenshotComparatorMockitoTest {

	@Mock
	private CompareCmd gmConsole;

	@Mock
	private ArrayListOutputConsumer gmConsoleOutputConsumer;

	@InjectMocks
	private final ScreenshotComparator screenshotComparator = new ScreenshotComparator(BASE_BRANCH_NAME,
			BASE_BUILD_NAME,
			getComparisonConfiguration());

	private static final double SCREENSHOT_DIFFERENCE = 14.11;
	private static final double DOUBLE_TOLERANCE = 0.01;
	private static final ArrayList<String> OUTPUT_CONSUMER_MOCK;
	private static final File ROOT_DIRECTORY = new File("tmp");
	private static final String BASE_BRANCH_NAME = "baseBranch";
	private static final String BASE_BUILD_NAME = "baseBuild";
	private static final String COMPARISON_BRANCH_NAME = "comparisonBranch";
	private static final String COMPARISON_BUILD_NAME = "comparisonBuild";
	private static final String COMPARISON_NAME = "comparisonName";

	static {
		OUTPUT_CONSUMER_MOCK = new ArrayList<String>() {
			{
				add("Image Difference (MeanAbsoluteError):");
				add("            Normalized    Absolute");
				add("           ============  ==========");
				add("      Red: 0.0117114886      767.5");
				add("    Green: 0.0343489217     2251.1");
				add("     Blue: 0.0336219026     2203.4");
				add("  Opacity: 0.0000000000        0.0");
				add("    Total: 0.0199205782     1305.5");
			}
		};
	}

	@BeforeClass
	public static void setUpClass() {
		TestFileUtils.createFolderAndSetItAsRootInConfigurationForUnitTest(ROOT_DIRECTORY);
		DiffFiles.getDiffViewerDirectory().mkdirs();
		RepositoryLocator.INSTANCE.getConfigurationRepository().updateConfiguration(getTestConfiguration());
	}

	@AfterClass
	public static void tearDownClass() {
		try {
			FileUtils.deleteDirectory(ROOT_DIRECTORY);
		} catch (final IOException e) {
			throw new RuntimeException("Could not delete test data directory", e);
		}
	}

	@Test
	public void testParseGmConsoleOutput() {
		final File mockScreenshot = new File("mockScreenshot.png");

		try {
			doNothing().when(gmConsole).run(any(IMOperation.class));
		} catch (final Exception e) {
			e.getStackTrace();
		}

		when(gmConsoleOutputConsumer.getOutput()).thenReturn(OUTPUT_CONSUMER_MOCK);
		final double difference = screenshotComparator.compareScreenshots(mockScreenshot, mockScreenshot, mockScreenshot);
		assertEquals("Difference of screenshots", SCREENSHOT_DIFFERENCE, difference, DOUBLE_TOLERANCE);
	}

	private static Configuration getTestConfiguration() {

		final ComparisonConfiguration comparisonConfiguration = getComparisonConfiguration();

		final List<ComparisonConfiguration> comparisonConfigurations = new LinkedList<ComparisonConfiguration>();
		comparisonConfigurations.add(comparisonConfiguration);

		final Configuration configuration = RepositoryLocator.INSTANCE.getConfigurationRepository().getConfiguration();
		configuration.setComparisonConfigurations(comparisonConfigurations);

		return configuration;
	}

	private static ComparisonConfiguration getComparisonConfiguration() {
		final ComparisonConfiguration comparisonConfiguration = new ComparisonConfiguration();
		comparisonConfiguration.setBaseBranchName(BASE_BRANCH_NAME);
		comparisonConfiguration.setComparisonBranchName(COMPARISON_BRANCH_NAME);
		comparisonConfiguration.setComparisonBuildName(COMPARISON_BUILD_NAME);
		comparisonConfiguration.setName(COMPARISON_NAME);
		return comparisonConfiguration;
	}
}
