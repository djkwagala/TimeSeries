// This file was generated by Mendix Business Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package myfirstmodule.actions;

import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;

/**
 * Delay time in miliseconds
 */
public class Delay extends CustomJavaAction<Boolean>
{
	private Long delaytime;

	public Delay(IContext context, Long delaytime)
	{
		super(context);
		this.delaytime = delaytime;
	}

	@Override
	public Boolean executeAction() throws Exception
	{
		// BEGIN USER CODE
		Thread.sleep(delaytime);
		return true;
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 */
	@Override
	public String toString()
	{
		return "Delay";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
