# Contributing to Microsoft Graph training repositories

Thank you for contributing to this project! Before submitting your pull request, be sure to consider the following.

## Overview

The code in this repository serves two purposes:

- The sample project in the [user-auth](/user-auth) folder is the source for a [Microsoft Graph quick start](https://developer.microsoft.com/graph/quick-start).
- The code in the [user-auth](/user-auth) and [app-auth](/app-auth) folders are directly referenced by [Microsoft Graph tutorials](https://learn.microsoft.com/graph/tutorials)

This is important to keep in mind, because changes in one place *may* require changes in another, to keep things in sync. The Markdown files for the tutorials refer to the source code files directly (using a custom `:::code` syntax), so that updating code in source will automatically update the code in Markdown.

## Updating code

The `:::code` syntax used in Markdown depends on specific comments in the source code file. These comments look like the following:

```csharp
// <MySnippet>
Console.WriteLine("Hello World!");
// </MySnippet>
```

If you update code between these "marker" comments, the Markdown files will automatically get those changes when published to the Microsoft Graph documentation site. If you update code outside of those comments, it's very likely that you'll need to update the corresponding Markdown in the [Microsoft Graph training repository](https://github.com/microsoftgraph/microsoft-graph-training).

## Adding features

While the enthusiasm is appreciated, please don't send pull requests to add new features to the sample. Because this repository is primarily a "build your first app" tutorial, the feature set is limited, by design.

## Submitting pull requests

Please submit all pull requests to the `main` branch.

## When do changes get published?

Publishing of updates to the [Microsoft Graph tutorials](https://learn.microsoft.com/graph/tutorials) site is not automatic. Changes must first be promoted to the `live` branch, then a build must be triggered by the site admins. This is typically done on an "as-needed" basis.

## Code of conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
