<?php

namespace App\Filament\Resources\Documents\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\TextInput::make('title')
                    ->required(),
                \Filament\Forms\Components\Select::make('document_category_id')
                    ->relationship('documentCategory', 'name')
                    ->label('Category')
                    ->searchable()
                    ->preload(),
                \Filament\Forms\Components\Select::make('type')
                    ->options([
                        'Protocols' => 'Protocols',
                        'Guidelines' => 'Guidelines',
                        'Consent Forms' => 'Consent Forms',
                        'Research Papers' => 'Research Papers',
                        'Policies' => 'Policies',
                        'Training Materials' => 'Training Materials',
                        'Other' => 'Other',
                    ])
                    ->required(),
                \Filament\Forms\Components\FileUpload::make('file_path')
                    ->label('Upload Document')
                    ->directory('documents')
                    ->required(),
                \Filament\Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required(),
                \Filament\Forms\Components\Select::make('study_id')
                    ->relationship('study', 'title')
                    ->searchable(),
                \Filament\Forms\Components\Select::make('access_level')
                    ->options([
                        'Public' => 'Public',
                        'Investigators' => 'Investigators',
                        'Governance' => 'Governance',
                        'Admin' => 'Admin',
                    ])
                    ->default('Admin')
                    ->required(),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'Active' => 'Active',
                        'Archived' => 'Archived',
                    ])
                    ->required()
                    ->default('Active'),
            ]);
    }
}
