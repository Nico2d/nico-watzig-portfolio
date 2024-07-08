import { AiFillHtml5, AiFillGithub, AiFillGitlab } from 'react-icons/ai'
import { DiCss3, DiVisualstudio } from 'react-icons/di'
import { IoLogoJavascript } from 'react-icons/io'
import { FaReact, FaFigma } from 'react-icons/fa'
import { BsBootstrap } from 'react-icons/bs'
import { TbBrandNextjs, TbBrandTailwind } from 'react-icons/tb'
import {
	SiStrapi,
	SiPhp,
	SiBlender,
	SiSwagger,
	SiPostman,
	SiAtlassian,
	SiRoku,
	SiGatsby,
	SiWordpress,
} from 'react-icons/si'
import { TbBrandReactNative, TbBrandThreejs } from 'react-icons/tb'

const iconSize = 32

export const TECHNOLOGIES = [
	{
		category: 'Front-end',
		items: [
			{ name: 'HTML', icon: <AiFillHtml5 size={iconSize} /> },
			{ name: 'CSS', icon: <DiCss3 size={iconSize} /> },
			{ name: 'JS', icon: <IoLogoJavascript size={iconSize} /> },
			{ name: 'React', icon: <FaReact size={iconSize} /> },
			{ name: 'Next', icon: <TbBrandNextjs size={iconSize} /> },
			{ name: 'Tailwind CSS', icon: <TbBrandTailwind size={iconSize} /> },
			{ name: 'Bootstrap', icon: <BsBootstrap size={iconSize} /> },
			{ name: 'ThreeJS', icon: <TbBrandThreejs size={iconSize} /> },
			{ name: 'Roku', icon: <SiRoku size={iconSize} /> },
			{
				name: 'React-Native',
				icon: <TbBrandReactNative size={iconSize} />,
				},
		],
	},
	{
		category: 'Back-end',
		items: [
			{
				name: 'PHP',
				icon: <SiPhp size={iconSize} />,
			},
			,
		],
	},
	{
		category: 'CMS',
		items: [
			{ name: 'WordPress', icon: <SiWordpress size={iconSize} /> },
			{ name: 'Strapi', icon: <SiStrapi size={iconSize} /> },
			{ name: 'Gatsby', icon: <SiGatsby size={iconSize} /> },
		],
	},
	{
		category: 'Other tools',
		items: [
			{ name: 'Figma', icon: <FaFigma size={iconSize} /> },
			{ name: 'Blender', icon: <SiBlender size={iconSize} /> },
			{ name: 'Github', icon: <AiFillGithub size={iconSize} /> },
			{ name: 'Gitlab', icon: <AiFillGitlab size={iconSize} /> },
			{ name: 'VsCode', icon: <DiVisualstudio size={iconSize} /> },
			{ name: 'Postman', icon: <SiPostman size={iconSize} /> },
			{ name: 'Swagger', icon: <SiSwagger size={iconSize} /> },
			{ name: 'Atlassian ', icon: <SiAtlassian size={iconSize} /> },
		],
	},
]
