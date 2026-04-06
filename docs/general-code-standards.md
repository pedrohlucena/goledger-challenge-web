# General Coding Best Practices

## 1. Semantic and Descriptive Naming Conventions

### Concept

Naming is one of the most critical aspects of code readability. Variables, functions, and types must clearly communicate their purpose, the data they represent, and their context, without requiring the reader to inspect the implementation.

* **Booleans:** They should always use prefixes such as `is`, `has`, `should`, `can`, or `must` to indicate a true/false state.
* **Maps/Records:** They should follow the `{Key}_TO_{Value}` pattern (e.g., `STATUS_TO_LABEL`).
* **Verbosity:** Avoid single-letter variables (such as `i` or `e`) in loops or callbacks. Use descriptive names such as `tvShow` or `episode`.
* **Units of Measure:** If a variable represents a physical or digital unit (MB, ms, px), include the unit in the name.

### Good Practice Examples

```tsx
// Clear naming for booleans
const isWatchlisted = true;
const isAdultsOnlyTvShow = false;

// Descriptive name for map
const STATUS_TO_COLOR_MAP: Record<Status, string> = {
  active: 'green',
  expired: 'red'
};

// Explicit units
const maxFileSizeInMB = 10;

const timeoutInMilliseconds = 5000;

// Descriptive callback parameters
episodes.map((episode) => episode.id);
```

### Bad Practice Examples
* `const active = true;` (Ambiguous: What is active?)
* `const statusMap = { ... };` (Does not describe the mapping direction)
* `const size = 10;` (Is this bytes, megabytes, or number of items?)
* `items.map(i => i.name);` (Single-letter variables reduce clarity and searchability)

### Conclusion / Recommendation

Apply descriptive names to all exported members and internal logic. When dealing with complex states, prefer verbosity over brevity to ensure that future maintainers (including yourself) can understand the logic quickly.

## 2. Scalable Logic with Map Handlers

### Concept

When logic varies based on a specific "type" or "slug" avoid long chains of `if/else` or `switch`. Instead, use a Map (Object or Record) of handlers. This makes the code more aligned with the *Open-Closed* principle (open for extension, closed for modification) and allows TypeScript to enforce exhaustive checks.

### Good Practice Examples

```tsx
// Use of a handler map for different button types

const buttonTypeToAdapter: Record<ButtonType, (data: RawData) => AdaptedButton> = {
  url: (data) => adaptURLButton(data),
  phone: (data) => adaptPhoneButton(data),
  "quick-reply": (data) => adaptQuickReplyButton(data)
};

const adapter = buttonTypeToAdapter[input.type];

if (adapter) {
  return adapter(input.data);
}
```

### Bad Practice Examples

* **Nested If/Else:** Using multiple `if (type === 'x')` blocks makes it harder to add new types and increases cyclomatic complexity.
* **Hardcoded Logic in Adapters:** Mixing selection logic with transformation logic makes the function harder to test.

### Conclusion / Recommendation

Use Map Handlers whenever there is a set of operations associated with a specific key or type. This is especially useful in Adapters and Services that deal with multiple integration types.

## 3. Defensive Programming and Data Safety

### Concept

Code must be resilient to missing data or unexpected inputs. This involves using modern language features to avoid runtime errors such as `Cannot read property 'x' of undefined`.

* **Optional Chaining:** Use `?.` when accessing properties of objects that may be null or undefined.
* **Nullish Coalescing:** Use `??` to provide sensible default values.
* **Fail-Fast Validation:** Validate inputs at the beginning of a function or in a dedicated validation layer before executing business logic.

### Good Practice Examples

```tsx
// Safe property access

const userName = user?.profile?.name ?? "Guest";

// Early return / Validation
async function processOrder(orderId: string) {
  if (!orderId) throw new Error("Order ID is required");

  const order = await repository.findById(orderId);


  if (!order) return null; // Or handle as 404

  // ... logic
}
```

### Bad Practice Examples

* **Assuming the Data Exists:** `const name = user.name;` (It will break if `user` is null).
* **Inverted Logic:** Returning `false` in a filter when the correct value should be `true`, or vice versa.
* **Redundant Conditionals:** Checking `if (x) { return x } else { return null }` when `return x ?? null` is enough.

### Conclusion / Recommendation

Always assume that external data (API responses, user input) may be incomplete. Use optional chaining and validation pipelines to ensure that the core logic operates only on valid data.

## 4. Dependency and Environment Management

### Concept

To ensure that "it works on my machine" also means "it works in production", the environment and dependencies must be strictly controlled.

* **Version Pinning:** Use specific versions (Minor and Patch) in `package.json` and in CI/CD workflows (e.g., GitHub Actions) to prevent automatic updates from introducing breaking changes.

* **Node Versioning:** Include a `.nvmrc` file in all repositories to ensure that all developers and build environments use the same Node.js version.

* **Environment Variables:** Sensitive or environment-specific settings (such as API versions or feature flags) must be stored in `.env` files, never hardcoded.

### Good Practice Examples


* **package.json:** `"dependency": "1.2.3"` (instead of `^1.2.3`).
* **Workflow:** `uses: actions/setup-node@v4 \n with: node-version: "20.12.2"`.
* **Config:** `const waVersion = process.env.WHATSAPP_WEB_VERSION;`.


### Conclusion / Recommendation

Treat your infrastructure and dependency list as code. Pin versions to ensure deterministic builds and use configuration files to manage differences between environments.

## 5. Division of Responsibilities and Intrinsic Load

### Concept

To avoid giant and hard-to-maintain methods, we use the concept of **Intrinsic Load**. We assign points to complexities (loops, conditionals, asynchronous calls, transformations). If a method exceeds **9 points**, it must be refactored and split up.

### Good Practice Examples

```tsx
// Main method orchestrating calls to specialist methods
async getInfo(userId: number) {
	const userInfo = await this.mountUserInfo({
		userId,
    // ... other data
  });

  return userInfo;
}

// Separate methods with single responsibility
private async mountUserInfo(input: any) { /* ... */ }
private async getUserAuthenticationsData(userId: number) { /* ... */ 
```

### Bad Practice Examples

* **"God" Method:** A `getInfo` function that fetches data from the database, validates business rules, calls external APIs, formats the return object, and handles errors, all within the same scope.

### Conclusion / Recommendation

Monitor the complexity of your methods. If you are mixing data fetching, validation, and formatting, break the logic into smaller private functions with descriptive names.

## 6. Code Intent: Explicit Variables and Functions

### Concept

Complex business rules inside `if` statements or chains of array methods (`filter`, `map`, `sort`) make code hard to read. These rules should be extracted into variables or functions with names that explain **what** the rule does.

### Good Practice Examples

```tsx
function isTopPriority(todo) {
	return !todo.completed && todo.type === "RE";
}

function ascByUserName(todo1, todo2) {
  return todo1.userName.localeCompare(todo2.userName);
}

// Fluent reading
return todos.filter(isTopPriority).sort(ascByUserName);
```

### Bad Practice Examples

* **Inline Logic:** `todos.filter(t => !t.completed && t.type === "RE").sort((a,b) => ...)`

  	This forces the developer to "decipher" the business rule every time they read it.

### Conclusion / Recommendation

Give names to your business rules. The code should read almost like a sentence in natural language.

## 7. Comments for Implicit Behaviors

### Concept

Code should be self-explanatory, but there are exceptions where the context ("why was this done this way?") is not obvious. In these cases, comments are welcome to explain design decisions or *workarounds*.

### Good Practice Examples

```tsx
/**
 * WARNING:
 * We need to clear this field, since it prevents scenarios where the
 * block could enter a loop continually processing the same context.
 */
clientContextMessages: null
```

### Bad Practice Examples

* **Redundant Comments:**
  ```tsx
  /**
   * This parameter defines if chatbot can try next block logic
   */
  canTryNextBlock: boolean // The variable name already says that
  ```

### Conclusion / Recommendation

Do not comment on what the code does (the code already says that). Comment on **why** it does it, especially if it is an obscure business rule or a safeguard against a specific bug.

## 8. Elimination of Magic Numbers

### Concept

Loose numbers in the code ("Magic Numbers") have no semantic meaning and make maintenance harder. They should be replaced with named constants.

### Good Practice Examples

```tsx

const secondInMilliseconds = 1000;
const minuteInMilliseconds = secondInMilliseconds * 60;
// ...
const expiration = weekInMilliseconds + getTimeLeft();
```

### Bad Practice Examples

* **Obscure Calculations:** `const expiration = 604800000 + getTimeLeft();`. The next developer will not know what `604800000` represents (one week in ms).

### Conclusion / Recommendation

Always extract fixed numeric values into constants with names that represent their unit and purpose.

## 9. Well-Defined Responsibilities (Naming)

### Concept

A function's name must reflect exactly what it does. Functions that perform implicit actions (undeclared side effects) in their name create bugs that are difficult to trace.

### Good Practice Examples

```tsx
// The name makes it clear that it may create a record if it does not exist
const retrieveOrCreateOneByUserId(userId) {
	// fetches... if it doesn't find one, creates one...
   return userSettings;
}
```

### Bad Practice Examples

* **Hidden Side Effect:** A function called `retrieveOneByUserId` that internally creates a record in the database if it cannot find the user. This misleads whoever uses the function expecting only a read operation.

### Conclusion / Recommendation

If a function does more than its name suggests, rename the function or refactor it to remove the hidden behavior.

## 10. Extensibility of Data Structures

### Concept

When modeling data, think about the entity's evolution. Avoid rigid structures that only serve the immediate use case, making it difficult to add new types in the future.

### Good Practice Examples

```tsx
// Flexible structure for multiple contact types
contactMethods: Array<{
  type: "phone" | "email" | "whatsapp",
  value: string
}>
```

### Bad Practice Examples

* **Limited Vision:** Creating a `phones: string[]` field. When it becomes necessary to add emails or differentiate mobile from landline, the database and code will need to be refactored.

### Conclusion / Recommendation 

Prefer generic structures (Type/Value) for lists of items that may gain new categories in the future.

## 11. Strict Typing and TypeScript Conventions

### Concept

TypeScript is meant to prevent errors during development. Using `any` cancels out that benefit. In addition, the visual standardization of types makes reading easier.

* **No `any`:** Define specific interfaces or types. If the data is unknown, prefer `unknown` with later validation.
* **PascalCase:** Interfaces, Types, Enums, and Classes must always use `PascalCase`.

### Good Practice Examples

```tsx
type UserProfile = {
	id: number;
  name: string;
};

const processUser = (user: UserProfile) => { /* ... */ };
```

### Bad Practice Examples

* **Lazy Typing:** `const processUser = (user: any) => { ... }`.
* **Wrong Convention:** `type user_profile = { ... }` or `interface userProfile { ... }`.

### Conclusion / Recommendation

Typing must be descriptive. If you are using `any`, you are probably missing the opportunity to define a clear data contract.

## 12. Naming and Grammar Standardization

### Concept

Consistency in naming reduces cognitive load. Developers should not spend time guessing whether a variable is `camelCase` or `snake_case`, or whether a map is `Map<K,V>` or an object.

* **Variables and Methods:** Always in `camelCase`.
* **Constants/Mocks:** Fixed or mocked values must use `CONSTANT_CASE` (Screaming Snake Case).
* **Maps:** They should follow the `{Key}To{Value}` pattern (e.g., `userIdToName`).
* **Dates:** Variables of type Date must have the `Date` suffix (e.g., `createdDate`, `updatedDate`).
* **Grammar:** Pay attention to correct English, especially irregular plurals (e.g., `quickReplies` and not `quickReplys`).

### Good Practice Examples

```tsx
// Variables and Constants
const MOCK_USER_LIST = [...];
const creationDate = new Date();

// Maps
const userStatusToExhibitionName: Record<UserStatus, string> = {
	active: 'Active',
  blocked: 'Blocked'
};

// Correct grammar
const quickReplies = [];
```

### Bad Practice Examples

* **Inconsistency:** `const Created_At = new Date();`
* **Ambiguous Maps:** `const statusNames = { ... }` (Does not indicate the mapping direction).
* **Grammar Mistakes:** `const personInfos = ...` (Information is uncountable), `quickReplys`.

### Conclusion / Recommendation

Review grammar and strictly follow `camelCase` standards for variables and `CONSTANT_CASE` for static values.

## 13. Safe Data Access and Validation

### Concept

Ensure that the data entering the application and the data accessed internally are safe and valid.

* **Optional Chaining:** Use `?.` to access nested properties, avoiding *runtime* errors such as `Cannot read property of undefined`.

* **Controller Validation:** Data received in endpoints/controllers must be validated by a validation class (Schema Validation) before any processing.

### Good Practice Examples

```tsx
// Safe access
const cityName = user?.address?.city;

// Validation in Controller
class UserController {
  create(req, res) {
    const validatedData = UserValidator.validateCreatePayload(req.body);
    // ...
  }
}
```

### Bad Practice Examples

* **Unsafe Access:** `const city = user.address.city;` (Breaks if `address` is null).
* **Blind Trust:** Using `req.body` directly in business logic without ensuring that required fields exist and are in the correct format.

### Conclusion / Recommendation

Adopt a defensive posture. Validate at the entry point (Controller) and protect access during handling (Optional Chaining).
