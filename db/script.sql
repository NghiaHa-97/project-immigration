USE [db_do_an]
GO
/****** Object:  Table [dbo].[Module]    Script Date: 12/22/2021 8:09:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Module](
	[ID] [int] NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Code] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 12/22/2021 8:09:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NULL,
	[Name] [nvarchar](20) NULL,
	[ModuleID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PermissionRole]    Script Date: 12/22/2021 8:09:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionRole](
	[PermissionID] [int] NOT NULL,
	[RoleID] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 12/22/2021 8:09:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysUserAdmin]    Script Date: 12/22/2021 8:09:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysUserAdmin](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](512) NOT NULL,
	[CreateDate] [datetime] NULL,
	[UpdateDate] [datetime] NULL,
	[RoleID] [int] NULL
) ON [PRIMARY]
GO
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (1, N'Module_1', 1)
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (2, N'Module_2', 2)
INSERT [dbo].[Module] ([ID], [Name], [Code]) VALUES (3, N'Module_3', 3)
GO
SET IDENTITY_INSERT [dbo].[Permission] ON 

INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (1, 10, N'Xem', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (2, 11, N'Thêm', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (3, 12, N'Sửa', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (4, 13, N'Xóa', 1)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (5, 20, N'Xem', 2)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (6, 21, N'Thêm', 2)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (7, 22, N'Sửa', 2)
INSERT [dbo].[Permission] ([ID], [Code], [Name], [ModuleID]) VALUES (8, 23, N'Xóa', 2)
SET IDENTITY_INSERT [dbo].[Permission] OFF
GO
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (1, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (2, 2)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (3, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (4, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (5, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (6, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (7, 1)
INSERT [dbo].[PermissionRole] ([PermissionID], [RoleID]) VALUES (8, 1)
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([ID], [Name]) VALUES (1, N'ROLE_ADMIN')
INSERT [dbo].[Role] ([ID], [Name]) VALUES (2, N'ROLE_CUSTOMER')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[SysUserAdmin] ON 

INSERT [dbo].[SysUserAdmin] ([ID], [Username], [Password], [CreateDate], [UpdateDate], [RoleID]) VALUES (1, N'nghiahd', N'$2a$10$PZoaL4TlCUFeUDer4isOmuom0z9tDvqp8YeJS07nAubs2xV9H022a', CAST(N'2021-12-19T18:23:09.967' AS DateTime), CAST(N'2021-12-19T18:23:09.967' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[SysUserAdmin] OFF
GO
/****** Object:  Index [Module_pk]    Script Date: 12/22/2021 8:09:08 PM ******/
ALTER TABLE [dbo].[Module] ADD  CONSTRAINT [Module_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Permission_pk]    Script Date: 12/22/2021 8:09:08 PM ******/
ALTER TABLE [dbo].[Permission] ADD  CONSTRAINT [Permission_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [PermissionRole_pk]    Script Date: 12/22/2021 8:09:08 PM ******/
ALTER TABLE [dbo].[PermissionRole] ADD  CONSTRAINT [PermissionRole_pk] PRIMARY KEY NONCLUSTERED 
(
	[PermissionID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [Role_pk]    Script Date: 12/22/2021 8:09:08 PM ******/
ALTER TABLE [dbo].[Role] ADD  CONSTRAINT [Role_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [SysUserAdmin_pk]    Script Date: 12/22/2021 8:09:08 PM ******/
ALTER TABLE [dbo].[SysUserAdmin] ADD  CONSTRAINT [SysUserAdmin_pk] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'các module c?a h? th?ng' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Module'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Quy?n h?n chi ti?t v?i t?ng danh m?c module (thêm, s?a, xóa)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Permission'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'quy?n h?n v?i t?ng vai trò' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PermissionRole'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Vai trò' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Hệ thống tài khoản quản trị viên' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserAdmin'
GO
