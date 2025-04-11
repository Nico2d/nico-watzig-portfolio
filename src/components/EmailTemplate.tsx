import * as React from 'react'

interface EmailTemplateProps {
	mail: string
	message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	mail,
	message,
}) => (
	<div>
		<p>Mail from: {mail} </p>
		<h3>Message</h3>

		<div>{message}</div>
	</div>
)
